import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [bazinga, setBazinga] = useState([])
  const [listaFiltrada, setListaFiltrasda] = useState([])
  const [idF, setIdF] = useState("")
  const [nombreF, setNombreF] = useState("")
  const [precioF, setPrecioF] = useState("")
  const [categoriaF, setCategoriaF] = useState("")
  const [stockF, setStockF] = useState("")
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    const loadPelicula = async () => {
      const response = await fetch('./bazinga.json');
      const json = await response.json();
      setBazinga(json);

      const productosConDescuento = json.map((producto) => {
        const descuento = producto.stock > 10 ? producto.precio * 0.10 : producto.precio * 0.05;
        return { ...producto, precioDescuento: descuento }; // Añadir el descuento al producto
      });

      setBazinga(productosConDescuento);
      setListaFiltrasda(bazinga);

      /*Otra forma seria
      // Calcular el descuento para cada producto
    const preciosConDescuento = {};
    json.forEach((producto) => {
      const descuento = calcularDescuento(producto.stock, producto.precio);
      preciosConDescuento[producto.id] = descuento;  // Guardamos el descuento por id
    });

    setBazinga(json); // Guardamos los productos en el estado
    setPreciosConDescuento(preciosConDescuento); // Guardamos los descuentos en el estado
      */
    };
    loadPelicula();
  }, []);

  const borrar = (id) => {
    setBazinga(bazinga.filter((dato) => dato.id !== id))
  }

  const nuevoProducto = (idF, nombreF, precioF, categoriaF, stockF) => {

    if (!idF || !nombreF || !precioF || !categoriaF || !stockF) {
      alert("Por favor, completa todos los campos antes de añadir un nuevo producto.");
      return;
    }

    /* Otra opcion
       const existeProducto = bazinga.some((dato) => dato.id === idF);
   
       if (existeProducto) {
         alert("Ya existe un producto con ese id");
         return;
       }
   */

    for (let k = 0; k < bazinga.length; k++) {
      if (bazinga[k].id == idF) {
        alert("Ya existe un producto con ese id");
        return;
      }
    }


    const producto = {
      "id": idF,
      "nombre": nombreF,
      "precio": precioF,
      "categoria": categoriaF,
      "stock": stockF
    }

    setIdF("")
    setNombreF("")
    setPrecioF("")
    setCategoriaF("")
    setStockF("")

    setBazinga([...bazinga, producto])
  }

  const handleChange1 = (event) => {
    setIdF(event.target.value);
  };

  const handleChange2 = (event) => {
    setNombreF(event.target.value);
  };

  const handleChange3 = (event) => {
    setPrecioF(event.target.value);
  };

  const handleChange4 = (event) => {
    setCategoriaF(event.target.value);
  };

  const handleChange5 = (event) => {
    setStockF(event.target.value);
  };

  const handleFiltro = (event) => {
    setFiltro(event.target.value);
  };

  const Filtrar = (filtro) => {
    if (filtro === "") {
      setListaFiltrasda(bazinga);
    } else {
      setListaFiltrasda(bazinga.filter((producto) => producto.categoria.toLowerCase() === filtro.toLowerCase()));
    }
  };
  

  return (
    <div className="App-header">

      <div>
        <input
          type="text"
          value={filtro}
          onChange={handleFiltro}
          placeholder="Filtrar por categoria"
        />
      </div>
      <button onClick={() => Filtrar(filtro)}>Filtrar</button>

      {listaFiltrada.map((sexo) => (
        <div key={sexo.id}>
          <p>Id: {sexo.id}</p>
          <p>Nombre: {sexo.nombre}</p>
          <p>Precio: {sexo.precio}</p>
          <p>Precio con descuento: {sexo.precioDescuento}</p>
          <p>Categoria: {sexo.categoria}</p>
          <p>Stock:{sexo.stock}</p>
          <button onClick={() => borrar(sexo.id)}>Borrar de la lista</button>
          <p>-----------------------------</p>
        </div>
      ))}
      <h2>Crear nuevo producto</h2>
      <div>
        <input
          type="text"
          value={idF}
          onChange={handleChange1}
          placeholder="Campo del id"
        />
      </div>
      <div>
        <input
          type="text"
          value={nombreF}
          onChange={handleChange2}
          placeholder="Campo del nombre"
        />
      </div>
      <div>
        <input
          type="text"
          value={precioF}
          onChange={handleChange3}
          placeholder="Campo del precio"
        />
      </div>
      <div>
        <input
          type="text"
          value={categoriaF}
          onChange={handleChange4}
          placeholder="Campo de la categoria"
        />
      </div>
      <div>
        <input
          type="text"
          value={stockF}
          onChange={handleChange5}
          placeholder="Campo del stock"
        />
      </div>
      <button onClick={() => nuevoProducto(idF, nombreF, precioF, categoriaF, stockF)}>Crear</button>
    </div>
  );
}

export default App;
