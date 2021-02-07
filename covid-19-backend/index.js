import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

const countries = await axios.get("https://corona-api.com/countries");

let db = {
  countries: countries.data.data,
  comments: [],
};

app.get("/countries", async (req, res) => {
  res.send(db.countries);
});

app.delete("/countries", async (req, res) => {
  const code = req.body.code;
  db.countries = db.countries.filter((country) => country.code !== code);
  res.send({ code: code });
});

app.get("/country/:code", async (req, res) => {
  const code = req.params.code;
  res.send(db.countries.find((country) => country.code === code));
});

app.put("/country/:code", async (req, res) => {
  const code = req.params.code;
  let index = db.countries.findIndex((country) => country.code === code);
  db.countries[index] = req.body;
  res.send(req.body);
});

app.post("/countries/:code", async (req, res) => {
  const code = req.params.code;
  if (db.countries.find((country) => country.code === code)) {
    res.status(409).send({ message: "Code already exists!" });
  } else {
    db.countries = [...db.countries, req.body];
    res.send(req.body);
  }
});

app.post("/comment", async (req, res) => {
  db.comments = [...db.comments, req.body];
  res.send(req.body);
});

app.get("/comments/:code", async (req, res) => {
  const code = req.params.code;
  res.send({
    comments: db.comments.filter((comment) => comment.code === code),
  });
});

app.delete("/comments", async (req, res) => {
  const comment = req.body;
  db.comments = db.comments.filter((c) => c.id !== comment.id);
  res.send({
    comments: db.comments.filter((c) => c.code === comment.code),
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
