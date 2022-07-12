import { useEffect } from "react";
import Image from "next/image";

import { useNote, useDispatchNote, useNotes, useDispatchNotes, NoteProvider } from "../modules/AppContext";
import Link from "next/link";
import Note from "./Note";

const NotesList = ({ retrieved_notes, showEditor }) => {
  // this is where we assign the context to constants
  // which we will use to read and modify our global state
  const notes = useNotes();
  const setNotes = useDispatchNotes();

  useEffect(() => {
    // replace notes in notes context state
    setNotes({ note: retrieved_notes, type: "replace" });
  }, [retrieved_notes]);

  // useEffect(() => {
  //   // console.log({notes});
  // }, [notes])

  return (
    <section className="notes">
      {notes?.length > 0 ? (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <>
                <Note note={note} />
              </>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fallback-message">
          <p>Oops.. no notes yet</p>
        </div>
      )}
    </section>
  );
};

export default NotesList;
