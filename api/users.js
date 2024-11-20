const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
module.exports = router;

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {id: Number(id)},
      include: {playlists: true}
    });
    if (user) {
    res.json(user);
  } else {
    next({ status: 404, message: `User ${id} does not exist`})
  }
  } catch (e) {
    next(e);
  }
});