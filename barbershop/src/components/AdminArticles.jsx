import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import {
  fetchData,
  insertData,
  updateData,
  deleteData,
} from "../supabaseService";

export default function AdminArticles() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticulos = async () => {
    setLoading(true);
    const { data, error } = await fetchData("articulo");
    if (error) {
      console.error(`Error al obtener artículos:`, error);
      setError("Hubo un error al cargar los artículos.");
    } else {
      setArticulos(data || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadArticulos();
  }, []);

  const handleCreate = async () => {
    const nombre = window.prompt("Nombre del artículo:");
    if (!nombre) return;

    const precioStr = window.prompt("Precio (ej. 250.00):");
    if (!precioStr) return;

    const precio = parseFloat(precioStr);
    if (isNaN(precio) || precio <= 0) {
      alert("Ingrese un precio válido mayor que 0");
      return;
    }

    const stockStr = window.prompt("Cantidad en stock:");
    if (!stockStr) return;

    const stock = parseInt(stockStr, 10);
    if (isNaN(stock) || stock < 0) {
      alert("Ingrese una cantidad en stock válida (0 o más)");
      return;
    }

    const imagenurlInput = window.prompt("URL de la imagen:");
    const imagenurl = imagenurlInput === null ? "" : imagenurlInput.trim();

    const { error } = await insertData("articulo", {
      nombrearticulo: nombre,
      precio,
      stock,
      imagenurl,
    });

    if (error) {
      console.error(`Error al crear artículo:`, error);
      alert("No se pudo crear el artículo.");
    } else {
      loadArticulos();
    }
  };

  const handleEdit = async (articulo) => {
    const nombre = window.prompt("Nombre del artículo:", articulo.nombrearticulo);
    if (nombre === null) return;

    const precioStr = window.prompt("Precio:", articulo.precio.toString());
    if (precioStr === null) return;

    const precio = parseFloat(precioStr);
    if (isNaN(precio) || precio <= 0) {
      alert("Ingrese un precio válido mayor que 0");
      return;
    }

    const stockStr = window.prompt("Cantidad en stock:", articulo.stock.toString());
    if (stockStr === null) return;

    const stock = parseInt(stockStr, 10);
    if (isNaN(stock) || stock < 0) {
      alert("Ingrese una cantidad en stock válida (0 o más)");
      return;
    }

    const imagenurlInput = window.prompt("URL de la imagen:", articulo.imagenurl || "");
    const imagenurl = imagenurlInput === null ? articulo.imagenurl : imagenurlInput.trim();

    const { error } = await updateData("articulo", "idarticulo", articulo.idarticulo, {
      nombrearticulo: nombre,
      precio,
      stock,
      imagenurl,
    });

    if (error) {
      console.error(`Error al editar artículo:`, error);
      alert("No se pudo guardar los cambios.");
    } else {
      loadArticulos();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este artículo?")) return;
    const { error } = await deleteData("articulo", "idarticulo", id);
    if (error) {
      console.error(`Error al eliminar artículo:`, error);
      alert("No se pudo eliminar el artículo.");
    } else {
      loadArticulos();
    }
  };

  if (loading) return <p>Cargando artículos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Gestión de Artículos</h2>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Añadir Nuevo Artículo
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Artículo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((art) => (
            <tr key={art.idarticulo}>
              <td>{art.idarticulo}</td>
              <td>{art.nombrearticulo}</td>
              <td>${art.precio.toFixed(2)}</td>
              <td>{art.stock}</td>
              <td>
                {art.imagenurl ? (
                  <img src={art.imagenurl} alt="" style={{ height: 40 }} />
                ) : (
                  "—"
                )}
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(art)}>
                  Editar
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(art.idarticulo)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {articulos.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No hay artículos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
