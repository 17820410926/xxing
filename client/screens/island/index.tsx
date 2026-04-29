import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#7B6EF6',
  secondary: '#5CE0D8',
  accent: '#F2A7E0',
  background: '#0D1026',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.08)',
  textPrimary: '#EEEAF6',
  textSecondary: '#8E8BA3',
};

// 岛屿场景
const ISLANDS = [
  {
    id: 'calm',
    name: '晨曦沙滩',
    desc: '平静祥和的海边，适合放松冥想',
    mood: '平静',
    moodColor: '#5CE0D8',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    icon: 'sunny',
  },
  {
    id: 'rain',
    name: '雨后竹林',
    desc: '清新的雨后气息，平复焦虑',
    mood: '焦虑',
    moodColor: '#FF9A9E',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600',
    icon: 'rainy',
  },
  {
    id: 'forest',
    name: '静谧森林',
    desc: '郁郁葱葱的树林，找回内心平静',
    mood: '低落',
    moodColor: '#A8C0FF',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
    icon: 'leaf',
  },
  {
    id: 'aurora',
    name: '极光夜空',
    desc: '神秘的极光与星空，治愈心灵',
    mood: '愉悦',
    moodColor: '#FFD700',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600',
    icon: 'star',
  },
  {
    id: 'garden',
    name: '自信花园',
    desc: '绽放的花朵，提升自信与勇气',
    mood: '能量',
    moodColor: '#F2A7E0',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600',
    icon: 'flower',
  },
  {
    id: 'mountain',
    name: '云端山峰',
    desc: '高耸的山峰俯瞰世界，释放压力',
    mood: '解压',
    moodColor: '#667EEA',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
    icon: 'globe',
  },
];

// AI疗愈师消息示例
const AI_MESSAGES = [
  { id: 1, text: '你好，我是小屿。今天感觉怎么样？', isAI: true },
  { id: 2, text: '最近工作压力有点大...', isAI: false },
  { id: 3, text: '我理解你的感受。试着深呼吸，慢慢地吸气、呼气...让我们一起找到内心的平静。', isAI: true },
];

export default function IslandScreen() {
  const router = useSafeRouter();
  const [selectedIsland, setSelectedIsland] = useState<typeof ISLANDS[0] | null>(null);
  const [messages, setMessages] = useState(AI_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleIslandSelect = (island: typeof ISLANDS[0]) => {
    setSelectedIsland(island);
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = { id: Date.now(), text: inputText, isAI: false };
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: '我听到了。你的感受很正常，很多人都有类似的经历。让我们一起探索如何更好地应对这些压力...',
        isAI: true,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  if (showChat && selectedIsland) {
    return (
      <Screen>
        <View style={styles.chatContainer}>
          {/* 顶部 */}
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setShowChat(false)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatTitle}>心屿空间</Text>
              <View style={styles.aiStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>AI疗愈师 小屿</Text>
              </View>
            </View>
          </View>

          {/* 岛屿背景 */}
          <Image
            source={{ uri: selectedIsland.image }}
            style={styles.chatBackground}
          />
          <LinearGradient
            colors={['transparent', COLORS.background]}
            style={styles.chatGradient}
          />

          {/* 消息列表 */}
          <ScrollView 
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 欢迎卡片 */}
            <View style={styles.welcomeCard}>
              <LinearGradient
                colors={[`${selectedIsland.moodColor}20`, 'transparent']}
                style={styles.welcomeGradient}
              >
                <View style={styles.welcomeIcon}>
                  <Ionicons name={selectedIsland.icon as any} size={32} color={selectedIsland.moodColor} />
                </View>
                <Text style={styles.welcomeTitle}>{selectedIsland.name}</Text>
                <Text style={styles.welcomeDesc}>{selectedIsland.desc}</Text>
              </LinearGradient>
            </View>

            {/* 消息 */}
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageItem,
                  msg.isAI ? styles.aiMessage : styles.userMessage,
                ]}
              >
                {msg.isAI && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="flower" size={20} color={COLORS.primary} />
                  </View>
                )}
                <View style={[
                  styles.messageBubble,
                  msg.isAI ? styles.aiBubble : styles.userBubble,
                ]}>
                  <Text style={[
                    styles.messageText,
                    msg.isAI ? styles.aiText : styles.userText,
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* 输入区 */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.inputContainer}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="写下你的感受..."
                placeholderTextColor={COLORS.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  !inputText.trim() && styles.sendBtnDisabled,
                ]}
                onPress={handleSendMessage}
                disabled={!inputText.trim()}
              >
                <Ionicons name="send" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 头部 */}
        <View style={styles.header}>
          <Text style={styles.title}>心屿空间</Text>
          <Text style={styles.subtitle}>选择一个岛屿，开启你的疗愈之旅</Text>
        </View>

        {/* 岛屿列表 */}
        <View style={styles.islandList}>
          {ISLANDS.map((island) => (
            <TouchableOpacity
              key={island.id}
              style={styles.islandCard}
              onPress={() => handleIslandSelect(island)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: island.image }}
                style={styles.islandImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(13,16,38,0.9)']}
                style={styles.islandOverlay}
              />
              <View style={styles.islandContent}>
                <View style={[styles.moodBadge, { backgroundColor: `${island.moodColor}20` }]}>
                  <Ionicons 
                    name={island.icon as any} 
                    size={14} 
                    color={island.moodColor} 
                  />
                  <Text style={[styles.moodBadgeText, { color: island.moodColor }]}>
                    {island.mood}
                  </Text>
                </View>
                <Text style={styles.islandName}>{island.name}</Text>
                <Text style={styles.islandDesc}>{island.desc}</Text>
              </View>
              <TouchableOpacity style={styles.enterBtn}>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* 底部安全区 */}
        <View style={styles.bottomSafe} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  islandList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  islandCard: {
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 4,
  },
  islandImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  islandOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  islandContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    marginBottom: 8,
  },
  moodBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  islandName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  islandDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  enterBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSafe: {
    height: 40,
  },
  // Chat styles
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  aiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  chatBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
  },
  chatGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  messageList: {
    flex: 1,
    marginTop: 80,
  },
  messageListContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 16,
  },
  welcomeCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  welcomeGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  welcomeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  welcomeDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: width * 0.7,
    padding: 14,
    borderRadius: 20,
  },
  aiBubble: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: COLORS.textPrimary,
  },
  userText: {
    color: '#FFF',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 30,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
});
