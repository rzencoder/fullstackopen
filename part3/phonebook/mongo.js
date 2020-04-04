/* eslint-disable no-undef */
const mongoose = require('mongoose')
require('dotenv').config()
const password = process.argv[2]
const user = process.env.USER
const url = `mongodb+srv://${user}:${password}@cluster0-do0nv.azure.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Contact = mongoose.model('Contact', contactSchema)

const addContact = () => {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save().then(response => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}

const findContact = () => {
  console.log('Phonebook:')
  Contact.find({}).then(contacts => {
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('give password, name and number as arguments')
  process.exit(1)
} else if (process.argv.length === 5) {
  addContact()
} else {
  findContact()
}
