// ProductosContext.js
import { createContext, useState, useEffect } from 'react';

export const ProductosContext = createContext();

function ProductosProvider({ children }) {
    const [bazinga, setBazinga] = useState([]);
    const [listaFiltrada, setListaFiltrasda] = useState([]);

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

    return (
        <ProductosContext.Provider value={{ bazinga, setBazinga, listaFiltrada, setListaFiltrasda }}>
            {children}
        </ProductosContext.Provider>
    );
}

export default ProductosProvider;
