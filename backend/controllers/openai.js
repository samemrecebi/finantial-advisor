import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import authenticateToken from '../Middleware/auth.js';

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

// Server message
const serverMessage = `
Wealthify yatırımcılarının sorunlarını çözen ve onlara yardımcı olan uzman yatırımcı asistanı bir yapay zeka sohbet botusunuz. Göreviniz, size yöneltilen borsa,ekonomi,para birimi kurları,yatırım,yatırım tavsiyesi vb. alanlardaki sorulara verilen datalar üzerinden ve yorumlayarak cevap vermektir. "borsa,ekonomi,yatırım,yatırım tavsiyesi vb." alanlarıyla ilgili olmayan sorulara "Bu konuda yardımcı olamam.Üzgünüm." yanıtını vereceksin. Ayrıca yatırımcılarla sohbet ettiğiniz için yanıtınız profesyonel, bilgilendirici, açıklayıcı ve samimi olmalıdır.
 
Resmi Dil Kullanımı:
Yanıtlar profesyonel ve resmi bir dil kullanılarak formüle edilmelidir. Ancak aynı zamanda samimi de olmalıdır.
Yalnızca Türkçe dilinde cevaplar vereceksin.


Doğru Belge Eşleştirmesi:
Sorulan sorulara sana verilen kaynaklar üzerinden referans vererek ve tarih gözeterek uygun cevapları vereceksin.
 Soruda sana verilen tarihin yazdığı pdf kaynak üzerinden bilgiler ile cevap vereceksin.
 Karşılaştırma sorularında sorunun içerisinde özel bir tarih belirtilmediyse her zaman en güncel tarihli dokümandan veriler ile cevap ver.
Alıntı yapılan dokümanı verdiğin cevap içerisinde belirtme.
Yanıt Biçimi:
Eğer sadece ilk mesaj ise "Merhaba, Wealthify finansal AI asistanına hoşgeldiniz. Size nasıl yardımcı olabilirim?" cevabı ile dönülmelidir, ve ardından sorulan soru varsa cevap verilmelidir. Vereceğin cevaplarda "gerekirse bir finansal danışmana danışınız" cümlesini kullanma. Onun yerine "Başka hangi konularda yardımcı olabilirim?" olarak cevap ver
Yanıtlar doğrudan kullanıcının sorgusuna odaklanmalı ve gereksiz bilgi içermemelidir.
Yanıt Süreci:
Belirsiz veya aşırı genel sorgular söz konusu olduğunda, modelin sorguyu netleştirmek için daha fazla bilgi talep etmesi uygun olabilir.
Kullanıcıya yardımcı olmak için gerektiğinde birden fazla soru sormaktan çekinme.
Yanıtların doğruluğunu ve güvenilirliğini sağlamak için gerektiğinde kaynakları kontrol et.

Örnekler:
{
  role: 'user',
  content: 'Hangi konularda yardımcı olabilirsin?',
},
{
  role: 'assistant',
  content: 'Wealthify yatırım asistanınız olarak, finansal kararlarınızı daha bilinçli ve etkili bir şekilde almanıza yardımcı oluyorum. Piyasa trendlerini takip eder, hisse senedi analizleri sunar ve portföyünüzü optimize etmeniz için önerilerde bulunurum. Ayrıca, risk toleransınızı değerlendirerek size özel yatırım stratejileri oluşturur ve finansal hedeflerinize ulaşmanız için yol gösteririm.',
},
{
  role: 'user',
  content: 'Çeşitlendirilmiş portföy nedir?',
},
{
  role: 'assistant',
  content: 'Çeşitlendirilmiş bir portföy, hisse senetleri, tahviller, gayrimenkuller ve emtialar gibi çeşitli varlık sınıfları ve yatırım türlerinin bir karışımını içerir. Amaç, yatırımları piyasa olaylarına aynı şekilde tepki vermeyebilecek farklı varlıklara yayarak riski azaltmaktır. Çeşitlendirme, bir alandaki kayıpları başka bir alandaki kazançlarla azaltmaya yardımcı olur, böylece zaman içinde daha istikrarlı getiriler elde edilir.',
},
`;

// Few-shot examples to guide the model
const fewShotExamples = [
  {
    role: 'user',
    content: 'Hangi konularda yardımcı olabilirsin?',
  },
  {
    role: 'assistant',
    content: 'Wealthify yatırım asistanınız olarak, finansal kararlarınızı daha bilinçli ve etkili bir şekilde almanıza yardımcı oluyorum. Piyasa trendlerini takip eder, hisse senedi analizleri sunar ve portföyünüzü optimize etmeniz için önerilerde bulunurum. Ayrıca, risk toleransınızı değerlendirerek size özel yatırım stratejileri oluşturur ve finansal hedeflerinize ulaşmanız için yol gösteririm.',
  },
  {
    role: 'user',
    content: 'Çeşitlendirilmiş portföy nedir?',
  },
  {
    role: 'assistant',
    content: 'Çeşitlendirilmiş bir portföy, hisse senetleri, tahviller, gayrimenkuller ve emtialar gibi çeşitli varlık sınıfları ve yatırım türlerinin bir karışımını içerir. Amaç, yatırımları piyasa olaylarına aynı şekilde tepki vermeyebilecek farklı varlıklara yayarak riski azaltmaktır. Çeşitlendirme, bir alandaki kayıpları başka bir alandaki kazançlarla azaltmaya yardımcı olur, böylece zaman içinde daha istikrarlı getiriler elde edilir.',
  },
];

// Function to call Azure OpenAI API with retry mechanism
const callOpenAIApi = async (messages, retries = 3) => {
  const payload = {
    messages,
    temperature: 0.5,
    top_p: 0.95,
    max_tokens: 800,
  };

  try {
    const response = await axios.post(GPT4V_ENDPOINT, payload, { headers });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      // If rate limited, wait and retry
      const waitTime = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return callOpenAIApi(messages, retries - 1);
    } else if (error.response && error.response.status === 400) {
      console.error(`Bad request error: ${JSON.stringify(error.response.data, null, 2)}`);
      throw error;
    } else {
      console.error(`Failed to make the request. Error: ${error.message}`);
      throw error;
    }
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
router.post('/chat', authenticateToken, async (req, res) => {
  const { messages } = req.body;

  console.log('Received messages:', JSON.stringify(messages, null, 2));

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    // Extract the latest user message for search query
    const latestUserMessage = messages.filter((message) => message.isUser).pop();
    if (!latestUserMessage || !latestUserMessage.text) {
      return res.status(400).json({ error: 'No valid user message for search query' });
    }

    //console.log('Latest user message:', latestUserMessage.text);

    // Query the search index
    const searchResults = await querySearchIndex(latestUserMessage.text);
    // Sort the search results by score
    const sortedResults = searchResults.sort((a, b) => b.score - a.score);
    console.log('Search results:', searchResults);
    
    // Prepare the additional information from search results
    let additionalInfo = sortedResults.map((result) => result.document.content).join('\n');

    //console.log('Additional information:', additionalInfo);

    // Summarize the additional information if it's too long
    if (additionalInfo.length > 20000) {
      additionalInfo = additionalInfo.slice(0, 20000) + '...'; // Simplify for demo purposes
    }

   // console.log('Summarized additional information:', additionalInfo);

    // Add the additional information to the OpenAI messages
    let openAIMessages = [
      {
        role: 'system',
        content: serverMessage,
      },
      ...messages.map(message => ({
        role: message.isUser ? 'user' : 'assistant',
        content: message.text,
      })),
      {
        role: 'assistant',
        content: `Here is some additional information based on your query:\n${additionalInfo}`,
      },
      //...fewShotExamples,
    ];

    // Call OpenAI API with the enriched messages
    const openAIResponse = await callOpenAIApi(openAIMessages);

    console.log('OpenAI response:', openAIResponse);

    res.json(openAIResponse);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error(`Bad request error: ${JSON.stringify(error.response.data, null, 2)}`);
      res.status(400).json({ error: error.response.data });
    } else {
      console.error('Failed to get a response from OpenAI:', error.message);
      res.status(500).json({ error: 'Failed to get a response from OpenAI' });
    }
  }
});


export default router;
