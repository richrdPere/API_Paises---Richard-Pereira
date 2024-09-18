// Libraries (Librerias)
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { createApi } from "unsplash-js";

// Queries
import { GET_COUNTRIES } from "../queries";

import { clientId, endpont } from "../keys";

// Components (Componentes)
import SearchBar from "../components/SearchBar";
import DetailCountry from "../components/DetailCountry";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Countries from "../components/Countries";
import Modal from "../components/Modal";

const IndexPage = () => {
  // UseStates
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  // Ventana emergente
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  // Api de Imagenes
  const [images, setImages] = useState(null);
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

  // Función para cerrar la ventana emergente

  // Manejar la selección de un país
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setIsWindowOpen(true);
  };

  // Cerrar los detalles
  const handleCloseDetail = () => {
    setSelectedCountry(null);
    setIsWindowOpen(false);
  };

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

      {/* PAISES - CARDS */}
      <div className={` ${ isWindowOpen ? "flex flex-col lg:flex-row lg:space-x-8 mx-auto max-w-8xl p-4 gap-5" : ""}}`}>
        {/* Sección de Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-1 max-md:grid-cols-2 lg:grid-cols-3 gap-3">
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
        {/* Seccion de la Ventana emergente */}
        {isWindowOpen && (
          <Modal>
            {selectedCountry ? (
              <DetailCountry
                country={selectedCountry}
                onClose={handleCloseDetail}
              />
            ) : (
              <p className="text-gray-500">Select a country to view details</p>
            )}
          </Modal>
        )}
        
      </div>
    </>
  );
};

export default IndexPage;
