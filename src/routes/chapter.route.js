const express = require("express");
const router = express.Router();
const Chapter = require("../models/chapter");

// Getting the list of chapters

router.get("/", (req, res) => {
    Chapter.find({})
        .then((chapters) => {
            res.status(200).send(chapters)
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        })
})

// Adding a new chapter

router.post("/", (req, res) => {
    const chapterData = req.body;
    const newChapter = new Chapter(chapterData)
    newChapter.save(newChapter)
        .then(() => {
            res.status(200).json({
                message: "Added!",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        })
})

// Adding a new chapter

router.put("/:id", (req, res) => {
    let updatedChapter = req.body;
    console.log(updatedChapter)
    Chapter.updateOne({ _id: req.params.id }, updatedChapter)
        .then(() => {
            res.status(200).json({
                message: "Updated!",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        })
})


module.exports = router;
