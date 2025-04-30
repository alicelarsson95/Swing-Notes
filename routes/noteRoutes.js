import express from "express"
import { addNote, getNotes, updateNote, deleteNote, searchNotes } from "../controllers/noteController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()
/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, addNote);
/**
 * @swagger
 * /notes:
 *   get:
 *     summary: View all your saved notes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of user's notes
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, getNotes);
/**
 * @swagger
 * /notes:
 *   put:
 *     summary: Edit an existing note
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.put("/", auth, updateNote);
/**
 * @swagger
 * /notes:
 *   delete:
 *     summary: Remove a saved note
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.delete("/", auth, deleteNote);
/**
 * @swagger
 * /notes/search:
 *   get:
 *     summary: Search notes by title
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title (or part of it) to search for
 *     responses:
 *       200:
 *         description: List of matching notes
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/search", auth, searchNotes);

export default router