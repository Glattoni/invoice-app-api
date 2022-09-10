const mongoose = require('mongoose');
const { Schema } = mongoose;

const Address = new Schema({
  street: {
    type: String,
    required: [true, 'Please provide a street'],
    minlength: 3,
    maxlength: 50,
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
    minlength: 3,
    maxlength: 50,
  },
  postCode: {
    type: String,
    required: [true, 'Please provide a post code'],
    minlength: 3,
    maxlength: 50,
  },
  country: {
    type: String,
    required: [true, 'Please provide a country'],
    minlength: 3,
    maxlength: 50,
  },
});

const Item = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  total: {
    type: Number,
  },
});

const InvoiceSchema = new Schema({
  createdAt: String,
  paymentDue: String,
  description: String,
  paymentTerms: Number,
  clientName: String,
  clientEmail: {
    type: String,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  status: String,
  senderAddress: Address,
  clientAddress: Address,
  items: [Item],
  total: Number,
  slug: String,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
