const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  name: String,
  createdAt: String,
  amount: String,
  price: String,

  purchases: [
    {
      date: String,
      name: String,
      price: String,
    },
  ],
});

module.exports = model('Category', categorySchema);
