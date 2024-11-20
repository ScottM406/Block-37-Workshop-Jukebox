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
  const tracks = Array.from({ length: numTracks}, () => ({
    name: faker.word.adjective() + " " + faker.word.noun() + " " + faker.hacker.ingverb() + " " + faker.word.adverb(),
  }));

  await prisma.user.createMany({ data: users });
  await prisma.track.createMany({ data: tracks });
  //Create loop that adds random tracks until a random playlist length is reached
  for (let i = 0; i < numPlaylists; i++ ) {
  const playlistLength = Math.floor(Math.random() * numTracks);
  const tracklist = Array.from({length: playlistLength}, (_,i) => ({
    id: Math.floor(Math.random() * numTracks) + 1,
  }));
  const owner = Math.floor((Math.random() * 5) + 1)
  await prisma.playlist.create({
    data: {
    name: faker.music.genre() + " mix",
    description: faker.internet.emoji().repeat(10),
    tracks: { connect: tracklist },
    ownerID: owner
    }
  });
}
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
