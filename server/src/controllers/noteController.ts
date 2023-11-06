import { RequestHandler } from "express";
import noteModel from "../models/noteModel";

// export const getAllNotes: RequestHandler = async (req, res) => {
//   try {
//     // Check if req.user exists before accessing its properties
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const response = await noteModel.find({ user: req.user._id });
//     res.json(response);
//   } catch (error) {
//     // Log the error to the console or use a logging library
//     console.error("Error fetching notes:", error);

//     // Respond with an error message that includes more context
//     res.status(500).json({ message: "An error occurred while fetching notes" });
//   }
// };

export const addNotes: RequestHandler = async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ message: "Title and text are required" });
  }

  try {
    // Check if req.user exists and has the _id property
    // if (!req.user || !req.user._id) {
    //   return res.status(401).json({ message: "User not authenticated" });
    // }

    // const addnote = await noteModel.create({
    //   title: title,
    //   text: text,
    //   user: req.user._id,
    // });
    console.log(req.user);
    // res.json(addnote);
  } catch (error) {
    console.error("Error adding note:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the note" });
  }
};
