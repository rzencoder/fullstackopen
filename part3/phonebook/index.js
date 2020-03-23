const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/info", (req, res) => {
  const message = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`;
  res.send(message);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(psn => psn.id === id);
  person ? res.json(person) : res.sendStatus(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(psn => psn.id === id);
  res.sendStatus(204).end();
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const id = Math.floor(Math.random() * 1000000);
  if (persons.find(person => person.name === name)) {
    return res.status(400).json({ error: "Name already in phonebook" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number must be given" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name must be given" });
  }
  persons.push({ name, number, id });
  res.json({ name, number, id });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
