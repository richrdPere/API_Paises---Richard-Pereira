import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries";

// Components (Componentes)
import SearchBar from "./componets/SearchBar";
import DetailsCountry from "./componets/DetailsCountry";

function AppPaises() {
  // UseStates
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar los paises por SearchBar
  const filteredCountries = data.countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejar la selección de un país
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  // Cerrar los detalles
  const handleCloseDetail = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <h1>Lista de Países</h1>

      {/* Componente SearchBar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Mostrar detalles del país si hay uno seleccionado */}
      {selectedCountry ? (
        <DetailsCountry country={selectedCountry} onClose={handleCloseDetail} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.code} onClick={() => handleCountryClick(country)}>
              {country.name} - {country.capital} {country.emoji}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default AppPaises;
