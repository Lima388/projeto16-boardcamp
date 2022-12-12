import { connection } from "../database/db.js";

export async function create(req, res) {
  const { name } = req.body;
  try {
    const { rows } = await connection.query(
      "SELECT COUNT(1) FROM categories WHERE (name) = $1;",
      [name]
    );
    if (rows[0].count > "0") {
      return res.sendStatus(409);
    }
    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findAll(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM categories");
    return res.send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
