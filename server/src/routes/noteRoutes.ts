import express from "express";
import { addNotes } from "../controllers/noteController";
// import { getAllNotes } from "../controllers/noteController";

const router = express.Router();

// router.get("/notes", getAllNotes);
router.post("/add", addNotes);

export default router;
