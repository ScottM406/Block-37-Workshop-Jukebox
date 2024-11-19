const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numTracks = 20, numPlaylists = 10) => {
  const users = [
    {username: "thegodfatherpart4"},
    {username: "TurdFurguson88"},
    {username: "LtDansLegs"},
    {username: "BuzzLightbeer"},
    {username: "ALLLOWERCASE"}
  ];
  const tracks = Array.from({ length: numTracks}, (_,i) => ({
    name: faker.word.adjective() + " " + faker.word.noun() + " " + faker.hacker.ingverb() + " " + faker.word.adverb(),
  }));

  await prisma.user.createMany({ data: users });
  await prisma.track.createMany({ data: tracks });
  //Create loop that adds random tracks until a random playlist length is reached
  const playlistLength = ;
  const tracklist = ;
  await prisma.playlist.create({
    data: {
    name: faker.music.genre() + " mix",
    description: faker.internet.emoji() * 10,
    tracks: { connect: tracklist }
    }
  });
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
