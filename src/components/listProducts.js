import React, { useState, useEffect } from "react";
import "../styles/listProducts.css";
import { store } from "../firebaseconfig";
import { Modal, ModalBody } from "reactstrap";
import swal from "sweetalert";
const ListProducts = () => {
  const [idProd, setIdProd] = useState("");
  const [edicion, setEdicion] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [producto, setProducto] = useState("");
  const [error, setError] = useState("");
  const [listaProductos, setListaProductos] = useState([]);
  const setProductos = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      swal({
        title: "Error",
        text: "El campo producto esta vacio",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    const productos = {
      producto: producto,
    };
    try {
      await store.collection("listaProd").add(productos);
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
      swal("¡Producto agregado!", "Continua cargando tu lista", "success");
    } catch (e) {
      console.log(e);
    }
    setProducto("");
  };
  useEffect(() => {
    const getProductosBase = async () => {
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
    };
    getProductosBase();
  }, []);
  const borrarProducto = async (id) => {
    try {
      await store.collection("listaProd").doc(id).delete();
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
    } catch (e) {
      console.log(e);
    }
  };
  const actualizar = async (id) => {
    toggle();
    try {
      const data = await store.collection("listaProd").doc(id).get();
      const { producto } = data.data();
      setProducto(producto);
      setIdProd(id);
      setEdicion(true);
      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };
  const setUpdate = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Ingrese producto");
    }
    const productoUpdate = {
      producto: producto,
    };
    try {
      await store.collection("listaProd").doc(idProd).set(productoUpdate);
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
      alert("Producto actualizado");
    } catch (e) {
      console.log(e);
    }
    setProducto("");
    setIdProd("");
    setEdicion(false);
  };
  return (
    <React.Fragment>
      <div className="container">
        <ul className="container container-list">
          {listaProductos.length !== 0 ? (
            listaProductos.map((item) => (
              <li key={item.id}>
                <span className="producto">{item.producto}</span>
                <div className="actions">
                  <button
                    onClick={(id) => {
                      actualizar(item.id);
                    }}
                  >
                    E
                  </button>
                  <button
                    onClick={(id) => {
                      borrarProducto(item.id);
                    }}
                    className="eliminar"
                  >
                    X
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>Ingrese Productos</li>
          )}
        </ul>
        <div className="container container-button">
          <div className="row fixed-bottom">
            <div className="col-12 ">
              <button className="agregar-item" onClick={toggle}>
                Agregar Item
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} className="edit-modal">
          <ModalBody className="body-modal">
            <h2>Nombre del producto</h2>
            <form onSubmit={edicion ? setUpdate : setProductos} action="">
              <input
                className="ingresarProd"
                value={producto}
                type="text"
                onChange={(e) => {
                  setProducto(e.target.value);
                }}
              />
              <div className="agregar-eliminar">
                <input
                  className="button-cancelar"
                  onClick={toggle}
                  value="Cancelar
              "
                  type="button"
                />
                {edicion ? (
                  <input
                    className="button-agregar"
                    type="submit"
                    onClick={toggle}
                    value="Editar Producto
              "
                  />
                ) : (
                  <input
                    className="button-agregar"
                    type="submit"
                    onClick={toggle}
                    value="Agregar Producto
              "
                  />
                )}
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default ListProducts;
