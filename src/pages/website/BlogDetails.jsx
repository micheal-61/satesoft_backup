import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  FaArrowLeft, FaClock, FaShareAlt, FaUser, FaComments, FaEye, FaCalendarAlt,
  FaThumbsUp, FaUserCircle, FaPaperPlane, FaSpinner, FaCheck, FaRegComment
} from "react-icons/fa";
import axios from 'axios';

const getStoredUsername = () => {
  let username = localStorage.getItem('satesoft_blog_username');
  if (!username) {
    const adjectives = ['Swift', 'Bright', 'Clever', 'Brave', 'Calm', 'Eager', 'Happy', 'Jolly', 'Kind', 'Lively'];
    const nouns = ['Writer', 'Reader', 'Viewer', 'Explorer', 'Thinker', 'Dreamer', 'Builder', 'Mover', 'Shaker', 'Maker'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(100 + Math.random() * 900);
    username = `${adjective} ${noun} ${number}`;
    localStorage.setItem('satesoft_blog_username', username);
  }
  return username;
};

const BlogDetails = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const username = commentAuthor || 'Guest';

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          const text = await response.text();
          let errorMsg = `HTTP ${response.status}`;
          try {
            const err = JSON.parse(text);
            errorMsg = err.error || errorMsg;
          } catch {
            errorMsg = text || errorMsg;
          }
          throw new Error(errorMsg);
        }
        const data = await response.json();

        setArticle({
          ...data,
          publishDate: data.date,
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500",
          readTime: "5 min read",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    if (article?.id) {
      fetch('/api/news/' + article.id + '/view', { method: 'POST' }).then(() => {
        localStorage.setItem('satesoft_dashboard_refresh', String(Date.now()));
      }).catch(() => {});
    }
  }, [article?.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchComments = useCallback(async (articleId) => {
    setCommentLoading(true);
    setCommentError('');
    try {
      const response = await axios.get(`/api/articles/${articleId}/comments`);
      const data = Array.isArray(response.data) ? response.data : [];
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setCommentError('Failed to load comments. Please try again.');
      setComments([]);
    } finally {
      setCommentLoading(false);
    }
  }, []);

  useEffect(() => {
    if (article?.id) {
      fetchComments(article.id);
    }
  }, [article?.id, fetchComments]);

  useEffect(() => {
    const refresh = () => {
      if (article?.id) {
        fetchComments(article.id);
      }
    };

    const handleStorage = (e) => {
      if (e.key === 'satesoft_comments_cleared') {
        refresh();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    const handleFocus = () => {
      refresh();
    };

    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleVisibility);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleVisibility);
    };
  }, [article?.id, fetchComments]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy link", error);
    }
  };

  const paragraphs = article?.content?.split(/\n\s*\n/).filter(Boolean) || [];
  const readTime = useMemo(() => {
    const words = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(2, Math.ceil(words / 180));
  }, [paragraphs]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setCommentError('');

    if (!commentAuthor.trim() || !newCommentContent.trim()) {
      setCommentError('Please enter your name and a comment.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/api/comments', {
        articleId: article.id || article._id,
        author: commentAuthor.trim(),
        content: newCommentContent.trim(),
        parentId: null
      });

      if (response.data.success) {
        localStorage.setItem('satesoft_blog_username', commentAuthor.trim());
        setCommentSuccess(true);
        setNewCommentContent('');
        setComments((current) => [{ ...response.data, _id: response.data.id, replies: [] }, ...current]);
        localStorage.setItem('satesoft_dashboard_refresh', String(Date.now()));
        setTimeout(() => setCommentSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setCommentError(error.response?.data?.error || 'Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await axios.put(`/api/comments/${commentId}/like`);
      setComments(prevComments => 
        prevComments.map(comment => {
          if (comment._id === commentId) {
            return { ...comment, likes: response.data.likes };
          }
          if (comment.replies) {
            const updatedReplies = comment.replies.map(reply => 
              reply._id === commentId ? { ...reply, likes: response.data.likes } : reply
            );
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return <div className="mx-auto min-h-screen max-w-4xl px-4 py-20 text-center text-lg font-medium text-text/70">Loading...</div>;
  }

  if (error || !article) {
    return (
      <div className="mx-auto min-h-screen max-w-4xl px-4 py-20 text-center">
        <p className="text-lg font-medium text-red-500 mb-6">{error || "Article not found."}</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg py-10 sm:py-16">
      <div className="fixed left-0 top-0 z-40 h-1 w-full bg-slate-200/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50">
            <FaArrowLeft />
            Back to Blog
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-semibold text-text/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-600"
          >
            <FaShareAlt />
            {copied ? "Link copied" : "Share story"}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="group overflow-hidden rounded-[0.3rem] border border-border bg-surface shadow-xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-72 overflow-hidden sm:h-[430px]">
              <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                  {article.category}
                </span>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{article.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                  <span className="flex items-center gap-2"><FaUser /> {article.author}</span>
                  <span className="flex items-center gap-2"><FaClock /> {readTime} min read</span>
                  <span>{article.publishDate}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mb-8 rounded-[0.3rem] border border-primary-100 bg-primary-50/70 p-4 text-sm text-text/80 shadow-sm sm:p-5">
                <p className="font-semibold text-primary-700">Why this matters</p>
                <p className="mt-2 leading-7">
                  {article.excerpt}
                </p>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-text/80 leading-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${article.id}-${index}`} className="rounded-[0.3rem] bg-white/40 p-0.5">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="group sticky top-16 rounded-[0.3rem] border border-border bg-surface p-6 shadow-lg shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">At a glance</p>
              <h2 className="mt-3 text-xl font-bold text-text">What this update means</h2>
              <ul className="mt-5 space-y-3 text-sm text-text/70">
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">{article.category}</li>
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">Published on {article.publishDate}</li>
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">By {article.author}</li>
              </ul>

              <div className="mt-6 rounded-[0.3rem] border border-dashed border-primary-200 bg-primary-50/60 p-4 text-sm text-primary-700">
                {article.excerpt}
              </div>
            </div>
          </aside>
        </div>

        {/* COMMENTS SECTION */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaComments className="text-[#72bf24]" />
            Comments ({comments.length})
          </h2>

           {/* Comments List */}
           <div className="space-y-4 mb-8">
             {commentLoading ? (
               <div className="flex justify-center py-8">
                 <FaSpinner className="animate-spin text-[#72bf24] text-2xl" />
               </div>
             ) : commentError ? (
               <div className="text-center py-8 text-red-500">{commentError}</div>
             ) : !Array.isArray(comments) || comments.length === 0 ? (
               <div className="text-center py-8 text-gray-500">
                 <FaRegComment className="text-4xl mx-auto mb-3 text-gray-300" />
                 <p>No comments yet. Be the first to share your thoughts!</p>
               </div>
             ) : (
               comments.map((comment) => (
                 <CommentItem
                   key={comment._id}
                   comment={comment}
                  onLike={handleLikeComment}
                  formatDate={formatRelativeTime}
                />
              ))
            )}
          </div>

          {/* Comment Form - Username is auto-detected */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            {commentSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Comment submitted successfully!</span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#72bf24]/10 flex items-center justify-center text-[#72bf24] font-semibold flex-shrink-0">
                {username.charAt(0)}
              </div>
              <div className="flex-1">
                <form onSubmit={handleSubmitComment}>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Your name</label>
                  <input
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    maxLength="80"
                    placeholder="Type your name here..."
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#72bf24]"
                    required
                  />
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Your comment</label>
                  <textarea
                    placeholder="Share a thoughtful comment..."
                    rows="4"
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                    maxLength="2000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent resize-none text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-400">{newCommentContent.length}/2000 characters</p>
                  {commentError && (
                    <p className="text-red-500 text-sm mt-2">{commentError}</p>
                  )}
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 bg-[#72bf24] text-white rounded-lg hover:bg-[#62a71e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Post Comment
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Comment Item Component
const CommentItem = ({ comment, onLike, formatDate }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100/70 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <FaUserCircle className="text-3xl text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            {comment.isApproved === false && (
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                Pending
              </span>
            )}
          </div>
          <p className="text-gray-700 mt-1 break-words">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onLike(comment._id)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#72bf24] transition-colors"
            >
              <FaThumbsUp className={comment.likes > 0 ? 'text-[#72bf24]' : ''} />
              <span>{comment.likes || 0}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 ml-8 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onLike={onLike}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
