import Datastore from "nedb-promises";

const notesDB = Datastore.create({ filename: "./db/notes.db", autoload: true }); 

export const createNote = async (note) => {
  return await notesDB.insert(note); 
};

export const getAllNotesForUser = async (userId) => {
  return await notesDB.find({ userId }); 
};

export const updateNoteById = async (id, userId, title, text) => {
  const update = {
    title,
    text,
    modifiedAt: new Date().toISOString(),
  };

  const result = await notesDB.update({ id, userId }, { $set: update });

  if (result === 0) {
    throw new Error("Note not found");
  }

  return await notesDB.findOne({ id, userId }); 
};

export const deleteNoteById = async (id, userId) => {
  const numRemoved = await notesDB.remove({ id, userId });

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
