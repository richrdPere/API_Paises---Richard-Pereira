import React, { useEffect, useState } from "react";
import axios from "axios";

// Import Api key
import { apiAccess } from "../keys";

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
    emojiU,
  } = country;

  // URL imagen
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCountryImage = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: apiAccess,
            q: `${capital}`,
            image_type: "photo",
          },
        });
        const images = response.data.hits;
        if (images.length > 0) {
          setImageUrl(images[0].webformatURL);
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
      {/* Boton cerrar - INICIO */}
      <button
        type="button"
        className="text-gray-900 mb-3 bg-sky-500 hover:bg-sky-900 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:text-white"
        data-modal-hide="default-modal"
        onClick={onClose}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Cerrar</span>
      </button>
      {/* Boton cerrar - FINAL */}

      {/* Datos del Pais - INICIO */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "450px", borderRadius: "10px" }}
        />
      )}
      <h2 className="text-center pb-5 pt-3">
        {name} {emoji}
      </h2>
      <p className="pb-3">
        <strong className="text-2xl">Capital:</strong> <span className="text-xl">{capital}</span> 
      </p>
      <p className="pb-3">
        <strong className="text-2xl">Lenguajes:</strong>{" "} <span className="text-xl">{languages.map((lang) => lang.name).join(", ")}</span>
        
      </p>
      <p className="pb-3">
        <strong className="text-2xl">Población:</strong> {native}
      </p>

      <p className="pb-3">
        <strong className="text-2xl">Moneda:</strong> {currency}
      </p>
      <p className="pb-3">
        <strong className="text-2xl">Region:</strong> {""}
        <div className="flex flex-wrap gap-4 p-4">
          {states.map((lang) => lang.name).join(", ")}
          </div>
      </p>
      {/* Datos del Pais - FINAL */}
    </div>
  );
};

export default DetailCountry;
