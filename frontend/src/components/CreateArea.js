import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const id = sessionStorage.getItem("id");

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  async function submitNote(event) {
    event.preventDefault();
    if (note.title === "" || note.content === "") {
      toast.error("Title or Body cannot be Empty");
    } else {
      try {
        if (id) {
          await axios.post("http://localhost:3000/api/v2/addTask", {
            title: note.title,
            body: note.content,
            id: id,
          });
  
          props.onAdd(note);
          setNote({
            title: "",
            content: "",
          });
  
          toast.success("Your Task is Added");
        } else {
          props.onAdd(note);
          setNote({
            title: "",
            content: "",
          });
  
          toast.success("Your Task is Added but not Saved! Please Sign Up");
        }
      } catch (error) {
        toast.error("Failed to add task");
      }
    }
  }
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v2/getTasks/${id}`);
        const fetchedTasks = response.data.list;
        // Example of using the fetched tasks (if needed)
        console.log(fetchedTasks);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };

    if (id) {
      fetchTasks();
    }
  }, [id]); // Include 'id' in the dependency array

  return (
    <div>
      <ToastContainer />
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
