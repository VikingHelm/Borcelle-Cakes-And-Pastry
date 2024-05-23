// HAMBURGER MENU 
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






// MAIN JS

const url = "http://localhost:3000/api/products/products";

let productsData = [];

const fetchProducts = async () => {
  const response = await fetch(url);
  productsData = await response.json();
  displayProducts(productsData);
};


const addToCart = (product) => {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item._id === product._id);

  if (existingItem) {
    existingItem.quantityAdded++;
  } else {
    const newItem = {
      _id: product._id,
      img: product.img,
      name: product.nombre,
      price: parseFloat(product.precio),
      quantityAdded: 1
    };
    cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayHoverCart();

};



const displayProducts = (data) => {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  if (data.length === 0) {
    productsDiv.innerHTML = "No se encontraron productos.";
  } else {
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('div-img');

      const img = document.createElement('img');
      img.src = product.img;
      img.alt = product.nombre;

      const name = document.createElement('h3');
      name.textContent = product.nombre;

      const description = document.createElement('p');
      description.classList.add('p-description');
      description.textContent = product.descripcion;

      const price = document.createElement('h1');
      price.classList.add('p-price');
      price.textContent = `$${product.precio}`;

      const button = document.createElement('button');
      button.classList.add('addToCartBtn')
      button.textContent = 'Añadir al Carrito';
      button.addEventListener('click', () => {
        addToCart(product);
      });


      imgDiv.appendChild(img);
      card.appendChild(imgDiv);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(price);
      card.appendChild(button);

      productsDiv.appendChild(card);
    });
  }
};

const filterProducts = () => {
  const categoryFilters = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.id);
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;

  const filteredProducts = productsData.filter(product => {
    let passCategory = categoryFilters.length === 0 || categoryFilters.includes(product.categoria);
    let passPriceRange = (!minPrice || !maxPrice) ? true : (parseFloat(product.precio) >= parseFloat(minPrice) && parseFloat(product.precio) <= parseFloat(maxPrice));

    return passCategory && passPriceRange;
  });

  displayProducts(filteredProducts);
};

fetchProducts();