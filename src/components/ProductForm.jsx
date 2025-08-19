import { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    const c = category.trim();
    const i = image;
    if (!t || !c || price === "" || stock === "" || !i) {
      alert("Por favor complete todos los campos");
      return;
    }
    const p = Number(price);
    const s = Number(stock);
    if (isNaN(p) || isNaN(s)) {
      alert("Por favor el campo precio y stock deben ser números");
      return;
    }

    onAdd({
      title: t,
      price: p,
      stock: s,
      category: c,
      image: i ? URL.createObjectURL(i) : "",
    });

    setTitle("");
    setCategory("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "8px",
      }}
    >
      <input
        placeholder="Nombre del producto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        placeholder="Categoría del producto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{
          padding: "6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />
      <button type="submit">Registrar producto</button>
    </form>
  );
}
