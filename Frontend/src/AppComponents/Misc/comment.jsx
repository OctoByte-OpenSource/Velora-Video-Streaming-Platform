/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

const comment = () => {
 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '', author: '' });
  const [reply, setReply] = useState({ text: '', author: '', commentId: null });

  // Handle comment form submit
  const handleSubmitComment = (e) => {
    e.preventDefault();
    return e;
  };

  // Handle reply form submit
  const handleSubmitReply = (e) => {
    e.preventDefault();
    return e;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
        <div className="border-t-2 border-gray-200 mt-4"></div>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment._id} className="bg-white p-4 rounded-md shadow-md">
            <p className="font-semibold text-gray-700">{comment.author}</p>
            <p className="text-gray-600">{comment.text}</p>

            <div className="mt-4">
              <button
                onClick={() => setReply({ ...reply, commentId: comment._id })}
                className="text-blue-500 text-sm">Reply</button>

              {/* Display replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-4">
                  {comment.replies.map((reply, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                      <p className="font-semibold text-gray-700">{reply.author}</p>
                      <p className="text-gray-600">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <form className="mt-6" onSubmit={handleSubmitComment}>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Add a comment"
          rows="4"
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
      </form>

      {/* Add Reply */}
      {reply.commentId && (
        <form className="mt-6" onSubmit={handleSubmitReply}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            placeholder="Your name"
            value={reply.author}
            onChange={(e) => setReply({ ...reply, author: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Add a reply"
            rows="4"
            value={reply.text}
            onChange={(e) => setReply({ ...reply, text: e.target.value })}
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Submit Reply</button>
        </form>
      )}
    </div>
  );
}

export default comment;

// Completed Today
// Chatbox
// Comment Section -> Reply comment pending
// VideoPlayer
// VideoDetails
// SingleVideoPage
// WatchPartyPage
