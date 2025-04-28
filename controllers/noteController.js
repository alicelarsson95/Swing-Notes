import { v4 as uuidv4 } from "uuid";
import { createNote, getAllNotesForUser, updateNoteById, deleteNoteById, searchNotesByTitle } from "../models/noteModel.js";
import { validateNotes, validateUpdateNote } from "../utils/validation.js";

export async function addNote(req, res) {
  const { title, text } = req.body;
  const userId = req.user?.userId;

  const error = validateNotes(title, text);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const newNote = {
    id: uuidv4(),
    userId,
    title,
    text,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };

  try {
    const savedNote = await createNote(newNote);
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({
      message: "Could not create note",
      error: error.message,
    });
  }
}

export async function getNotes(req, res) {
  const userId = req.user?.userId;

  try {
    const notes = await getAllNotesForUser(userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch notes",
      error: error.message,
    });
  }
}

export async function updateNote(req, res) {
  const userId = req.user?.userId;
  const { id, title, text } = req.body;

  const error = validateUpdateNote(id, title, text);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const updatedNote = await updateNoteById(id, userId, title, text);

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Could not update note: " + error.message });
  }
}

export async function deleteNote(req, res) {
  const userId = req.user?.userId;
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const deleted = await deleteNoteById(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete note: " + error.message });
  }
}

export async function searchNotes(req, res) {
  const userId = req.user?.userId;  
  const { title } = req.query; 

  if (!title) {
    return res.status(400).json({ message: "Title query parameter is required" });
  }

  try {
    const notes = await searchNotesByTitle(userId, title);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Could not search notes: " + error.message });
  }
}

