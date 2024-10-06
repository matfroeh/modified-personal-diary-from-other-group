const PostDetailsLoader = ({ params }) => {
  return fetch(`http://localhost:3000/api/entries/${params.id}`);
};

export default PostDetailsLoader;
