import db from "../client.js";

export async function getFiles() {
  const sql = `SELECT 
    files.name,
    files.id,
    files.size,
    files.folder_id,
    folders.name as folder_name
  FROM 
    files 
  JOIN 
    folders ON files.folder_id = folders.id`;
  const { rows: files } = await db.query(sql);
  return files;
}
