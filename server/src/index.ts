import express from "express";
import cors from "cors";
import { LLMClient, Config } from 'coze-coding-dev-sdk';

const app = express();
const port = process.env.PORT || 9091;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/v1/health', (req, res) => {
  console.log('Health check success');
  res.status(200).json({ status: 'ok' });
});

// AI情绪分析接口
app.post('/api/v1/mood/analyze', async (req, res) => {
  try {
    const { mood, note } = req.body;
    
    if (!mood) {
      return res.status(400).json({ error: 'mood is required' });
    }

    const config = new Config();
    const client = new LLMClient(config);

    // 情绪标签映射
    const moodLabels: Record<string, string> = {
      'anxious': '焦虑',
      'sad': '低落',
      'peaceful': '平静',
      'happy': '愉悦',
      'angry': '愤怒',
    };

    const moodLabel = moodLabels[mood] || mood;
    const userNote = note || '没有额外描述';

    const messages = [
      {
        role: "system" as const,
        content: `你是「心屿」应用的AI疗愈师小屿，专注于心理健康和情绪疏导。
你的回复风格：
1. 温暖、支持性的语气
2. 使用简短的段落，每个观点分开
3. 适当使用emoji增加亲切感
4. 提供实用的建议和方法
5. 回复长度控制在150-200字左右

请根据用户的情绪状态和描述，提供：
1. 对情绪的理解和共情
2. 简要的情绪分析
3. 实用的应对建议或小练习
4. 鼓励性的话语`
      },
      {
        role: "user" as const,
        content: `用户当前的情绪状态是"${moodLabel}"，补充描述：${userNote}

请给予温暖的回应和实用的建议。`
      }
    ];

    const response = await client.invoke(messages, {
      model: "doubao-seed-1-6-251015",
      temperature: 0.8,
    });

    res.json({
      success: true,
      mood: moodLabel,
      analysis: response.content,
      suggestions: [
        '尝试深呼吸练习',
        '记录此刻的感受',
        '与信任的人倾诉'
      ]
    });
  } catch (error: any) {
    console.error('Mood analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: '分析服务暂时不可用，请稍后再试',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
