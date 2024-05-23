import { showAlert } from "./showAlert.js";
import { obtenerProducto, editarProducto } from "./api.js";

const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const categoriaInput = document.querySelector('#categoria');
const imagenInput = document.querySelector('#imagen');
const _idInput = document.querySelector('#id');

document.addEventListener('DOMContentLoaded', async () => {
    const parametroURL = new URLSearchParams(window.location.search);
    const _idProducto = parametroURL.get("_id");

    const producto = await obtenerProducto(_idProducto);
    mostrarProducto(producto);

    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarProducto);
});

function mostrarProducto(producto) {
    const { nombre, precio, categoria, img, _id } = producto;

    nombreInput.value = nombre;
    precioInput.value = precio;
    categoriaInput.value = categoria;
    imagenInput.value = img;
    _idInput.value = _id;
}

async function validarProducto(e) {
    e.preventDefault();
    const producto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        img: imagenInput.value,
        _id: _idInput.value // Use _id instead of id
    }

    if (validacion(producto)) {
        showAlert('Todos los campos son obligatorios.');
    } else {
        await editarProducto(producto);
        window.location.href = `index.html?_id=${producto._id}`; // Redirect to the correct URL with _id parameter
    }



    function validacion(obj) {
        // !Object para negar los campos vacíos (recibidos como value)
        return !Object.values(obj).every(i => i !== '');
    }
}



const userCheck = JSON.parse(localStorage.getItem("user"));
if(!userCheck){
    window.location.href='/';
}

const cerrarBtn = document.querySelector('#cerrarBtn');
cerrarBtn.addEventListener("click",async e=>{
    localStorage.removeItem("user");
    window.location.href="/AdminLogin/"
})