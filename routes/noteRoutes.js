import express from "express"
import { addNote, getNotes, updateNote, deleteNote, searchNotes } from "../controllers/noteController.js"
import { authenticate } from "../middleware/authenticate.js"

const router = express.Router()

router.post("/", authenticate, addNote);
router.get("/", authenticate, getNotes);
router.put("/", authenticate, updateNote);
router.delete("/", authenticate, deleteNote);
router.get("/search", authenticate, searchNotes);

export default router