import Head from "next/head";
import Image from "next/image";

import { getSession, useSession } from "next-auth/react";

const getNoteByID = require("../../prisma/Note").getNoteByID;

import Note from "../../components/Note";

import HomeStyles from "../../styles/Home.module.css";

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });
  let dummyNote = {
    id: "fakeID",
    title: "404",
    body: `Yup. It is what it is.
      Seems like we had some issues getting that particular note.
      `,
    isPublic: true,
    userId: "fakeID",
    user: {
      id: "fakeID",
      name: "404 guy",
      email: "404guy@nottes.app",
      emailVerified: null,
      image: "/img/panda.png",
    },
  };

  // // console.log({ params, session });
  const { id } = params;

  try {
    const note = await getNoteByID(id);
    // // console.log({ note, isPublic: note.isPublic });

    if (!session && !note.isPublic) {
      res.statusCode = 403;
      // console.log("Hide");
      return { props: { note: null, session } };
    }

    return {
      props: { note },
    };
  } catch (error) {
    return {
      props: {
        note: dummyNote,
      },
    };
  }
};

const PreviewNote = ({ note }) => {
  const { data: session, status } = useSession();

  // console.log({ note, session, status });

  if (!session && !note.isPublic) {
    // console.log("This ran??????", note.isPublic);
    return (
      <>
        <Head>
          <title>Login to view note</title>
          <meta name="description" content="Login to view this note" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={HomeStyles.container}>
          <main className={HomeStyles.main}>
            <header className="max-w-4xl mt-24 mx-auto">
              <h1 className="text-4xl">{status == "loading" ? "Preparing your note..." : "Oops... You have to login to view this note"}</h1>
            </header>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{note?.title}</title>
        <meta name="description" content={`By ${note?.user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper max-w-3xl mt-32 m-auto">
            <Note note={note} isPreview={true} />
          </div>
        </main>
      </div>
    </>
  );
};

export default PreviewNote;
