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




const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const btnRegistro = document.querySelector('#form-btn');

const notificacion = document.querySelector('.notificacion');

let valemail = false;
let valpass = false;

const emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(emailInput.value);
    console.log(valemail);
    validar(emailInput, valemail);


})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(passwordInput.value);
    validar(passwordInput, valpass);
})

const validar = (input, val) => {
    // si todos los campos son true, disabled se removerá
    btnRegistro.disabled = valemail && valpass ? false : true;

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

    const response = await fetch('http://localhost:3000/api/users/users', {method: 'GET'});
    const users = await response.json();
    console.log(users);

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    console.log(emailValue)
    console.log(passwordValue)

    const userCheck = users.find(user => user.email === emailValue);
    const passwordCheck = users.find(user => user.password === passwordValue);

    if(!userCheck || !passwordCheck || userCheck.password !== passwordValue){
    notificacion.classList.remove('hidden');
    notificacion.innerHTML = 'El usuario o la contraseña son incorrectos.';

    setTimeout(()=>{
        notificacion.classList.add('hidden');
    }, 3000);
} else if(userCheck.role.toLowerCase() === "admin" && userCheck.password === passwordValue){
    localStorage.setItem('user', JSON.stringify(userCheck));
    window.location.href = '/AdminPanel/';
}
})