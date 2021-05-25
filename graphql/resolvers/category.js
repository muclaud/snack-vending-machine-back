const Category = require('../../models/Category');

const errorCatch = function (err, p) {
  if (err) return console.error(err);
};

module.exports = {
  Query: {
    async getCategoryList() {
      const products = await Category.find().sort({ amount: -1 });
      return products;
    },
    async getCategory(_, { categoryId }) {
      const product = await Category.findById(categoryId);
      if (product) {
        return product;
      } else {
        throw new Error('Product not found');
      }
    },

    async getAllPurchases() {
      const productList = await Category.find();

      const findPurchases = (array) => {
        let arrayPurchases = [];
        for (let index = 0; index < array.length; index++) {
          const purchase = array[index].purchases;
          arrayPurchases.push(purchase);
        }
        return arrayPurchases.flat();
      };
      const reportPurchesMonth = await findPurchases(productList);
      return reportPurchesMonth;
    },
  },
  Mutation: {
    async addCategory(_, { addCategoryInput: { name, amount = '0', price } }) {
      const categoryName = await Category.findOne({ name });
      if (categoryName) {
        throw new Error('change category name');
      }
      const newCategory = new Category({
        name,
        amount,
        price,
        createdAt: new Date().toISOString(),
      });

      const res = await newCategory.save();

      return {
        ...res._doc,
        id: res.id,
      };
    },
    async addItem(_, { categoryId, amount }) {
      const product = await Category.findById(categoryId);
      if (product) {
        amountStart = +product.amount;
        amountStartRes = amountStart + +amount;
        product.amount = amountStartRes;
        await product.save();
        return product;
      } else {
        throw new Error('Category not found');
      }
    },
    async getClear(_, { categoryId }) {
      let product = await Category.findByIdAndDelete(categoryId);
      let res = await Category.find();
      return res;
    },
    async createPurchase(_, { categoryId, name, price }) {
      const product = await Category.findById(categoryId);
      if (product && product.amount > 0) {
        product.amount -= 1;
        product.purchases.unshift({
          name,
          price,
          date: new Date().toISOString(),
        });

        await product.save();
        return product;
      }
    },
  },
};
