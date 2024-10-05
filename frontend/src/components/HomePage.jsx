import { useState, useEffect } from "react";
import Header from "./Header";
import EntryList from "./EntryList";
// import AddEntryModal from "./AddEntryModal";
import { useLocation, useNavigate } from "react-router-dom";

function HomePage() {
  const [entries, setEntries] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch posts from the backend when the component mounts or when isModalOpen changes
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching entries called...");

      try {
        const response = await fetch("http://localhost:3000/api/entries"); // Fetching posts
        // console.log('Response:', response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the JSON response
        // console.log('Fetched entries:', data); // Log the fetched data
        setEntries(data); // Update the state with fetched entries
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts(); // Call the fetch function
  }, [location]); // Empty dependency array means this runs once when the component mounts

  const handleAddEntryClick = () => {
    navigate("/create", { state: { background: location } });
  };

  // const handleAddEntryClick = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);
  // const handleSaveEntry = (entry) => {
  //   const updatedEntries = [...entries, entry];
  //   setEntries(updatedEntries);
  //   setIsModalOpen(false);
  // };

  // const handleLogoutClick = () => {
  //   // Your logout logic here
  // };

  // const handleEntryClick = (entryId) => {
  //   // Your entry click logic here
  // };

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
      {/* <EntryList entries={entries} onEntryClick={handleEntryClick} /> */}
      {isLoading ? (
        <div className="loading text-xl text-white ">Loading posts...</div>
      ) : (
        <EntryList entries={entries} />
      )}

      {/* {isModalOpen && (
        <AddEntryModal
          setIsModalOpen={setIsModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEntry}
          entries={entries}
        />
      )} */}
    </div>
  );
}

export default HomePage;
