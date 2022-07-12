import { useEffect, useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

import NotesList from "../components/NotesList";
import Editor from "../components/Editor";

import { getSession, useSession } from "next-auth/react";

const getAllNotesByUserID = require("../prisma/Note").getAllNotesByUserID;
const getAllPublicNotes = require("../prisma/Note").getAllPublicNotes;

import HomeStyles from "../styles/Home.module.css";
import Toast from "../components/Toast";

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const publicNotes = await getAllPublicNotes();

  if (!session) {
    res.statusCode = 403;
    return { props: { notes: [], publicNotes } };
  }

  const notes = await getAllNotesByUserID(session?.user?.id);
  console.log({ publicNotes });

  return {
    props: { notes, publicNotes },
  };
};

const Home = ({ notes, publicNotes }) => {
  const { status } = useSession();
  console.log({ status });
  const [showEditor, setShowEditor] = useState(true);
  const [activeTab, setActiveTab] = useState("public");

  useEffect(() => {
    setActiveTab(status == "authenticated" ? "me" : "public");
  }, [status]);

  return (
    <>
      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {/* Editor Component */}
            {showEditor && <Editor />}

            {/* Note list component */}
            <section className="tab">
              <nav role="tablist">
                <a onClick={() => setActiveTab("public")} data-active={activeTab == "public"} href="#public" aria-controls="content-1" id="tab-1" role="tab">
                  Public
                </a>
                <a onClick={() => setActiveTab("me")} data-active={activeTab == "me"} href="#me" aria-controls="content-2" id="tab-2" role="tab">
                  Me
                </a>
              </nav>
              <div className="notelist-cont px-4">
                {activeTab == "me" && <NotesList retrieved_notes={notes} />}
                {activeTab == "public" && <NotesList retrieved_notes={publicNotes} />}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Toast />
    </>
  );
};

export default Home;
