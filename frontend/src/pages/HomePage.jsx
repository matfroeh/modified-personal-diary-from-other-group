import EntryList from "../components/EntryList";
import { Outlet, useLoaderData, useActionData } from "react-router-dom";

function HomePage() {
  const entries = useLoaderData();
  const newEntry = useActionData(); // Just for demonstration purposes, no real use here
  // console.log("ActionData:", newEntry? newEntry : "No new entry");

  return (
    <div className="bg-gradient-to-b from-red-400 to-gray-700">
      <EntryList entries={entries} />;
      <Outlet />
    </div>
  );
}

export default HomePage;
