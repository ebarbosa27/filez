import db from "../client.js";

export async function getFolders() {
  const sql = `SELECT * FROM folders`;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolder(folderId) {
  const sql = `SELECT * FROM folders WHERE id = $1`;
  const values = [folderId];
  const { rows: folders } = await db.query(sql, values);
  if (folders[0] === undefined) {
    throw Error("Folder not found");
  }
  return folders[0];
}
