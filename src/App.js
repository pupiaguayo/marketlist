import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import ListProducts from "./components/listProducts";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <ListProducts />
    </React.Fragment>
  );
}

export default App;
