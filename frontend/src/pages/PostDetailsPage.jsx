import { useState } from "react";
import { deletePost } from "../services/postService";
import { Link, useLoaderData } from "react-router-dom";

const PostDetailsPage = () => {
  const entry = useLoaderData();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deletePost(entry.id); // Delete post
      window.location.href = "/"; // Redirect to home
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError("Failed to delete post");
    }
  };

  if (error) return <div className="alert alert-error">{error}</div>;
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-red-400 to-gray-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <figure className="flex justify-center mb-6">
          <img
            src={entry.image}
            alt={entry.title}
            className="h-40 w-40 object-cover border-b border-gray-300"
          />
        </figure>
        <div className="card-body p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {entry.title}
          </h1>
          <p className="prose lg:prose-xl text-gray-700">{entry.content}</p>
        </div>
        <div className="text-center mt-4 flex flex-wrap justify-center gap-2">
          <Link
            to={`/update/${entry.id}`}
            className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-800"
          >
            Update Post
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800"
          >
            Delete Post
          </button>
          <Link
            to="/"
            className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-800"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
