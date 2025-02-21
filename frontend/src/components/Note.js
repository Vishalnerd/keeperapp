import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Note.css";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
    toast.success("Task is deleted");
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="delete-btn" onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
