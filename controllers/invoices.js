const Invoice = require('../models/Invoice');
const { NotFoundError } = require('../erorrs');
const { StatusCodes } = require('http-status-codes');

const getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.status(StatusCodes.OK).json(invoices);
};

const getInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new NotFoundError(`There is no invoice with an id of "${id}"`);
  }
  res.status(StatusCodes.OK).json(invoice);
};

const createInvoice = async (req, res) => {
  const invoice = new Invoice(req.body);
  await invoice.save();
  res.status(StatusCodes.CREATED).json(invoice);
};

const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
  if (!invoice) {
    throw new NotFoundError(`There is no invoice with an id of "${id}"`);
  }
  res.status(StatusCodes.OK).json(invoice);
};

const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findByIdAndDelete(id);
  if (!invoice) {
    throw new NotFoundError(`There is no invoice with an id of "${id}"`);
  }
  res.status(StatusCodes.OK).json(invoice);
};

module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
