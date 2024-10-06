import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import EntryCard from "./EntryCard";

function EntryList({ entries }) {
  const navigate = useNavigate();

  const handleEntryClick = (entry) => {
    navigate(`/entries/${entry.id}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center p-4 gap-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onClick={() => handleEntryClick(entry)}
        />
      ))}
    </div>
  );
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default EntryList;
