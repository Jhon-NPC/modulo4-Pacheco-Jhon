import { render, screen } from "@testing-library/react";
import ProductItem from "../components/ProductItem";

test("muestra título del producto", () => {
  const product = {
    title: "Lapicero",
    price: 5,
    stock: 10,
    image: null,
    category: "Útiles",
  };
  render(<ProductItem product={product} />);
  expect(screen.getByText(/Lapicero/i)).toBeInTheDocument();
});
