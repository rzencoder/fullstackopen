const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const addContact = () => {
  const name = process.argv[3];
  const number = process.argv[4];

  const contact = new Contact({
    name: name,
    number: number
  });

  contact.save().then(response => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
};

const findContact = () => {
  console.log("Phonebook:");
  Contact.find({}).then(contacts => {
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
};

module.exports = mongoose.model("Contact", contactSchema);
