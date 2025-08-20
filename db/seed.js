import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  // Seed at least 5 files to each of the 3 folders
  // folders: {name: String}
  // files: {name: String, size: int, folder_id: int}

  for (let i = 0; i < 5; i++) {
    // Create folder data set and insert it to table
    const sqlFolder = `INSERT INTO folders(name)
    VALUES ($1) RETURNING id`;

    let folderError = true;
    let folderId;
    while (folderError) {
      try {
        const valuesFolder = [faker.color.human()];
        const { rows: folders } = await db.query(sqlFolder, valuesFolder);
        folderId = folders[0].id;
        folderError = false;
      } catch (err) {
        if (err.code === "23505") {
          console.error(`  Error with table "${err.table}": ${err.detail}.`);
        } else {
          console.error("Unknown error occured");
        }
      }
    }

    for (let j = 0; j < 8; j++) {
      // create file data set, link to folder, and insert it to table
      const sqlFile = `INSERT INTO files(name, size, folder_id)
        VALUES ($1, $2, $3) `;

      let fileError = true;
      while (fileError) {
        try {
          const valuesFile = [
            faker.system.commonFileName("txt"),
            faker.number.int({ min: 10000, max: 9999999 }),
            folderId,
          ];
          await db.query(sqlFile, valuesFile);
          fileError = false;
        } catch (err) {
          if (err.code === "23505") {
            console.error(`  Error with table "${err.table}": ${err.detail}.`);
          } else {
            console.error("Unknown error occured");
          }
        }
      }
    }
  }
}
