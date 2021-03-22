import React, { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [getNote, setgetNotes] = useState("");
  const buttonStyle = {
    height: "36px",
  };

  function getNotes() {
    var storednotes = JSON.parse(localStorage.getItem("notes"));

    storednotes !== null && setNotes(storednotes);
  }

  function addNote(e) {
    e.preventDefault();
    if (getNote !== null && getNote.trim().length !== 0) {
      var newnotes = [...notes, getNote];
      setNotes(newnotes);
      localStorage.setItem("notes", JSON.stringify(newnotes));
      setgetNotes("");
    }
  }

  const Deletenote = (noteid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this notes"
    );
    if (confirm) {
      var removenote = notes.filter((item, index) => index !== noteid);
      setNotes(removenote);
      localStorage.setItem("notes", JSON.stringify(removenote));
    }
  };

  const editNote = (notedescription, notindex) => {
    var person = prompt("Please enter your name", notedescription.trim());
    if (person !== null && person.trim().length !== 0) {
      var arr = [];
      for (var i = 0; i < notes.length; i++) {
        if (i === notindex) {
          notes[i] = person;
          setNotes(notes);
        }
        arr.push(notes[i]);
      }
      setNotes(arr);
      localStorage.setItem("notes", JSON.stringify(arr));
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-info text-center p-3 mt-3">Notes</h1>
        <div className="container">
          <div className="form-group mt-5">
            <form onSubmit={(e) => addNote(e)}>
              <div className="bg-white rounded p-4">
                <h4>Add new Note</h4>
                <div className="d-flex">
                  <input
                    type="text"
                    value={getNote}
                    className="form-control"
                    onChange={(e) => setgetNotes(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-primary ms-2"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
            <div className="bg-white p-5 rounded mt-5">
              <h4>Notes</h4>
              {notes.map((note, index) => (
                <div key={index} className="row mt-3">
                  <div
                    className="col-1 text-center p-0"
                    style={{ verticalAlign: "middle" }}
                  >
                    {index + 1}
                  </div>
                  <div className="col-10 text-break p-0"> {note} </div>
                  <div className="col-1 d-flex mt-2 justify-content-center align-items-center">
                    <button
                      onClick={() => editNote(note, index)}
                      className="btn btn-sm btn-outline-primary"
                      style={buttonStyle}
                    >
                      📝
                    </button>
                    <button
                      onClick={() => Deletenote(index)}
                      className="btn btn-outline-danger ms-2"
                      style={buttonStyle}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
