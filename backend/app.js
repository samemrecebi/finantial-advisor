import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import postgresClient from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// Azure OpenAI configuration
const GPT4V_KEY = process.env.GPT4V_KEY;
const GPT4V_ENDPOINT = process.env.GPT4V_ENDPOINT;

const headers = {
  'Content-Type': 'application/json',
  'api-key': GPT4V_KEY,
};

// Few-shot examples to guide the model
const fewShotExamples = [
  {
    role: 'user',
    content: '1000 dolar ile hangi hisse senetlerine yatırım yapmalıyım?',
  },
  {
    role: 'assistant',
    content: '1000 dolar ile yatırım yaparken çeşitlendirilmiş bir portföy oluşturmak önemlidir. Teknoloji sektöründe Apple (AAPL) ve Microsoft (MSFT) gibi büyük firmaların hisseleri güvenli olabilir. Sağlık sektöründe Pfizer (PFE) ve Johnson & Johnson (JNJ) iyi seçeneklerdir. Ayrıca, büyüme potansiyeli olan küçük ölçekli firmaların hisselerini de değerlendirebilirsiniz. Yatırım yapmadan önce mutlaka araştırma yapın ve risk toleransınızı göz önünde bulundurun.',
  },
  {
    role: 'user',
    content: 'Şu an en iyi döviz kuru nedir?',
  },
  {
    role: 'assistant',
    content: 'Güncel döviz kurları sürekli değişmektedir. Şu an için en iyi döviz kuru bilgisi almak için döviz kurları sağlayıcılarından veya bankaların web sitelerinden güncel verilere bakabilirsiniz. Örneğin, USD/TRY kuru şu an 32.50 seviyesinde.',
  },
];

// Function to call Azure OpenAIApi
const callOpenAIApi = async (messages) => {
  // Transform messages to the format expected by the OpenAI API
  const transformedMessages = messages.map((message) => ({
    role: message.isUser ? 'user' : 'assistant',
    content: message.text,
  }));

  const payload = {
    messages: [
      {
        role: 'system',
        content: 'Sen bir yatırım danışmanısın ve kullanıcılara finansal konular hakkında tavsiyeler vermekle görevlisin. Kullanıcılara hisse senetleri, döviz kurları ve yatırım stratejileri hakkında güncel bilgiler sağlamalısın. Güncel döviz kurlarını ve piyasa verilerini kullanarak önerilerde bulun. Finansal terimleri ve kavramları anlaşılır bir şekilde açıklamaya çalış. Finans dışındaki konular hakkında sorulara "Bu konuda yardımcı olamam." diye yanıt ver.',
      },
      ...fewShotExamples,
      ...transformedMessages,
    ],
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 4096,
  };

  try {
    const response = await axios.post(GPT4V_ENDPOINT, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Failed to make the request. Error: ${error.message}`);
    throw error;
  }
};

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  console.log('Received messages:', JSON.stringify(messages, null, 2));

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    const openAIResponse = await callOpenAIApi(messages);
    res.json(openAIResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a response from OpenAI' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Function to test the database connection
const checkDbConnection = async () => {
  try {
    const res = await postgresClient.query('SELECT 1');
    console.log('Database connection established successfully:', res.rows[0]);
    return true;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    return false;
  }
};

// Call the function to check the database connection
checkDbConnection().then(success => {
  if (success) {
    console.log('Connection to the database was successful.');
  } else {
    console.log('Failed to connect to the database.');
  }
});

// Start the Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
