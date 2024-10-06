import EntryList from "../components/EntryList";
import { Outlet, useLoaderData } from "react-router-dom";

function HomePage() {
  const entries = useLoaderData();
  return (
    <div className="bg-gradient-to-b from-red-400 to-gray-700">
      <EntryList entries={entries} />;
      <Outlet />
    </div>
  );
}

export default HomePage;
