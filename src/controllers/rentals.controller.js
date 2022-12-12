import { connection } from "../database/db.js";
import dayjs from "dayjs";

export async function create(req, res) {
  const rental = req.body;
  rental.rentDate = dayjs().format("YYYY-MM-DD");
  rental.returnDate = null;
  rental.delayFee = null;
  try {
    const { rows: gameRows } = await connection.query(
      "SELECT * FROM games WHERE id=$1;",
      [rental.gameId]
    );
    const { rows: customerRows } = await connection.query(
      "SELECT * FROM customers WHERE id=$1;",
      [rental.customerId]
    );
    const { rows: rentedRows } = await connection.query(
      'SELECT * FROM rentals WHERE "gameId"=$1;',
      [rental.gameId]
    );
    if (
      gameRows.length === 0 ||
      customerRows.length === 0 ||
      rentedRows.length >= gameRows[0].stockTotal
    ) {
      return res.sendStatus(400);
    }
    const gamePrice = gameRows[0].pricePerDay;
    rental.originalPrice = rental.daysRented * gamePrice;
    await connection.query(
      "INSERT INTO rentals " +
        '("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") ' +
        "VALUES ($1,$2,$3,$4,$5,$6,$7);",
      [
        rental.customerId,
        rental.gameId,
        rental.rentDate,
        rental.daysRented,
        rental.returnDate,
        rental.originalPrice,
        rental.delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
export async function find(req, res) {
  const customerId = req.query.customerId;
  const gameId = req.query.gameId;
  try {
    let { rows: rentalRows } = await connection.query("SELECT * FROM rentals;");
    const { rows: gameRows } = await connection.query("SELECT * FROM games;");
    const { rows: categoryRows } = await connection.query(
      "SELECT * FROM categories"
    );
    const { rows: customerRows } = await connection.query(
      "SELECT * FROM customers;"
    );
    rentalRows = rentalRows.map((rental) => ({
      id: rental.id,
      customerId: rental.customerId,
      gameId: rental.gameId,
      rentDate: rental.rentDate,
      daysRented: rental.daysRented,
      returnDate: rental.returnDate,
      originalPrice: rental.originalPrice,
      delayFee: rental.delayFee,
      customer: {
        id: customerRows.find((customer) => customer.id === rental.customerId)
          .id,
        name: customerRows.find((customer) => customer.id === rental.customerId)
          .name,
      },
      game: {
        id: gameRows.find((game) => game.id === rental.gameId).id,
        name: gameRows.find((game) => game.id === rental.gameId).name,
        categoryId: gameRows.find((game) => game.id === rental.gameId)
          .categoryId,
        categoryName: categoryRows.find(
          (category) =>
            category.id ===
            gameRows.find((game) => game.id === rental.gameId).categoryId
        ).name,
      },
    }));
    if (gameId) {
      rentalRows = rentalRows.filter((rental) => {
        return rental.gameId.toString() === gameId;
      });
    }
    if (customerId) {
      rentalRows = rentalRows.filter((rental) => {
        return rental.customerId.toString() === customerId;
      });
    }
    return res.status(200).send(rentalRows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function update(req, res) {
  const id = req.params.id;
  try {
    const { rows: rentedRows } = await connection.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );
    if (rentedRows.length === 0) {
      return res.sendStatus(404);
    } else if (rentedRows[0].returnDate !== null) {
      return res.sendStatus(400);
    }
    const rental = rentedRows[0];
    const returnDate = dayjs().format("YYYY-MM-DD");
    const diff = dayjs().diff(rental.rentDate, "day");
    const delayFee =
      diff > rental.daysRented
        ? (diff - rental.daysRented) * rental.pricePerDay
        : 0;
    await connection.query(
      'UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',
      [returnDate, delayFee, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function erase(req, res) {
  const id = req.params.id;
  try {
    const { rows: rentedRows } = await connection.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );
    if (rentedRows.length === 0) {
      return res.sendStatus(404);
    }
    if (rentedRows[0].returnDate === null) {
      return res.sendStatus(400);
    }
    await connection.query("DELETE FROM rentals WHERE id=$1", [id]);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
