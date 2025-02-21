import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import "./App.css";

const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && userId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `${base_url}/api/v2/getTasks/${userId}`
          );
          setNotes(response.data.list);
        } catch (error) {
          console.error("Error fetching tasks:", error.response?.data || error);
        }
      };

      fetchTasks();
    }
  }, [isLoggedIn, userId]);

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(idToDelete) {
    setNotes((prevNotes) =>
      prevNotes.filter((_, index) => index !== idToDelete)
    );
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/note"
          element={
            <>
              <CreateArea onAdd={addNote} />
              {notes.map((noteItem, index) => (
                <div className="note-container">
                  <Note
                    key={index}
                    id={index} // Ensure `id` corresponds to the index of the note
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={() => deleteNote(index)} // Pass deleteNote with index
                  />
                </div>
              ))}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
