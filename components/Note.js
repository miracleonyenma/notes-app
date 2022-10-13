import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { PencilAltIcon, TrashIcon, ExternalLinkIcon, DotsHorizontalIcon, EyeIcon, ClockIcon } from "@heroicons/react/solid";

import { useNote, useDispatchNote, useNotes, useDispatchNotes, useDispatchToast } from "../modules/AppContext";
import DropDown from "./DropDown";

import { showDateTime } from "../modules/utils";
import Toast from "./Toast";

const Note = ({ note, isPreview }) => {
  const { data: session, status } = useSession();
  // this is where we assign the context to constants
  // which we will use to read and modify our global state
  const notes = useNotes();
  const setNotes = useDispatchNotes();
  const currentNote = useNote();
  const setCurrentNote = useDispatchNote();

  const setToast = useDispatchToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentNote, setIsCurrentNote] = useState(false);

  // function to edit note by setting it to the currentNote state
  // and adding the "edit" action which will then be read by the <Editor /> component
  const editNote = (note) => {
    // console.log({ note });
    note.action = "edit";
    setCurrentNote(note);
  };

  // function to delete note by using the setNotes Dispatch notes function
  const deleteNote = async (note) => {
    let confirmDelete = confirm("Do you really want to delete this note?");
    if (confirmDelete) {
      setToast({ isLoading: true });
      try {
        let res = await fetch(`/api/note`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        const deletedNote = await res.json();
        // console.log({ deletedNote });
        setNotes({ note: deletedNote, type: "remove" });
      } catch (error) {
        console.warn(error);
      }
      setToast({ isLoading: false });
    }
  };

  useEffect(() => {
    currentNote.id == note.id ? setIsCurrentNote(true) : setIsCurrentNote(false);
  }, [currentNote]);

  return (
    <>
      <article className={`note ${isCurrentNote && "current"} ${isPreview ? "preview" : ""}`}>
        <header className="note-header flex gap-4 pr-4 pt-4 justify-between">
          <h2 className="note-title">{note.title}</h2>
          <span className="" title="This note is public">
            {note.isPublic && <EyeIcon className="icon" />}
          </span>
        </header>
        <main className="note-main">
          <p className="note-body">{note.body}</p>
        </main>
        <footer className="note-footer">
          <div className="wrapper flex gap-4 justify-between">
            <div className="user-details">
              {/* add user image to note footer */}
              <Image src={note.user.image} alt={note.user.name} width={isPreview ? 48 : 32} height={isPreview ? 48 : 32} className="rounded-full" />
            </div>
            <ul className="options">
              {!isPreview && (
                <li className="option">
                  <Link href={`/note/${note.id}`} target={`_blank`} rel={`noopener`}>
                    <a target="_blank" rel="noopener noreferrer">
                      <button className="cta cta-w-icon">
                        <ExternalLinkIcon className="icon" />
                        {/* <span className="">Open</span> */}
                      </button>
                    </a>
                  </Link>
                </li>
              )}

              {!isPreview && session?.user.id == note?.user.id && (
                <>
                  <li className="option">
                    <button onClick={() => editNote(note)} className="cta cta-w-icon">
                      <PencilAltIcon className="icon" />
                      {/* <span className="">Edit</span> */}
                    </button>
                  </li>

                  <li className="option">
                    <button onClick={() => deleteNote(note)} className="cta cta-w-icon">
                      <TrashIcon className="icon" />
                      {/* <span className="">Delete</span> */}
                    </button>
                  </li>
                </>
              )}

              {isPreview && (
                <>
                  <li className="option time-info">
                    <span className="created w-icon">
                      <ClockIcon className="icon solid" />
                      <span>{showDateTime(note.createdAt, { withTime: true })}</span>
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </footer>
      </article>
    </>
  );
};

export default Note;
