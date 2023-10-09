import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    userName1: "",
    emailAddress1: "",
    phoneNumber1: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      userName1: currentNote.userName,
      emailAddress1: currentNote.emailAddress,
      phoneNumber1: currentNote.phoneNumber,
    });
  };

  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  const toggleShow = () => invokeModal(!isShow);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const hendleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.userName1, note.emailAddress1, note.phoneNumber1);
    refClose.current.click();
    props.showAlert("Updated Successfull", "success");
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Button
        className="d-none"
        ref={ref}
        variant="primary"
        onClick={initModal}
      >
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={toggleShow}>
          <Modal.Title>Edit-User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName1"
                name="userName1"
                value={note.userName1}
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailAddress" className="form-label">
                Email Address
              </label>
              <input
                type="text"
                className="form-control"
                id="emailAddress1"
                name="emailAddress1"
                value={note.emailAddress1}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailAddress" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber1"
                name="phoneNumber1"
                value={note.phoneNumber1}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="danger" onClick={toggleShow}>
            Close
          </Button>
          <Button variant="dark" onClick={hendleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <h2>User Details</h2>
        <br />
        <div className="container">
          {notes.length === 0 &&
            "Nothing to Preview - Please add Users to see here"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
