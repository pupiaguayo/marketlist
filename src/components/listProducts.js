import React, { useState } from "react";
import "../styles/listProducts.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const ListProducts = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [producto, setProducto] = useState("");
  const [error, setError] = useState("");
  const setProductos = (e) => {
    e.preventDefault();
    if (!producto.trim()) {
      setError("Ingrese producto");
    }
  };
  return (
    <React.Fragment>
      <div className="container container-list">
        <ul className="list-group">
          <li>
            Papel Higienico
            <div className="actions">
              <button>E</button>
              <button className="eliminar">X</button>
            </div>
          </li>
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
                type="text"
                onChange={(e) => {
                  setProducto(e.target.value);
                }}
              />
              <input type="submit" />
            </form>
          </ModalBody>
          <ModalFooter className="footer-modal">
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default ListProducts;
