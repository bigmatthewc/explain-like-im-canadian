import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.NEWS_API_KEY;
const SOURCES = 'cbc-news,the-globe-and-mail,national-post';

async function testNewsAPI() {
  try {
    if (!API_KEY) throw new Error('Missing NEWS_API_KEY in environment');
    
    const url = `https://newsapi.org/v2/top-headlines?sources=${SOURCES}&apiKey=${API_KEY}`;
    console.log('Testing URL:', url.replace(API_KEY, '***'));
    
    const response = await axios.get(url);
    console.log('API Success! Article count:', response.data.articles.length);
    console.log('First article:', {
      title: response.data.articles[0]?.title,
      source: response.data.articles[0]?.source.name
    });
    
    return response.data;
  } catch (error) {
    console.error('API Test Failed!');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data?.message || error.message);
    process.exit(1);
  }
}

await testNewsAPI();