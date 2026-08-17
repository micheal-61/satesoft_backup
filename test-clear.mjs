import axios from 'axios';

async function test() {
  try {
    // First get comments to find an article with comments
    const commentsRes = await axios.get('http://localhost:3001/api/comments/by-article');
    console.log('Comments by article:', commentsRes.data);
    
    if (commentsRes.data.length === 0) {
      console.log('No comments to test with');
      return;
    }

    const article = commentsRes.data[0];
    console.log('\nTesting clear for article:', article.articleId);
    console.log('Comments before:', article.totalComments);

    // Try to delete
    const deleteRes = await axios.delete('http://localhost:3001/api/comments/article/' + article.articleId);
    console.log('Delete response:', deleteRes.data);

    // Verify
    const afterRes = await axios.get('http://localhost:3001/api/comments/by-article');
    const afterArticle = afterRes.data.find(a => a.articleId === article.articleId);
    console.log('Comments after:', afterArticle ? afterArticle.totalComments : 0);

    console.log('\nClear comments test passed!');
  } catch (err) {
    console.error('Test failed:', err.response?.status, err.response?.data || err.message);
    process.exit(1);
  }
}

test();
