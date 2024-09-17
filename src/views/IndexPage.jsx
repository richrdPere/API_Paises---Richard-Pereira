// Libraries (Librerias)
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

// Queries
import { GET_COUNTRIES } from "../queries";

// Components (Componentes)
import SearchBar from "../components/SearchBar";
import DetailCountry from "../components/DetailCountry";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Countries from "../components/Countries";

const IndexPage = () => {
  // UseStates
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  // Estados de Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12; // Número de países por página
  // Estados para los filtros
  const [selectedContinent, setSelectedContinent] = useState(""); // Filtro por continente
  const [sortOrder, setSortOrder] = useState("asc"); // Orden ascendente/descendente

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedContinent]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar por búsqueda y continente
  const filteredCountries = data.countries
    .filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedContinent === "" ||
          country.continent.name === selectedContinent)
    )
    .sort((a, b) => {
      // Ordenar ascendente o descendente
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Calcular los indices de los paies
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {/* Componente SearchBar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filtros: continente y orden */}
      <Filters
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Mostrar detalles del país si hay uno seleccionado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {currentCountries.length === 0 ? (
          <p>No se encontraron paises....</p>
        ) : (
          currentCountries.map((country) => (
            <Countries
              key={country.code}
              country={country}
              onClick={() => handleCountryClick(country)}
            />
          ))
        )}

        {/* Componente de paginación */}
        <Pagination
          countriesPerPage={countriesPerPage}
          totalCountries={filteredCountries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {/* {selectedCountry ? (
        <DetailCountry country={selectedCountry} onClose={handleCloseDetail} />
      ) : (
        
      )} */}
    </>
  );
};

export default IndexPage;
