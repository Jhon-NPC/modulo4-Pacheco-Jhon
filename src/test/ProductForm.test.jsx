import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "../components/ProductForm";

beforeAll(() => {
  window.alert = jest.fn();
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
});

test("renderiza formulario y dispara onAdd", () => {
  const handleAdd = jest.fn();
  const { container } = render(<ProductForm onAdd={handleAdd} />);

  fireEvent.change(screen.getByPlaceholderText(/Nombre del producto/i), {
    target: { value: "Lapicero" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Categoría del producto/i), {
    target: { value: "Útiles" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Precio/i), {
    target: { value: "5" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Stock/i), {
    target: { value: "10" },
  });

  const file = new File(["content"], "lapicero.png", {
    type: "image/png",
  });

  const fileInput = container.querySelector('input[type="file"]');
  fireEvent.change(fileInput, { target: { files: [file] } });

  fireEvent.click(screen.getByText(/Registrar producto/i));
  expect(handleAdd).toHaveBeenCalled();
});
