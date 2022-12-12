import { connection } from "../database/db.js";

export async function create(req, res) {
  const customer = req.body;
  try {
    const { rows } = await connection.query(
      "SELECT COUNT(1) FROM customers WHERE (cpf) = $1;",
      [customer.cpf]
    );
    if (rows[0].count > "0") {
      return res.sendStatus(409);
    }
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4);",
      [customer.name, customer.phone, customer.cpf, customer.birthday]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findAll(req, res) {
  try {
    const { rows } = await connection.query(
      "SELECT *,birthday::text FROM customers"
    );
    return res.send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function update(req, res) {
  const id = req.params.id;
  const customer = req.body;
  try {
    const { rows } = await connection.query(
      "SELECT COUNT(1) FROM customers WHERE (cpf)=$1 AND NOT id=$2;",
      [customer.cpf, id]
    );
    if (rows[0].count > "0") {
      return res.sendStatus(409);
    }
    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [customer.name, customer.phone, customer.cpf, customer.birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findOne(req, res) {
  const id = req.params.id;
  try {
    const { rows } = await connection.query(
      "SELECT *,birthday::text FROM customers WHERE (id)=$1",
      [id]
    );
    if (rows.length === 0) {
      return res.sendStatus(404);
    }
    return res.send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
