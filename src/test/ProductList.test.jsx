import { render, screen } from "@testing-library/react";

test("muestra texto de carga", () => {
  render(<div>Cargando productos...</div>);
  expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument();
});
