import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote, searchNotes } = context;
  const [note, setNote] = useState({
    userName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const results = await searchNotes(searchTerm);

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching notes:", error.message);
    }
  };

  const hendleClick = (e) => {
    e.preventDefault();
    addNote(note.userName, note.emailAddress, note.phoneNumber);
    setNote({
      userName: "",
      emailAddress: "",
      phoneNumber: "",
    });
    props.showAlert("Added Successfull", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div style={{ float: "right" }}>
        <input
          style={{ width: "50%", borderRadius: "6px", borderColor: "cornsilk" }}
          // className="form-control"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-warning" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="conatiner my-3">
        <h1>Add new user here....</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={note.userName}
              aria-describedby="emailHelp"
              onChange={onChange}
              style={{ width: "20%" }}
              placeholder="Enter user's name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              value={note.emailAddress}
              onChange={onChange}
              style={{ width: "25%" }}
              placeholder="Enter user's email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={note.phoneNumber}
              onChange={onChange}
              style={{ width: "30%" }}
              maxLength={10}
              minLength={10}
              placeholder="Enter 10-digit Phone number"
            />
          </div>

          <button
            disabled={note.userName.length < 5 || note.emailAddress.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={hendleClick}
          >
            Add User
          </button>
        </form>
        {/* Display search results */}
        {searchResults && (
          <div>
            <h3>Search Result</h3>
            <p>
              <b>User Name:</b> {searchResults.userName}
            </p>
            <p>
              <b>Email Address:</b> {searchResults.emailAddress}
            </p>
            <p>
              <b>Phone Number:</b> {searchResults.phoneNumber}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNote;
