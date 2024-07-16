import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const id = sessionStorage.getItem("id");
  const base_url = "http://localhost:3000";

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
          await axios.post(`${base_url}/api/v2/addTask`, {
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
        const response = await axios.get(`${base_url}/api/v2/getTasks/${id}`);
        const fetchedTasks = response.data.list;
        console.log(fetchedTasks);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };

    if (id) {
      fetchTasks();
    }
  }, [id]);

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <ToastContainer />
      <form>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
