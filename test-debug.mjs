import axios from 'axios';

async function test() {
  try {
    const newsRes = await axios.get('http://localhost:3001/api/news');
    console.log('News count:', newsRes.data.length);
    console.log('News item:', JSON.stringify(newsRes.data[0], null, 2));

    const commentsRes = await axios.get('http://localhost:3001/api/comments/by-article');
    console.log('\nComments by article count:', commentsRes.data.length);
    console.log('First article:', JSON.stringify(commentsRes.data[0], null, 2));

    const detailRes = await axios.get('http://localhost:3001/api/news/' + newsRes.data[0].id);
    console.log('\nDetail comments:', detailRes.data.comments);
  } catch (err) {
    console.error('Test failed:', err.response?.status, err.response?.data || err.message);
  }
}

test();
