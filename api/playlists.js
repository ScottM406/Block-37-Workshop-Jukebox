const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
module.exports = router;

router.get("/", async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, description, tracks, ownerID} = req.body;
  try {
  const playlist = await prisma.playlist.create({
    data: { 
      name,
      description,
      tracks: {connect: tracks.map(id => ({ id })) },
      ownerID,
    },
  })
  res.status(201).json(playlist);
} catch (e) {
  next(e);
}
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {id: Number(id)},
      include: {tracks: true},
    });
    if (playlist) {
      res.json(playlist);
    } else {
      next({ status: 404, message: `No playlist with an ID of ${id} exists.`});
    }
  } catch (e) {
    next(e);
  }
});
