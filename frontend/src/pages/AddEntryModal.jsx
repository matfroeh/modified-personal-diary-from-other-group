import { useState } from "react";
import { createPost } from "../services/postService";
import { useNavigate, Form } from "react-router-dom";

function AddEntryModal() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    date: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (e) => {
    if (Object.keys(form).some((key) => form[key].trim() === "")) {
      e.preventDefault();
      alert("Please fill in all fields");
      return;
    }

    const newEntry = form;
    try {
      await createPost(newEntry);
      navigate("/");
    } catch (error) {
      e.preventDefault();
      console.error("Error saving the entry:", error);
      alert("An error occurred while saving the entry. Please try again.");
    }
  };

  return (
    <Form method="post" action="/">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add New Entry
          </h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="date"
            name="date"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.date}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.image}
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder="Content"
            name="content"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.content}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default AddEntryModal;
