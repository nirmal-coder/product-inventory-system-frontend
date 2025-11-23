import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCategoryFilter = (value) => {
    setFilterCategory(value);
  };
  const value = {
    search,
    setSearch,
    filterCategory,
    setFilterCategory,
    handleCategoryFilter,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
