const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("build"));
morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const Contact = require("./models/contact");

app.get("/info", (req, res) => {
  // const message = `
  //   <p>Phonebook has info for ${persons.length} people</p>
  //   <p>${new Date()}</p>`;
  // res.send(message);
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Contact.find({ id: id })
    .then(contact => {
      return res.json(contact);
    })
    .catch(err => {
      return res.sendStatus(404).end();
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  // persons = persons.filter(psn => psn.id === id);
  res.sendStatus(204).end();
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const id = Math.floor(Math.random() * 1000000);
  const contact = new Contact({
    name: name,
    number: number,
    id: id
  });
  if (persons.find(person => person.name === name)) {
    return res.status(400).json({ error: "Name already in phonebook" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number must be given" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name must be given" });
  }
  contact.save().then(response => {
    console.log("contact saved!");
    res.json(response.toJSON());
    mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
