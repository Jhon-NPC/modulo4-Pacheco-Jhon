import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://dummyjson.com/products?limit=20");
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await res.json();

        if (!isActive) return;
        const processedProducts = (data.products || []).map((p) => ({
          id: p.id,
          title: p.title,
          price: Number(p.price) || 0,
          stock: Number(p.stock) || 0,
          image: Array.isArray(p.images) && p.images.length ? p.images[0] : "",
          category: p.category || "N/A",
        }));

        setProducts(processedProducts);
        setFiltered(processedProducts);
      } catch (e) {
        if (isActive) {
          setError(e.message);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    );
  }, [query, products]);

  const incrementStock = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 1 } : p))
    );
  };

  const decrementStock = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock - 1) } : p
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (product) => {
    setProducts((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      return [{ ...product, id: lastId + 1 }, ...prev];
    });
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p role="alert">Ocurrió un error: {error}</p>;
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h2>Inventario</h2>
      <ProductForm onAdd={addProduct} />

      <input
        placeholder="Buscar por nombre o categoria"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <div style={{ display: "grid", gap: "12px" }}>
        {filtered.map((p) => (
          <ProductItem
            key={p.id}
            product={p}
            onInc={() => incrementStock(p.id)}
            onDec={() => decrementStock(p.id)}
            onDelete={() => removeProduct(p.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p>No hay productos que coincida con la búsqueda</p>
        )}
      </div>
    </div>
  );
}
