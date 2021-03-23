import React, { useState, useEffect } from "react";
import "../styles/listProducts.css";
import { store } from "../firebaseconfig";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const ListProducts = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [producto, setProducto] = useState("");
  const [error, setError] = useState("");
  const [listaProductos, setListaProductos] = useState([]);

  const setProductos = async (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Ingrese producto");
    }
    const productos = {
      producto: producto,
    };
    try {
      await store.collection("listaProd").add(productos);
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
      alert("Producto agregado");
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
  const borrarUser = async (id) => {
    try {
      await store.collection("listaProd").doc(id).delete();
      const { docs } = await store.collection("listaProd").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setListaProductos(nuevoArray);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <React.Fragment>
      <div className="container container-list">
        <ul>
          {listaProductos.length !== 0 ? (
            listaProductos.map((item) => (
              <li key={item.id}>
                {item.producto}
                <div className="actions">
                  {/* <button>E</button> */}
                  <button
                    onClick={(id) => {
                      borrarUser(item.id);
                    }}
                    className="eliminar"
                  >
                    X
                  </button>
                </div>
              </li>
            ))
          ) : (
            <span>asdsd</span>
          )}
        </ul>
        <div className="row fixed-bottom">
          <div className="col-12 ">
            <button className="agregar-item" onClick={toggle}>
              Agregar Item
            </button>
          </div>
        </div>
        <Modal isOpen={modal} className="edit-modal">
          <ModalHeader className="header-modal">
            Ingrese nombre del producto
          </ModalHeader>
          <ModalBody className="body-modal">
            <form onSubmit={setProductos} action="">
              <input
                value={producto}
                type="text"
                onChange={(e) => {
                  setProducto(e.target.value);
                }}
              />
              <input
                type="submit"
                onClick={toggle}
                value="Agregar Producto
              "
              />
            </form>
          </ModalBody>
          <ModalFooter className="footer-modal">
            <Button onClick={toggle}>Cancel</Button>
            {/* {error ? (
              <div>
                <p>{error}</p>
              </div>
            ) : (
              <div>
                <p>No hay bada</p>
              </div>
            )} */}
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default ListProducts;
