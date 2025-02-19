// App.js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Productos from './components/productos.js';
import Home from "./components/Home.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import ProductosProvider from "./ProductosContext.js";

function App() {
    return (
        <ProductosProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<Productos />} />
                </Routes>
            </BrowserRouter>
        </ProductosProvider>
    );
}

export default App;