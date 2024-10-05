import { useState, useEffect } from "react";
import Header from "./Header";
import EntryList from "./EntryList";
import { useLocation, useNavigate } from "react-router-dom";

function HomePage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch posts from the backend when the component mounts or when location changes
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching entries called...");
      try {
        const response = await fetch("http://localhost:3000/api/entries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEntries(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [location]);

  const handleAddEntryClick = () => {
    navigate("/create", { state: { background: location } });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-red-400 to-gray-700">
      <div className="flex justify-center mb-6">
        <img
          src="http://i.huffpost.com/gen/2395634/images/o-DIARY-facebook.jpg"
          alt="Login Illustration"
          className="h-100% w-100% sm:h-40 sm:w-40 lg:w-60 lg:h-60"
        />
      </div>
      <div className="flex justify-center mb-6">
        <Header onAddEntryClick={handleAddEntryClick} />
      </div>
      {isLoading ? (
        <div className="loading text-xl text-white ">Loading posts...</div>
      ) : (
        <EntryList entries={entries} />
      )}
    </div>
  );
}

export default HomePage;
