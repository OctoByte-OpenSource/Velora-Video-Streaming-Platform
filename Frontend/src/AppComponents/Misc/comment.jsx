import { useState } from "react";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userCount, setUserCount] = useState(1); 

  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now(), 
      username: `User${userCount}`, 
      body: newComment,
    };

    setComments([...comments, comment]); 
    setNewComment(""); 
    setUserCount(userCount + 1); 
  };

  return (
    <div className="w-[90%] mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
      <div className="border-t-2 border-gray-200 mt-2 mb-4"></div>

      {/* Add New Comment */}
      <form className="mt-6" onSubmit={handleSubmitComment}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Add a comment"
          rows="4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      
      <div className="space-y-4 mt-6 pb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <p className="font-semibold text-gray-700">{comment.username}</p>
              <p className="text-gray-600">{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments</p>
        )}
      </div>
    </div>
  );
};

export default Comment;