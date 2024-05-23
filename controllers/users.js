const usersRouter = require('express').Router();
const User = require('../models/user');

// GET ALL USERS
usersRouter.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });

// CREATE NEW USER
usersRouter.post('/users', async (request, response)=>{
    // console.log(request.body);
    const {name, email, password} = request.body;
    // console.log(name, email, password)

    const user = new User({
        name: name,
        email: email,
        password: password,
        role: 'user'
      });

    // if(!name || !email || !password){
    //     // console.log('Campo vacío.)
    //     return response.status(400).json({error: 'Todos los campos deben ser llenados.'});
    // } else {
    //     return response.status(200).json({msg: 'Se ha creado el nuevo usuario.'});
    // }

    try {
        const newUser = await user.save();
        response.status(201).json(newUser);
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    
})

module.exports = usersRouter;