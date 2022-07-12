// ./prisma/Note.js
import prisma from "./prisma";

//
// import { PrismaClient } from "@prisma/client";
// let prisma = new PrismaClient();
//

const serializeData = (notes) => {
  for (const note of notes) {
    note.createdAt = `${note.createdAt}`;
    note.updatedAt = `${note.updatedAt}`;
    // note.createdAt = note.createdAt.toString();
    // note.updatedAt = note.updatedAt.toString();
    console.log({ noteCreatedAt: note.createdAt });
  }

  console.log({ notes });

  return notes;
};

const serializeDataItem = (note) => {
  note.createdAt = note.createdAt.toString();
  note.updatedAt = note.updatedAt.toString();

  return note;
};

// CREATE
export const createNote = async (title, body, session) => {
  const newNote = await prisma.note.create({
    data: {
      title,
      body,
      user: { connect: { email: session?.user?.email } },
    },
  });

  const note = await getNoteByID(newNote.id);

  return note;
};

// READ
//get unique note by id
export const getNoteByID = async (id) => {
  let note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  note = serializeDataItem(note);

  return note;
};

// get all notes
export const getAllNotes = async () => {
  let notes = await prisma.note.findMany({
    include: {
      user: true,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });

  notes = serializeData(notes);

  return notes;
};

// get all public notes
export const getAllPublicNotes = async () => {
  try {
    let notes = await prisma.note.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });

    notes = serializeData(notes);

    return notes;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

// get notes by user
export const getAllNotesByUserID = async (id) => {
  let notes = await prisma.note.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });

  notes = serializeData(notes);

  return notes;
};

// UPDATE
export const updateNote = async (id, updatedData, session) => {
  let userId = session?.user.id;

  console.log({ updatedData });
  const updatedNote = await prisma.note.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      ...updatedData,
    },
  });

  const note = await getNoteByID(updatedNote.id);

  return note;
};

// DELETE
export const deleteNote = async (id, session) => {
  let userId = session?.user.id;

  console.log({ id, userId });

  const deletedNote = await prisma.note.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });

  return deletedNote;
};
