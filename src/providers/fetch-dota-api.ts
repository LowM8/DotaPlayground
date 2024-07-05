import fs from "fs";

async function test()  {
  const heroesData = await fetch("https://dl.gordon.business/heroes.json");

  fs.writeFileSync("src/assets/heroes.json", await heroesData.text());
}

test()
