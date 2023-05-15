import React, { useEffect, useState } from "react";
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
    <div className="my-8">
      <h2 className="text-themeColor text-xl font-semibold">Categories</h2>
      <div className="mt-2 flex gap-3 items-center">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col gap-5 justify-start items-start mr-3`}
          >
            <div
              className={`text-base bg-white shadow-xl border border-themeColor px-2 py-[2px] rounded cursor-pointer text-center ${
                activeCategory === item.id ? "bg-cyan-950 text-white" : ""
              }`}
              onClick={() => handleCategoryClick(item.id)}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default CategoryList;
