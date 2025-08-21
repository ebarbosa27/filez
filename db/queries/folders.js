import db from "../client.js";

export async function getFolders() {
  const sql = `SELECT * FROM folders`;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolder(folderId) {
  const sql = `
  SELECT 
    folders.id,
    folders.name,
    JSON_AGG(files.*) as files
  FROM 
    folders 
  JOIN
    files ON folders.id = files.folder_id
  WHERE 
    folders.id = $1
  GROUP BY
  folders.id, folders.name;`;
  const values = [folderId];
  const { rows: folders } = await db.query(sql, values);
  if (folders[0] === undefined) {
    throw Error("Folder not found");
  }
  return folders[0];
}

export async function addFileToFolder(folderId, file) {
  const sql = `
  INSERT INTO 
    files(name, size, folder_id)
  VALUES
    ($1, $2, $3) 
  RETURNING 
  *;`;
  const values = [file.name, file.size, folderId];
  const { rows: folders } = await db.query(sql, values);
  return folders[0];
}
