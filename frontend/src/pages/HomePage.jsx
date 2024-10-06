import { useState, useEffect } from "react";
import EntryList from "../components/EntryList";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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

  return (
    <>
      {isLoading ? (
        <div className="loading text-xl text-white ">Loading posts...</div>
      ) : (
        <EntryList entries={entries} />
      )}
    </>
  );
}

export default HomePage;
