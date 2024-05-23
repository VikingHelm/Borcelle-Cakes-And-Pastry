const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

// Definir el esquema para guardar los usuarios en la BD
const userSchema = new mongoose.Schema({
    // Both ways work
    name: String,
    email: String,
    password: String,
    role: String
})

// Configurar la respuesta del usuario en el esquema
// userSchema.set('toJSON', {
    // Document es el userSchema
    // returnObject es la solicitud
    // transform: (document, returnObject) => {
        // id de MongoDB
//         returnObject.id = returnObject._id.toString();
//         delete returnObject.id;
//         delete returnObject.__v;
//         delete returnObject.password;

//     }
// })

// Registrar el modelo
// const User = mongoose.model('User', userSchema);
const users = model("Users", userSchema);


// const addUser = new User({
//     name: '123',
//     email: '123@gmail.com',
//     password: '123',
//     role: 'dumbass'
// })
// const createNewUser = async ()=> {
    

//     const result = await addUser.save();
//     console.log(result)
// }

// createNewUser();

// Debemos exportar
module.exports = users;