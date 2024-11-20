const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
  const track = await prisma.track.findUnique({ where: {id: Number(id)} });
  if (track) {
    res.json(track);
  } else {
    next({ status: 404, message: `No track with an ID of ${id} exists`});
  }
  } catch (e) {
    next (e);
  }
});

router.get("/", async (req, res) => {
  try{
  const tracks = await prisma.track.findMany();
  res.json(tracks)
  } catch (e) {
    next(e);
  }
});
