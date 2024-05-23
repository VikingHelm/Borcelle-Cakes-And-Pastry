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





// TOTAL PRICE FROM CART
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantityAdded), 0);



// DELETE CART ITEM
const deleteCartItem = (item) => {
  cartItems = cartItems.filter(cartItem => cartItem !== item);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  
  displayCart();
}

// DISPLAY CART ITEMS
const displayCart = () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let cartSection = document.getElementById('cartItems');
  cartSection.innerHTML = "";


  if (cartItems.length === 0) {
    const emptyCartMessage = document.createElement('h1');
    emptyCartMessage.textContent = 'No se han añadido productos a tu carrito.';
    cartSection.appendChild(emptyCartMessage);
  } else {



    // TITLE SECTION
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('cart-item', 'cart-titles');

    const titleDelete = document.createElement('h2');
    titleDelete.classList.add('cart-itemSection');
    titleDelete.innerHTML = 'X';

    const titleImage = document.createElement('h2');
    titleImage.classList.add('cart-itemSection');
    titleImage.textContent = 'Imagen';

    const titleName = document.createElement('h2');
    titleName.classList.add('cart-itemSection');
    titleName.textContent = 'Nombre';

    const titleQuantity = document.createElement('h2');
    titleQuantity.classList.add('cart-itemSection');
    titleQuantity.textContent = 'Cantidad';

    const titlePrice = document.createElement('h2');
    titlePrice.classList.add('cart-itemSection');
    titlePrice.textContent = 'Precio';

    titleDiv.appendChild(titleDelete);
    titleDiv.appendChild(titleImage);
    titleDiv.appendChild(titleName);
    titleDiv.appendChild(titleQuantity);
    titleDiv.appendChild(titlePrice);

    cartSection.appendChild(titleDiv);

    let totalAmount = 0;
    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item', 'cart-item-bg');

      const itemImg = document.createElement('img');
      itemImg.classList.add('cart-itemSection');
      itemImg.src = `${item.img}`;

      const itemName = document.createElement('h2');
      itemName.classList.add('cart-itemSection');
      itemName.textContent = `${item.name}`;

      const itemQuantity = document.createElement('input');
      itemQuantity.classList.add('cart-itemSection');
      itemQuantity.type = 'number';
      itemQuantity.value = item.quantityAdded;
      itemQuantity.style.width = '50px';
      itemQuantity.style.height = '30px';
      itemQuantity.addEventListener('change', e => {
        item.quantityAdded = parseInt(e.target.value);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
      });

      const itemPrice = document.createElement('h1');
      itemPrice.classList.add('cart-itemSection');
      let itemTotalPrice = item.price * item.quantityAdded;
      itemPrice.textContent = `$${itemTotalPrice.toFixed(2)}`;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteButton.style.color = 'red';
      deleteButton.addEventListener('click', () => {
        cartItems = cartItems.filter(cartItem => cartItem !== item);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        displayCart();
      });

      itemDiv.appendChild(deleteButton);
      itemDiv.appendChild(itemImg);
      itemDiv.appendChild(itemName);
      itemDiv.appendChild(itemQuantity);
      itemDiv.appendChild(itemPrice);

      cartSection.appendChild(itemDiv);
      totalAmount += itemTotalPrice;
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('totalDiv');
    const totalAmountDisplay = document.createElement('p');
    totalAmountDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;

    const emptyCartButton = document.createElement('button');
    emptyCartButton.classList.add('emptyCartButton');
    emptyCartButton.textContent = 'Vaciar Carrito';
    emptyCartButton.addEventListener('click', () => {
      localStorage.removeItem('cart');
      displayCart();
    });
    cartSection.appendChild(totalDiv);
    totalDiv.appendChild(emptyCartButton);
    totalDiv.appendChild(totalAmountDisplay);

  };

  
}
displayCart();


// COUPON LOGIC
const couponInput = document.querySelector('.couponInput');
const couponBtn = document.querySelector('.coupon-btn');

couponBtn.addEventListener('click', () => {
  applyCoupon(couponInput.value);
});

// APPLY COUPON
const applyCoupon = (couponCode) => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  switch (couponCode) {
    case '123':
      cartItems.forEach(item => {
        // 15%
        let discountedPrice = item.price * 0.85;
        item.price = discountedPrice;
      });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayCart();
      displayAlert('Cupón aplicado: 15% de descuento');
      break;

    case '123456':
      cartItems.forEach(item => {
        // 25%
        let discountedPrice = item.price * 0.75;
        item.price = discountedPrice;
      });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      displayCart();
      displayAlert('Cupón aplicado: 25% de descuento');
      break;

    default:
      displayAlert('El cupón ingresado no es válido');
      break;
  }

  // COUPON PRICE UPDATE
  totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantityAdded), 0);
}






// Event listener for radio inputs
const paymentMethods = document.getElementsByName('payment');
paymentMethods.forEach((method) => {
  displayCart();
  let paymentTotalDisplay = document.querySelector('.paymentTotalDisplay');


  method.addEventListener('change', () => {
    displayCart();

    let payPalFeeMessage = document.querySelector('.payPalFeeMessage');


    let selectedPaymentMethod = method.value;
    if (selectedPaymentMethod === 'paypal') {

      payPalFeeMessage.innerHTML = '';
      paymentTotalDisplay.innerHTML = '';

      payPalFeeMessage.textContent = '*IMPORTANTE: Debido a políticas de transacción de PayPal, se añade un cargo extra del 5,4% de la transacción más una tarifa fija de $0,30.';
      
      // Calculate the base PayPal fee
      const basePayPalFee = (totalAmount * 0.054) + 0.30;


      paymentTotalDisplay.innerHTML = `<div class="totalPayPal flex flex-col text-3xl border-y-2 border-gray-700 pt-4 pb-4">
      <div><h1>Sub-Total...........$${totalAmount.toFixed(2)}</h1></div>
      <div><h1>PayPal Fee..........$${basePayPalFee.toFixed(2)}</h1></div>
      <div><h1 class="font-bold">Total a pagar.......$${(totalAmount + basePayPalFee).toFixed(2)}</h1></div>
      </div>`;

    } else if (selectedPaymentMethod === 'stripe') {

      payPalFeeMessage.innerHTML = '';
      paymentTotalDisplay.innerHTML = '';

      paymentTotalDisplay.innerHTML = `<div class="totalPayPal flex flex-col text-3xl border-y-2 border-gray-700 pt-4 pb-4">
      <div><h1 class="font-bold">Total a pagar.......$${(totalAmount).toFixed(2)}</h1></div>
      </div>`;

    } else if (selectedPaymentMethod === 'transferencia') {

      payPalFeeMessage.innerHTML = '';
      paymentTotalDisplay.innerHTML = '';

      paymentTotalDisplay.innerHTML = `<div class="totalPayPal flex flex-col text-3xl border-y-2 border-gray-700 pt-4 pb-4">
      <div><h1 class="font-bold">Total a pagar.......$${(totalAmount).toFixed(2)}</h1></div>
      </div>`;
    }
  });
});



// HANDLE PAYMENTS FOR PAYBTN
const handlePayment = (paymentMethod) => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (paymentMethod === 'stripe') {

    fetch("/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          cart: cartItems
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("URL inválida recibida en el servidor: ", data.url);
        }
      })
      .catch((err) => console.error(err));

  } else if (paymentMethod === 'paypal') {

    // Code for PayPal payment method goes here
  } else if (paymentMethod === 'transferencia') {

    // Implement Efectivo/Pago Movil payment logic here
    // Code for Efectivo/Pago Movil payment method goes here

  } else {

    displayAlert('Por favor, selecciona un método de pago');
  }
}


// CHECKOUT BUTTON 
const payBtn = document.querySelector('.checkout-btn');
payBtn.addEventListener("click", () => {
  const paymentMethods = document.getElementsByName('payment');
  let selectedPaymentMethod = '';

  paymentMethods.forEach((method) => {
    if (method.checked) {
      selectedPaymentMethod = method.value;
    }
  });

  if (selectedPaymentMethod) {
    handlePayment(selectedPaymentMethod);
  } else {
    displayAlert('Por favor, selecciona un método de pago');
  }
});




// ALERT 
const displayAlert = (message) => {
  const alertGlobe = document.getElementById('alertGlobe');
  alertGlobe.textContent = message;
  alertGlobe.style.display = 'block';


  alertGlobe.style.right = '2%';
  alertGlobe.style.bottom = '2%';


  setTimeout(() => {
    alertGlobe.style.display = 'none';
  }, 4500);
}