import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { SearchClient, AzureKeyCredential } from '@azure/search-documents';

const router = express.Router();

dotenv.config();


// Azure OpenAI configuration
const GPT4V_KEY = process.env.GPT4V_KEY;
const GPT4V_ENDPOINT = process.env.GPT4V_ENDPOINT;

const headers = {
  'Content-Type': 'application/json',
  'api-key': GPT4V_KEY,
};

// Azure Cognitive Search configuration
const searchEndpoint = process.env.AZURE_SEARCH_ENDPOINT;
const searchApiKey = process.env.AZURE_SEARCH_API_KEY;
const searchIndexName = process.env.AZURE_SEARCH_INDEX;

const searchClient = new SearchClient(
  searchEndpoint,
  searchIndexName,
  new AzureKeyCredential(searchApiKey)
);

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

// Function to call Azure OpenAI API
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

// Function to query Azure Cognitive Search
const querySearchIndex = async (query) => {
  try {
    const searchResults = await searchClient.search(query);
    const results = [];
    for await (const result of searchResults.results) {
      results.push(result);
    }
    return results;
  } catch (error) {
    console.error(`Failed to query search index. Error: ${error.message}`);
    return [];
  }
};

// Route to handle chat requests
router.post('/chat', async (req, res) => {
  const { messages } = req.body;

  console.log('Received messages:', JSON.stringify(messages, null, 2));

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    // Extract the latest user message for search query
    const latestUserMessage = messages.filter((message) => message.isUser).pop().text;

    // Query the search index
    const searchResults = await querySearchIndex(latestUserMessage);

    // Prepare the additional information from search results
    const additionalInfo = searchResults.map((result) => result.document.content).join('\n');

    // Add the additional information to the OpenAI messages
    const openAIMessages = [
      ...messages,
      {
        isUser: false,
        text: `Here is some additional information based on your query:\n${additionalInfo}`,
      },
    ];

    // Call OpenAI API with the enriched messages
    const openAIResponse = await callOpenAIApi(openAIMessages);
    res.json(openAIResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a response from OpenAI' });
  }
});


export default router;
