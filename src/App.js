import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [bazinga, setBazinga] = useState([]);
  const [listaFiltrada, setListaFiltrasda] = useState([]);
  const [idF, setIdF] = useState("");
  const [nombreF, setNombreF] = useState("");
  const [precioF, setPrecioF] = useState("");
  const [categoriaF, setCategoriaF] = useState("");
  const [stockF, setStockF] = useState("");
  const [usuarioF, setUsuarioF] = useState("");
  const [puntuacionF, setPuntuacionF] = useState("");
  const [comentarioF, setComentarioF] = useState("");
  const [descripcionF, setDescripcionF] = useState(""); // Añadir estado para descripción
  const [filtro, setFiltro] = useState("");
  const [detalles, setDetalles] = useState({});

  useEffect(() => {
    const loadPelicula = async () => {
      const response = await fetch('./bazinga.json');
      const json = await response.json();
      setBazinga(json);

      const productosConDescuento = json.map((producto) => {
        const descuento = producto.stock > 10 ? producto.precio * 0.10 : producto.precio * 0.05;
        return { ...producto, precioDescuento: descuento };
      });

      setBazinga(productosConDescuento);
      setListaFiltrasda(productosConDescuento);
    };
    loadPelicula();
  }, []);

  const borrar = (id) => {
      const productosRestantes = bazinga.filter((dato) => dato.id !== id); 
      setBazinga(productosRestantes);  
      setListaFiltrasda(productosRestantes);  
    
  };

  const nuevoProducto = (idF, nombreF, precioF, categoriaF, stockF, usuarioF, puntuacionF, descripcionF) => {
    if (!idF || !nombreF || !precioF || !categoriaF || !stockF || !usuarioF || !puntuacionF || !descripcionF) {
      alert("Por favor, completa todos los campos antes de añadir un nuevo producto.");
      return;
    }

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
      "stock": stockF,
      "detalles": {
        "descripcion": descripcionF,
        "valoraciones": [
          {
            "usuario": usuarioF,
            "puntuacion": puntuacionF,
            "comentario": comentarioF
          }
        ]
      }
    };

    // Limpiar los campos después de agregar el producto
    setIdF("");
    setNombreF("");
    setPrecioF("");
    setCategoriaF("");
    setStockF("");
    setDescripcionF("");
    setUsuarioF("");
    setPuntuacionF("");
    setComentarioF("");

    const lista = [...bazinga, producto]

    setBazinga(lista);
    setListaFiltrasda(lista)
  };

  // Handle change functions
  const handleChangeId = (event) => setIdF(event.target.value);
  const handleChangeNombre = (event) => setNombreF(event.target.value);
  const handleChangePrecio = (event) => setPrecioF(event.target.value);
  const handleChangeCategoria = (event) => setCategoriaF(event.target.value);
  const handleChangeStock = (event) => setStockF(event.target.value);
  const handleChangeUsuario = (event) => setUsuarioF(event.target.value);
  const handleChangePuntuacion = (event) => setPuntuacionF(event.target.value);
  const handleChangeComentario = (event) => setComentarioF(event.target.value);
  const handleChangeDescripcion = (event) => setDescripcionF(event.target.value); 
  const handleFiltro = (event) => setFiltro(event.target.value);

  const Filtrar = (filtro) => {
    if (filtro === "") {
      setListaFiltrasda(bazinga);
    } else {
      setListaFiltrasda(
        bazinga.filter((producto) => {
          if (Array.isArray(producto.categorias)) {
            return producto.categorias.some(categoria => categoria.toLowerCase() === filtro.toLowerCase());
          } else if (producto.categoria) {
            return producto.categoria.toLowerCase() === filtro.toLowerCase();
          }
          return false; 
        })
      );
    }
  };
  

  const mostrarDetalles = (id) => {
    setDetalles(prevDetalles => ({
      ...prevDetalles,
      [id]: !prevDetalles[id]
    }));
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

      {listaFiltrada.map((producto) => (
        <div key={producto.id}>
          <p>Id: {producto.id}</p>
          <p>Nombre: {producto.nombre}</p>
          <p>Precio: {producto.precio}</p>
          <p>Precio con descuento: {producto.precioDescuento}</p>
          {Array.isArray(producto.categorias) ? (
            producto.categorias.map((cat) => <p key={producto.id}>{cat}</p>)
          ) : (
            <p>Categoria: {producto.categoria || "Sin categoría"}</p>
          )}
          <p>Stock: {producto.stock}</p>
          <button onClick={() => borrar(producto.id)}>Borrar de la lista</button>
          <button onClick={() => mostrarDetalles(producto.id)}>Mostrar detalles</button>
          {detalles[producto.id] && (
            <div>
              <p>Descripcion: {producto.detalles.descripcion}</p>
              {producto.detalles.valoraciones.map((valoracion, index) => (
                <div key={index}>
                  <ul>
                    <li>Usuario: {valoracion.usuario}. Comentario: {valoracion.comentario}. Puntuacion: {valoracion.puntuacion}.</li>
                  </ul>
                </div>
              ))}
            </div>
          )}
          <p>-----------------------------</p>
        </div>
      ))}

      <h2>Crear nuevo producto</h2>
      <div>
        <input
          type="text"
          value={idF}
          onChange={handleChangeId}
          placeholder="Campo del id"
        />
      </div>

      <div>
        <input
          type="text"
          value={nombreF}
          onChange={handleChangeNombre}
          placeholder="Campo del nombre"
        />
      </div>

      <div>
        <input
          type="text"
          value={precioF}
          onChange={handleChangePrecio}
          placeholder="Campo del precio"
        />
      </div>

      <div>
        <input
          type="text"
          value={categoriaF}
          onChange={handleChangeCategoria}
          placeholder="Campo de la categoria"
        />
      </div>

      <div>
        <input
          type="text"
          value={stockF}
          onChange={handleChangeStock}
          placeholder="Campo del stock"
        />
      </div>

      <div>
        <input
          type="text"
          value={usuarioF}
          onChange={handleChangeUsuario}
          placeholder="Campo del usuario"
        />
      </div>

      <div>
        <input
          type="text"
          value={puntuacionF}
          onChange={handleChangePuntuacion}
          placeholder="Campo de la puntuacion"
        />
      </div>

      <div>
        <input
          type="text"
          value={comentarioF}
          onChange={handleChangeComentario}
          placeholder="Campo del comentario"
        />
      </div>

      <div>
        <input
          type="text"
          value={descripcionF}
          onChange={handleChangeDescripcion}
          placeholder="Campo de la descripción"
        />
      </div>

      <button onClick={() => nuevoProducto(idF, nombreF, precioF, categoriaF, stockF, usuarioF, puntuacionF, comentarioF, descripcionF)}>Crear</button>
    </div>
  );
}

export default App;
