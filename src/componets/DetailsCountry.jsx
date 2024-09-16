import React, { useEffect, useState } from "react";
import axios from "axios";

const DetailsCountry = ({ country, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCountryImage = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "46022118-aaa4bb99857134f39789c28f5", // Reemplaza esto con tu API key de Pixabay
            q: country.name, // Buscamos una imagen usando el nombre del país
            image_type: "photo",
            per_page: 1,
          },
        });
        const images = response.data.hits;
        if (images.length > 0) {
          setImageUrl(images[0].webformatURL); // Tomamos la primera imagen
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    fetchCountryImage();
  }, [country]);

  if (!country) return null;

  return (
    <div className="detail-country">
      <button onClick={onClose}>Cerrar</button>
      <h2>
        {country.name} {country.emoji}
      </h2>
      <p>
        <strong>Código:</strong> {country.code}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Moneda:</strong> {country.currency}
      </p>
      <p>
        <strong>Continente:</strong> {country.continent.name}
      </p>
      <p>
        <strong>Lenguajes:</strong>{" "}
        {country.languages.map((lang) => lang.name).join(", ")}
      </p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={country.name}
          style={{ width: "300px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
};

export default DetailsCountry;
