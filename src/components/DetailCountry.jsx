import React, { useEffect, useState } from "react";
import axios from "axios";

const DetailCountry = ({ country, onClose }) => {
  // Desctructuring country
  const {
    name,
    emoji,
    code,
    capital,
    languages,
    native,
    currency,
    states,
    subdivisions,
    emojiU
  } = country;

  // URL imagen
  const [imageUrl, setImageUrl] = useState("");

  // Ventana emergente
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  useEffect(() => {
    const fetchCountryImage = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "46022118-aaa4bb99857134f39789c28f5", // Reemplaza esto con tu API key de Pixabay
            q: name, // Buscamos una imagen usando el nombre del país
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
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "300px", borderRadius: "10px" }}
        />
      )}
      <h2>
        {name} {emoji}
      </h2>
      <p>
        <strong>Capital:</strong> {capital}
      </p>
      <p>
        <strong>Lenguajes:</strong>{" "}
        {languages.map((lang) => lang.name).join(", ")}
      </p>
      <p>
        <strong>Población:</strong> {native}
      </p>

      <p>
        <strong>Moneda:</strong> {currency}
      </p>
      <p>
        <strong>Region:</strong> {""}
        {states.map((lang) => lang.name).join(", ")}
      </p>
    </div>
  );
};

export default DetailCountry;
