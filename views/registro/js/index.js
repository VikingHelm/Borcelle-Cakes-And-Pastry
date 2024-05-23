const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const closeX = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (closeX) {
    closeX.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// HOVER CART ON SHOPPING BAG HOVER
const shoppingBag = document.querySelector('.shoppingBag');
const cartContainer = document.getElementById('cartContainer');

shoppingBag.addEventListener('mouseenter', displayHoverCart);
cartContainer.addEventListener('mouseleave', hideCart);

function displayHoverCart() {
  cartContainer.style.display = 'block';
  let totalAmount = 0;

  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cartItems');
  // If IT'S NOT EMPTY, DISPLAY ITEMS
  cartItemsDiv.innerHTML = '';
  // CHECK IF LS IS EMPTY
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<h1 class="emptyCartMessage">No se han añadido productos al carrito.</h1>';
  }


  

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');
  
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.classList.add('itemImg');
  
    const name = document.createElement('span');
    name.textContent = item.name;
  
    const quantity = document.createElement('span');
    quantity.innerHTML = `&nbsp  x${item.quantityAdded}`;
  
    const price = document.createElement('span');
    const itemAmount = item.price * item.quantityAdded;
    price.textContent = `$${itemAmount.toFixed(2)}`;
  
    const deleteItemBtn = document.createElement('div');
    deleteItemBtn.classList.add('deleteItemBtn');
    deleteItemBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteItemBtn.addEventListener('click', () => {
      cartItems = cartItems.filter(cartItem => cartItem !== item);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayHoverCart();
    });
  
    totalAmount += itemAmount;
    cartItem.appendChild(deleteItemBtn);
    cartItem.appendChild(img);
    cartItem.appendChild(name);
    cartItem.appendChild(quantity);
    cartItem.appendChild(price);
    cartItemsDiv.appendChild(cartItem);
  });

  const totalAmountDiv = document.getElementById('totalAmount');
  totalAmountDiv.classList.add('totalAmountHover');
  totalAmountDiv.textContent = `Total a Pagar: $${totalAmount.toFixed(2)}`;

  const cartMain = document.getElementById('cartMain');
  cartMain.classList.add('cartMainBtn');
  cartMain.innerHTML = `<a href="/carrito/"><button>IR AL CARRITO</button></a>`;

  const cartTitle = document.getElementById('cartTitle');
  cartTitle.textContent = "Tu Carrito"

  
}


function hideCart() {
  cartContainer.style.display = 'none';
}



const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const btnRegistro = document.querySelector('#form-btn');
const recaptcha = document.querySelector('.g-recaptcha');


// REGEX
const nameVal = /^[a-zA-Z]+\s[a-zA-Z]+$/;
const emailVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

let valemail = false;
let valpass = false;
let valmatch = false;
let valname = false;

// input o change
nameInput.addEventListener('input', e => {
    valname = nameVal.test(nameInput.value);
    validar(nameInput, valname);
})

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(emailInput.value);
    console.log(valemail);
    validar(emailInput, valemail);
})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(passwordInput.value);
    validar(passwordInput, valpass);

    // validar password y match
    validar(matchInput, valmatch)
})

matchInput.addEventListener('input', e => {
    valmatch = e.target.value === passwordInput.value;
    validar(matchInput, valmatch)

    // validar password y match
    validar(passwordInput, valpass)
})





const validar = (input, val) => {
    // // si todos los campos son true, disabled se removerá
    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : true;

    if (val) {
        input.classList.remove('focus:outline-blue-600');
        input.classList.add('focus:outline-green-700');
    } else if (input.value === "") {
        input.classList.remove('focus:outline-red-700');
        input.classList.remove('focus:outline-green-700');
        input.classList.add('focus:outline-blue-600');
    } else {
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-green-700');
        input.classList.add('focus:outline-red-700');
    }
}


formulario.addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            role: 'user'
        }

        console.log(newUser)

        formulario.reset();

        // REQUEST
        const response = await axios.post('http://localhost:3000/api/users/users', newUser);
        console.log(response)

        // createNotification(false, response.data.msg);
        // console.log(newUser)

    } catch (error) {
        console.log(error);



       
    }
    


})

