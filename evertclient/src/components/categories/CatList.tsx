import { useEffect, useState } from "react";
import { Api_Url } from "../Constants";
import Header from "../main/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CatList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${Api_Url}/categories`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`${Api_Url}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }).then((response) => {
      if(response.status === 204){
        setItems(items.filter((item) => item.id !== id));
        toast.success("Category deleted successfully.");
      } else{
        toast.error("Failed to delete category, category has advertisements!")
      }  
    });
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-categories/${id}`);
  };

  return (
    <div>
      <Header />
      <ToastContainer/>
      <div className="w-full mt-40">
        <h2 className="font-bold text-themeColor my-2 text-4xl text-center capitalize">
          All Categories
        </h2>
        <div className="w-full flex flex-col justify-center items-center mt-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-6/12 bg-white shadow-xl mb-8 h-24 flex justify-between items-center p-6 rounded-lg hover:scale-105 duration-300"
            >
              <p className="text-xl font-semibold text-themeColor">
                {item.name}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="outline-none border-none bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="outline-none border-none bg-red-600 py-2 font-semibold px-6 text-white rounded-md hover:scale-[102%] duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatList;
