const mongoose = require('mongoose');

const {
    Schema,
    model
} = mongoose;

const productsSchema = new Schema({
    nombre: String,
    precio: String,
    categoria: String,
    img: String
})

const products = model("Products", productsSchema);

// const getProductList = async ()=> {
//     try {
//         const productos = await products.find();
//         console.log(productos)
//     } catch {
//         console.log('error')
//     }
// }
// getProductList();


module.exports = products;