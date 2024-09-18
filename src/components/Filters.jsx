import React from "react";

const Filters = ({
  selectedContinent,
  setSelectedContinent,
  sortOrder,
  setSortOrder,
}) => {
  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-h-screen flex  border rounded-md  gap-10 sm:flex-row justify-center items-center md:grid-cols-2 max-sm:flex-col m-0">
      
      <select
        id="continent-select"
        value={selectedContinent}
        className="w-50 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 sm:w-[300px] md:px-3 py-0 md:py-1 tracking-wider"
        onChange={handleContinentChange}
      >
        <option value="">Todos los continentes</option>
        <option value="Africa">África</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="North America">América del Norte</option>
        <option value="South America">América del Sur</option>
        <option value="Oceania">Oceanía</option>
        <option value="Antarctica">Antártida</option>
      </select>

      
      <select
        id="sort-order-select"
        value={sortOrder}
        className="w-50 h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 sm:w-[300px] md:px-3 py-0 md:py-1 tracking-wider"
        onChange={handleSortOrderChange}
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default Filters;
