import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";

export const Categories = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const getAllCategories = async () => {
    const res = await axios.get("http://localhost:8000/categories", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setCategories(res.data);
    console.log(categories);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const Topic = () => (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={categories?.map((category) => ({
        value: category.category,
        label: category.category,
      }))}
    />
  );
  const onChange2 = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch2 = (value) => {
    console.log("search:", value);
  };
  const Subcategory = () => (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      onChange={onChange2}
      onSearch={onSearch2}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={categories?.map((category) => ({
        value: category.subcategory,
        label: category.subcategory,
      }))}
    />
  );

  return (
    <div>
      <div>
        <Topic />
        <Subcategory />
      </div>
    </div>
  );
};
