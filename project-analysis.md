# 工程核心代码逻辑解读

## 一、工程整体架构

这是一个 **pnpm monorepo**，包含两个 workspace：

| 目录 | 技术栈 | 职责 |
|------|--------|------|
| `client/` | Expo (React Native) + Expo Router | 跨端应用前端 |
| `server/` | Express.js + TypeScript | 后端 API 服务 |

---

## 二、Client 端核心逻辑

### 1. 路由与导航体系

- **根布局** `client/app/_layout.tsx`：使用 `expo-router` 的 `Stack` 导航，全局包裹 `Provider`，配置 slide 转场动画，并注册两个非 Tab 页面（`island`、`workshop-detail`）。
- **Tab 布局** `client/app/(tabs)/_layout.tsx`：底部 5 个 Tab（首页、心屿、工坊、疗愈圈、我的），使用 `Ionicons` 图标，带有聚焦状态指示点。
- **路由映射**：`app/(tabs)/index.tsx` 等文件仅做重导出，实际页面实现放在 `client/screens/` 目录。

### 2. Screen 容器组件（核心基础设施）

`client/components/Screen.tsx` 是页面级核心容器，逻辑非常复杂且关键：

- **手动安全区管理**：完全弃用 `SafeAreaView`，通过 `useSafeAreaInsets()` 获取 insets，用 `padding` 精确控制，支持沉浸式 Header（去掉 `top`）和自定义底部（去掉 `bottom`）。
- **智能滚动检测**：递归遍历子树，自动判断页面是否已包含 `ScrollView/FlatList/SectionList`。
- **键盘避让策略**：
  - 若页面无自带滚动容器，外层自动包裹 `KeyboardAwareScrollView`。
  - 若页面自带滚动容器，则给该滚动容器单独增强键盘避让，避免固定底部栏（如 TabBar）随键盘上浮。
- **uniwind 集成**：通过 `withUniwind(RawScreen)` 注入，支持 Tailwind CSS 类名。

### 3. 主题与样式系统

- **Tailwind CSS v4 + Uniwind**：入口为 `client/global.css`，定义了完整的 design tokens（背景、前景、surface、overlay、accent、状态色等），支持亮色/暗色双主题。
- **主题切换**：`ColorSchemeUpdater.tsx` 默认跟随系统，Web 环境下额外监听 `coze.workbench.colorScheme` 消息，支持 Coze 工作台联动切换。
- **HeroUI**：`client/heroui/` 下有一整套本地封装的跨平台 UI 组件库（Button、Input、Dialog、Tabs 等），通过 `HeroUINativeProvider` 注入上下文。

### 4. Provider 层级（从内到外）

```
WebOnlyColorSchemeUpdater (主题)
  → WebOnlyPrettyScrollbar (Web 滚动条美化)
    → AuthProvider (认证上下文，当前为空实现占位)
      → GestureHandlerRootView (手势引擎根视图)
        → HeroUINativeProvider (UI 组件库上下文)
```

### 5. 主要业务页面

- **首页** (`screens/home/index.tsx`)：
  - **情绪气象站**：用户选择 5 种情绪之一（焦虑/低落/平静/愉悦/愤怒）并填写备注，点击调用后端 `/api/v1/mood/analyze` 获取 AI 分析结果，以 Modal 弹窗展示。
  - **快捷入口**：正念冥想、情绪日记、呼吸练习、疗愈音乐。
  - **今日推荐**：横向滚动的卡片列表（CBT 练习、正念冥想等）。

- **心屿空间** (`screens/island/index.tsx`)：
  - **岛屿选择页**：6 个沉浸式场景卡片（晨曦沙滩、雨后竹林等），对应不同情绪。
  - **AI 疗愈师聊天**：选择岛屿后进入聊天界面，消息列表 + 输入框，AI 回复为本地 `setTimeout` 模拟。

---

## 三、Server 端核心逻辑

`server/src/index.ts` 是一个轻量级 Express 服务：

- **中间件**：`cors()` + `express.json/urlencoded`（限制 50MB，支持大内容传输）。
- **健康检查**：`GET /api/v1/health`。
- **AI 情绪分析**：`POST /api/v1/mood/analyze`
  - 接收 `mood`（情绪类型）和 `note`（补充描述）。
  - 通过 `coze-coding-dev-sdk` 调用大模型（`doubao-seed-1-6-251015`）。
  - **角色设定**：系统提示词将模型设定为「心屿应用的 AI 疗愈师小屿」，要求温暖、支持性语气，提供共情、分析、建议、鼓励，长度控制在 150-200 字。
  - 返回结构化 JSON（情绪标签、AI 分析文本、通用建议列表）。

---

## 四、关键依赖与集成点

| 领域 | 关键依赖 | 说明 |
|------|----------|------|
| 路由 | `expo-router` | 文件系统路由，同时驱动 Stack + Tabs |
| 样式 | `tailwindcss`, `uniwind` | Tailwind v4 + React Native 适配层 |
| UI 组件 | 本地 `heroui` | 自研跨平台组件库 |
| 状态管理 | React Context | 目前仅 AuthContext 占位，无全局状态库 |
| 后端 ORM/DB | `drizzle-orm`, `pg` | 已安装但未在当前 `index.ts` 中使用 |
| AI SDK | `coze-coding-dev-sdk` | 封装了 LLM 调用 |
| 矢量图标 | `@expo/vector-icons` | 使用 Ionicons |

---

## 五、当前工程的特点与注意点

1. **样式双轨制**：`global.css` 定义了非常完善的 Tailwind/Uniwind 设计令牌，但业务页面（home、island 等）大量使用 `StyleSheet.create` 和硬编码色值（如 `#0D1026`、`#7B6EF6`），并未实际使用 Tailwind 类名，存在设计与实现分离的现象。
2. **认证体系未落地**：`AuthContext` 是空壳，所有接口调用均无 Token 鉴权。
3. **AI 聊天为本地模拟**：心屿空间的 AI 回复是 `setTimeout` 硬编码，仅首页的「情绪分析」真正调用了服务端 LLM。
4. **服务端极简**：目前仅一个情绪分析接口，已安装的 `drizzle-orm`、`supabase` 等尚未在代码中体现。
5. **暗色主题强绑定**：页面硬编码背景色为 `#0D1026`（深蓝紫），与 `global.css` 的暗色主题一致，但亮色模式下会出现视觉冲突。
