import React, { useEffect, useState } from 'react';
import "../Styles/Service.css";
import { fetchArticulos } from "../supabaseService";

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
    <section className="articulos_section" id="articulos">
      <div className="container">
        <div className="section_heading">
          <h3 className="subtitle">Productos</h3>
          <h2 className="title">Artículos disponibles</h2>
          <div className="heading-line"></div>
        </div>

<div className="articulos_row">
  {articulos.length === 0 && <p>No hay artículos disponibles.</p>}
  {articulos.map((articulo) => (
    <div key={articulo.idarticulo} className="col-lg-4 col-md-6 sm-padding">
      <div className="articulo_card">
        {articulo.imagenurl && (
          <img
            src={articulo.imagenurl}
            alt={articulo.nombrearticulo}
            className="articulo-image"
          />
        )}
        <div className="articulo_content">
          <h4 className="articulo-nombre">{articulo.nombrearticulo}</h4>
          {/* Cambié la clase a "articulo-details" para que coincida con CSS */}
          <div className="articulo-details">
            <span className="articulo-precio">${articulo.precio}</span>
            <span className="articulo-stock">Stock: {articulo.stock}</span>
          </div>
          <p className="articulo-descripcion-hover">
            {articulo.descripcionarticulo}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}

export default Services;
