const url = "http://localhost:3000/api/products/products"; // Update the URL to match your Express API endpoint

// export const nuevoProducto = async producto => {
//   try {
//     await axios.post(url, producto);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const listaProductos = async () => {
//   try {
//     const { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const obtenerProducto = async id => {
//   try {
//     const { data } = await axios.get(`${url}/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const editarProducto = async producto => {
//   try {
//     await axios.put(`${url}/${producto.id}`, producto);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const eliminarProducto = async id => {
//   try {
//     await axios.delete(`${url}/${id}`);
//   } catch (error) {
//     console.log(error);
//   }
// }


const userCheck = JSON.parse(localStorage.getItem("user"));
if(!userCheck){
    window.location.href='/';
}

const cerrarBtn = document.querySelector('#cerrarBtn');
cerrarBtn.addEventListener("click",async e=>{
    localStorage.removeItem("user");
    window.location.href="/AdminLogin/"
})


export const nuevoProducto = async producto => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const listaProductos = async () => {
    try {
        const resultado = await fetch(url);
        const productos = await resultado.json();
        return productos;
    } catch (error) {
        console.log(error)
    }
}

export const obtenerProducto = async _id =>{
  try {
      const resultado = await fetch(`${url}/${_id}`);
      const producto = await resultado.json();
      return producto;
  } catch (error) {
      console.log(error)
  }
}

export const editarProducto = async producto => {
  try {
      await fetch(`${url}/${producto._id}`, {
          method: 'PUT',
          body: JSON.stringify(producto),
          headers: { 'Content-Type': 'application/json' }
      });
  } catch (error) {
      console.log(error);
  }
}

  
  export const eliminarProducto = async _id => {
    try {
      await fetch(`${url}/${_id}`, { method: 'DELETE' });
    } catch (error) {
      console.log(error);
    }
  }
