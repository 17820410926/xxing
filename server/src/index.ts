import express from "express";
import cors from "cors";
import { FetchClient, Config } from 'coze-coding-dev-sdk';

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

// PPT内容获取接口
app.post('/api/v1/fetch-ppt', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const config = new Config();
    const client = new FetchClient(config);
    const response = await client.fetch(url);

    // 提取文本内容
    const textContent = response.content
      .filter((item: any) => item.type === 'text')
      .map((item: any) => item.text)
      .join('\n');

    res.json({
      title: response.title,
      content: textContent,
      images: response.content.filter((item: any) => item.type === 'image'),
      url: response.url,
    });
  } catch (error: any) {
    console.error('Error fetching PPT:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
