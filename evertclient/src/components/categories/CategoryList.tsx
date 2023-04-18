import React, { useEffect, useState } from "react";
import "./categories.css";
import { Api_Url } from "../Constants";

interface CategoryListProps {
  setCategory: (category: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ setCategory }) => {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(-1);

  useEffect(() => {
    fetch(`${Api_Url}/categories`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
    setCategory(categoryId);
  };

  return (
    <div className="categoryBox">
      {items.map((item) => (
        <div
          key={item.id}
          className={`categoryListItem ${
            activeCategory === item.id ? "active" : ""
          }`}
        >
          <div
            className="category"
            onClick={() => handleCategoryClick(item.id)}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;