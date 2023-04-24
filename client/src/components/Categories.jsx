import { useEffect, useState } from "react";
import axios from "axios";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const res = await axios.get("http://localhost:8000/categories", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setCategories(res.data);
  };

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};
