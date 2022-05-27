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
  let note;

  try {
    note = await getNoteByID(id);
  } catch (error) {
    note = dummyNote;
  }
  if (session?.user?.id == note?.userId || note?.isPublic) {
    return {
      props: {
        note,
      },
    };
  } else
    return {
      props: {
        note: dummyNote,
      },
    };
};

const PreviewNote = ({ note }) => {
  const { data: session, status } = useSession();

  console.log({ note, session, status });

  return (
    <>
      <Head>
        <title>{note?.title}</title>
        <meta name="title" content={`${note?.title}`} key={`meta-title`} />
        <meta name="description" content={`By ${note?.user.name}`} key={`meta-description`} />

        <meta property="og:title" content={`${note?.title}`} key={`og-title`} />
        <meta property="og:description" content={`By ${note?.user.name}`} key={`og-description`} />

        <meta property="twitter:title" content={`${note?.title}`} key={`twitter-title`} />
        <meta property="twitter:description" content={`By ${note?.user.name}`} key={`twitter-description`} />

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
