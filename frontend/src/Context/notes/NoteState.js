import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://user-backend-4na6.onrender.com";
  // const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //-----GET ALL NOTES----
  const getNote = async () => {
    try {
      //------ API CALL-----
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  //---------Search Notes-------------------

  const searchNotes = async (searchTerm) => {
    try {
      const response = await fetch(`${host}/api/notes/search?q=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("API Response:", json);
      return json;
    } catch (error) {
      console.error("Error fetching search results:", error.message);

      throw error;
    }
  };

  //-----ADD NOTES----
  const addNote = async (userName, emailAddress, phoneNumber) => {
    //------API CALL-----
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ userName, emailAddress, phoneNumber }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //-----DELETE A NOTE
  const deleteNote = async (id) => {
    //------API CALL-----
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //-----EDIT A NOTE
  const editNote = async (id, userName, emailAddress, phoneNumber) => {
    //------API CALL-----

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ userName, emailAddress, phoneNumber }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //-----Logic to edit in client----
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].userName = userName;
        newNotes[index].emailAddress = emailAddress;
        newNotes[index].phoneNumber = phoneNumber;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote, searchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
