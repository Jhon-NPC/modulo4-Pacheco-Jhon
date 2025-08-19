export default function ProductItem({ product, onInc, onDec, onDelete }) {
  const { title, price, stock, image, category } = product;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        gap: "12px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "12px",
        alignItems: "center",
      }}
    >
      <img
        src={image}
        alt={title}
        width={200}
        height={200}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <div>
        <h3>{title}</h3>
        <h4>{category}</h4>
        <h4>S/. {price}</h4>
        <h4>Disponibles: {stock}</h4>
      </div>
      <div style={{ display: "grid", gap: "8px" }}>
        <button onClick={onInc}>+1</button>
        <button onClick={onDec}>-1</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}
