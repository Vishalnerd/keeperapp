import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(idToDelete) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== idToDelete));
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
                <Note
                key={index}
                id={index} // Ensure `id` corresponds to the index of the note
                title={noteItem.title}
                content={noteItem.content}
                onDelete={() => deleteNote(index)} // Pass deleteNote with index
                />
              ))}
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
