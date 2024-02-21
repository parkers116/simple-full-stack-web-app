import express from "express";
import Pool from "../database/pg_pool";

const router = express.Router();
const pool = new Pool().pool;

router.get("/", (req, res) => {
  pool
    .query(
      "SELECT id, item_name AS name, item_desc AS desc, date_created FROM public.todo_list;"
    )
    .then((dbResult) => {
      res.send({ status: 200, data: dbResult.rows });
      return;
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ status: 400, data: null });
      return;
    });
});

router.post("/", (req, res) => {
  let body = req.body ?? null;

  if (!(body && "name" in body)) {
    res.status(400).send({ status: 400, data: null });
    return;
  }

  let arrQuery = [body.name, body.desc ?? null, new Date().toISOString()];

  pool
    .query(
      "INSERT INTO public.todo_list(item_name, item_desc, date_created) VALUES($1, $2, $3);",
      arrQuery
    )
    .then((dbResult) => {
      res.send({ status: 200, data: null });
      return;
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ status: 400, data: null });
      return;
    });
});

router.put("/", (req, res) => {
  let body = req.body ?? null;

  console.log(body);

  if (!(body && "id" in body && "name" in body)) {
    res.status(400).send({ status: 400, data: null });
    return;
  }

  let arrQuery = [body.id, body.name, body.desc ?? null];

  pool
    .query(
      "UPDATE public.todo_list SET item_name=$2, item_desc=$3 WHERE id=$1;",
      arrQuery
    )
    .then((dbResult) => {
      res.send({ status: 200, data: null });
      return;
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ status: 400, data: null });
      return;
    });
});

router.delete("/", (req, res) => {
  let body = req.body ?? null;

  if (!(body && "id" in body)) {
    res.status(400).send({ status: 400, data: null });
    return;
  }

  pool
    .query("DELETE FROM public.todo_list WHERE id=$1;", [body.id])
    .then((dbResult) => {
      res.send({ status: 200, data: dbResult.rows });
      return;
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ status: 400, data: null });
      return;
    });
});

export default router;
