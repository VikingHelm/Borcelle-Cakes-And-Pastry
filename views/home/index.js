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
