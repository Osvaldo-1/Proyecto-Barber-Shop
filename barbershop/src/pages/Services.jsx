import React, { useEffect, useState } from "react";
import { fetchArticulos } from "../supabaseService";
import "../Styles/Service.css"

function Services() {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarArticulos() {
      setLoading(true);
      setError(null);

      const { data, error } = await fetchArticulos();

      if (error) {
        setError("Error al cargar artículos");
        setArticulos([]);
      } else {
        setArticulos(data || []);
      }

      setLoading(false);
    }

    cargarArticulos();
  }, []);

  if (loading) return <p>Cargando artículos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {articulos.length === 0 && <p>No hay artículos disponibles.</p>}
      {articulos.map((art) => (
        <div key={art.idarticulo} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg">{art.nombrearticulo}</h3>
          <p>{art.descripcionarticulo}</p>
          <p>Precio: ${art.precio}</p>
          <p>Stock: {art.stock}</p>
          {art.imagenurl && (
            <img
              src={art.imagenurl}
              alt={art.nombrearticulo}
              className="h-32 mt-2 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Services;
