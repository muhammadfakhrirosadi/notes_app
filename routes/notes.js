const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a single note by id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("Note not found");
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, datetime, note } = req.body;
    const result = await db.query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [title, datetime, note]
    );
    res.status(201).json({ id: result[0].insertId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const { title, datetime, note } = req.body;
    await db.query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [title, datetime, note, req.params.id]
    );
    res.send("Note updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM notes WHERE id = ?", [req.params.id]);
    res.send("Note deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
