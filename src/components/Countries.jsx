// Libraries (Librerias)
import React, { useState, useEffect } from "react";
import axios from 'axios';

// Api Key
import { apiAccess } from "../keys";

const Countries = ({ country, onClick }) => {
  // Desctructuring country
  const { name, continent, capital } = country;

  // useState - Imagenes
  const [imageUrl, setImageUrl] = useState(''); 

  // useEffect - Imagenes
  useEffect(() => {
    const fetchCountryImage = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: apiAccess, 
            q: `${capital}`, // Buscamos una imagen usando el nombre del país
            image_type: 'photo'
          },
        });
        console.log(response.data);
        const images = response.data.hits;
        if (images.length > 0) {
          setImageUrl(images[0].webformatURL); // Tomamos la primera imagen
        }
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchCountryImage();
  }, [country]);
  

  return (
    <div onClick={onClick} className="w-4/5 mx-auto space-y-4 cursor-pointer">
      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-20">
        
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover hover:border-sky-500"
          onClick={onClick}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
          <h3 className=" z-10 mt-3 text-2xl font-bold text-white">{name}</h3>
          <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            {continent.name}
          </div>
      </div>
    </div>
  );
};

export default Countries;
