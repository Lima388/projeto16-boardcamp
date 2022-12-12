import { connection } from "../database/db.js";

export async function create(req, res) {
  const game = req.body;
  try {
    let { rows } = await connection.query(
      "SELECT COUNT(1) FROM games WHERE (name) = $1;",
      [game.name]
    );
    if (rows[0].count > "0") {
      return res.sendStatus(409);
    }
    ({ rows } = await connection.query(
      "SELECT COUNT(1) FROM categories WHERE (id) = $1;",
      [game.categoryId]
    ));
    if (rows[0].count === "0") {
      return res.sendStatus(400);
    }
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5);',
      [
        game.name,
        game.image,
        game.stockTotal,
        game.categoryId,
        game.pricePerDay,
      ]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findAll(req, res) {
  let name = "";
  if (req.query.name !== undefined) {
    name = req.query.name.toLowerCase();
  }
  try {
    const { rows } = await connection.query(
      `SELECT 
        games.*, categories.name as "categoryName" 
      FROM 
        games 
      JOIN 
        categories ON games."categoryId"=categories.id 
      WHERE 
        LOWER(games.name) LIKE '${name}%';`
    );
    return res.send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
