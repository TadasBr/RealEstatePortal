import React, { useEffect, useState } from "react";
import "./categories.css";

interface CategoryListProps {
  setCategory: (category: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ setCategory }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5064/api/categories")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="categoryBox">
      {items.map((item) => (
        <div className="categoryListItem" key={item.id}>
          <div
            className="category"
            onClick={() => setCategory(item.id)}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
