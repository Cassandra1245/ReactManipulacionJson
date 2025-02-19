import '../App.css';
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal } from 'react-bootstrap';
import { ProductosContext } from "../ProductosContext.js"
import Menu from "../Menu.js"

function Productos() {
  const [idF, setIdF] = useState("");
  const [nombreF, setNombreF] = useState("");
  const [precioF, setPrecioF] = useState("");
  const [categoriaF, setCategoriaF] = useState("");
  const [stockF, setStockF] = useState("");
  const [usuarioF, setUsuarioF] = useState("");
  const [puntuacionF, setPuntuacionF] = useState("");
  const [comentarioF, setComentarioF] = useState("");
  const [descripcionF, setDescripcionF] = useState(""); 
  const [filtro, setFiltro] = useState("");
  const [detalles, setDetalles] = useState({});
  
  const { bazinga, setBazinga, listaFiltrada, setListaFiltrasda } = useContext(ProductosContext);

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
    setListaFiltrasda(lista);
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

  const mostrarDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="App-header">
      <Menu/>

      <div>
        <input
          type="text"
          value={filtro}
          onChange={handleFiltro}
          placeholder="Filtrar por categoria"
        />
      </div>
      <Button variant="secondary" onClick={() => Filtrar(filtro)}>Filtrar</Button>

      <Container>
        <Row className="align-items-center">
          {listaFiltrada.map((producto) => (
            <Col className="my-3" xs={12} md={6} xxl={4} key={producto.id}>
              <Card>
                <Card.Header>
                  <p>Nombre: {producto.nombre}</p>
                </Card.Header>
                <Card.Body>
                  <p>Precio: {producto.precio}</p>
                  <p>Precio con descuento: {producto.precioDescuento}</p>
                  <ListGroup>
                    {Array.isArray(producto.categorias) ? (
                      producto.categorias.map((cat) => <ListGroup.Item key={cat}>{cat}</ListGroup.Item>)
                    ) : (
                      <ListGroup.Item>Categoria: {producto.categoria || "Sin categoría"}</ListGroup.Item>
                    )}
                    <ListGroup.Item>Stock: {producto.stock}</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary" onClick={() => borrar(producto.id)}>Borrar de la lista</Button>
                  <Button variant="primary" onClick={() => mostrarDetalles(producto)}>Mostrar detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div>
        <h2>Crear nuevo producto</h2>
        {/* Formulario para crear nuevo producto */}
        <input
          type="text"
          value={idF}
          onChange={handleChangeId}
          placeholder="Campo del id"
        />
        <input
          type="text"
          value={nombreF}
          onChange={handleChangeNombre}
          placeholder="Campo del nombre"
        />
        <input
          type="text"
          value={precioF}
          onChange={handleChangePrecio}
          placeholder="Campo del precio"
        />
        <input
          type="text"
          value={categoriaF}
          onChange={handleChangeCategoria}
          placeholder="Campo de la categoria"
        />
        <input
          type="text"
          value={stockF}
          onChange={handleChangeStock}
          placeholder="Campo del stock"
        />
        <input
          type="text"
          value={usuarioF}
          onChange={handleChangeUsuario}
          placeholder="Campo del usuario"
        />
        <input
          type="text"
          value={puntuacionF}
          onChange={handleChangePuntuacion}
          placeholder="Campo de la puntuacion"
        />
        <input
          type="text"
          value={comentarioF}
          onChange={handleChangeComentario}
          placeholder="Campo del comentario"
        />
        <input
          type="text"
          value={descripcionF}
          onChange={handleChangeDescripcion}
          placeholder="Campo de la descripción"
        />
      </div>
      <Button variant="secondary" onClick={() => nuevoProducto(idF, nombreF, precioF, categoriaF, stockF, usuarioF, puntuacionF, comentarioF, descripcionF)}>Crear</Button>

      {/* Modal para mostrar detalles */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <div>
              <p>Descripcion: {productoSeleccionado.detalles.descripcion}</p>
              {productoSeleccionado.detalles.valoraciones.map((valoracion, index) => (
                <div key={index}>
                  <ul>
                    <li>Usuario: {valoracion.usuario}. Comentario: {valoracion.comentario}. Puntuacion: {valoracion.puntuacion}.</li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Productos;
