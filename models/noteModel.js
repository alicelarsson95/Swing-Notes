import Datastore from "nedb-promises";

const notesDB = Datastore.create({ filename: "./db/notes.db", autoload: true }); // Stort D!

export const createNote = async (note) => {
  return await notesDB.insert(note); // Stort D
};

export const getAllNotesForUser = async (userId) => {
  return await notesDB.find({ userId }); // Stort D
};

export const updateNoteById = async (id, userId, title, text) => {
  const update = {
    title,
    text,
    modifiedAt: new Date().toISOString(),
  };

  const result = await notesDB.update({ id, userId }, { $set: update }); // Stort D

  if (result === 0) {
    throw new Error("Note not found");
  }

  return await notesDB.findOne({ id, userId }); // Stort D
};

export const deleteNoteById = async (id, userId) => {
  const numRemoved = await notesDB.remove({ id, userId }); // Stort D

  if (numRemoved === 0) {
    return false;
  }

  return true;
};

export const searchNotesByTitle = async (userId, title) => {
  const regex = new RegExp(title, "i");

  return await notesDB.find({
    userId,
    title: { $regex: regex },
  });
};
