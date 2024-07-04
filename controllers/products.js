const productsRouter = require('express').Router();
const Product = require('../models/product');

// GET ALL PRODUCTS
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};

productsRouter.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products) {
      return res.status(404).json({ message: 'No se encontraron productos.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE NEW PRODUCT
productsRouter.post('/products', async (req, res) => {
  const product = new Product({
    nombre: req.body.nombre,
    precio: req.body.precio,
    categoria: req.body.categoria,
    img: req.body.img
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET PRODUCT BY ID
productsRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'No se ha encontrado el producto.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PRODUCT
productsRouter.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'No se ha encontrado el producto.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE PRODUCT
productsRouter.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'No se ha encontrado el producto.' });
    }
    res.json({ message: 'Producto borrado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productsRouter;