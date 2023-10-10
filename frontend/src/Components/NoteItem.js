import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card my-2">
        <div className="card-body text-white bg-dark">
          <h5
            className="card-title"
            style={{ color: "rgba(251, 130, 126, 0.898)" }}
          >
            {note.userName}
          </h5>

          <p className="card-text">{note.emailAddress}</p>
          <p style={{ fontSize: "12px", color: "rgb(161, 255, 181)" }}>
            {note.phoneNumber}
          </p>

          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfull", "success");
            }}
          ></i>
          <i
            className="fas fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
    // <div class="card" style={{ width: "18rem" }}>
    //   <img
    //     src="..."
    //     class="card-img-top"
    //     alt="..."
    //   />
    //   <div class="card-body">
    //     <p class="card-text">
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </p>
    //   </div>
    // </div>
  );
};

export default NoteItem;
