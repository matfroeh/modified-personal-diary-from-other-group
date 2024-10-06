import EntryList from "../components/EntryList";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  const entries = useLoaderData();
  return (
    <div className="bg-gradient-to-b from-red-400 to-gray-700">
      <EntryList entries={entries} />;
    </div>
  );
}

export default HomePage;
