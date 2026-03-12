import { useMemo } from "react";

const useFilteredCategories = (categories, searchTerm) => {
  return useMemo(() => {
    if (!categories) return [];

    return categories
      .map((category) => ({
        ...category,
        subcategories: category.subcategories.filter((subcategory) =>
          subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.subcategories.length > 0
      );
  }, [categories, searchTerm]);
};

export default useFilteredCategories;
