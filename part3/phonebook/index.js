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

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => res.sendStatus(204).end());
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
  if (!number) {
    return res.status(400).json({ error: "Number must be given" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name must be given" });
  }
  // if (persons.find(person => person.name === name)) {
  //   return res.status(400).json({ error: "Name already in phonebook" });
  // }

  contact.save().then(response => {
    console.log("contact saved!");
    res.json(response.toJSON());
    mongoose.connection.close();
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  console.log(req.params.id);
  const contact = {
    name: body.name,
    number: body.number
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact.toJSON());
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
