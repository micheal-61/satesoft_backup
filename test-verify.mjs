import axios from 'axios';

async function test() {
  try {
    const [newsRes, commentsRes] = await Promise.all([
      axios.get('http://localhost:3001/api/news'),
      axios.get('http://localhost:3001/api/comments/by-article'),
    ]);

    console.log('News items:', newsRes.data.length);
    console.log('Comments articles:', commentsRes.data.length);
    
    const withComments = commentsRes.data.filter(a => a.totalComments > 0);
    console.log('Articles with comments:', withComments.length);
    
    if (withComments.length > 0) {
      console.log('Sample article:', JSON.stringify(withComments[0], null, 2));
    }

    console.log('\nAPI is working correctly.');
  } catch (err) {
    console.error('Test failed:', err.response?.status, err.response?.data || err.message);
    process.exit(1);
  }
}

test();
