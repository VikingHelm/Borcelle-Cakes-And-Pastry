import { nuevoProducto} from "./api.js";
import { showAlert } from "./showAlert.js";


const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', validarProducto);

async function validarProducto(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const categoria = document.querySelector('#categoria').value;
    const img = document.querySelector('#imagen').value;

    const producto = {
        nombre, precio, categoria, img, descripcion
    }

    // Validar que los campos no estén vacíos
    if(validacion(producto)){
        showAlert('Todos los campos son obligatorios.')
        return
        // console.log('Todos los campos son obligatorios.')
    }else{
        await nuevoProducto(producto);
        window.location.href = '/AdminPanel/index.html'
        // console.log('Campos llenos.')
    }
}

function validacion(obj){
    // !Object para negar los campos vacíos (recibidos como value)
    return !Object.values(obj).every(i=>i!=='');
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