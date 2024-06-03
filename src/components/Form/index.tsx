import React, { useState } from "react";
import { TSelectOption, IUser, IRepo } from "../../types";
import Input from "../Input";
import Select from "../Select";
import DisplayData from "../DisplayData";

const Form: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<TSelectOption>("user");
  const [data, setData] = useState<IUser | IRepo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value as TSelectOption);
    setData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inputValue) {
      setError("Input value cannot be empty.");
      return;
    }

    const url =
      selectValue === "user"
        ? `https://api.github.com/users/${inputValue}`
        : `https://api.github.com/repos/${inputValue}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error instanceof Error) {
        setError(`Error fetching data: ${error.message}`);
      } else {
        setError("An unknown error occurred.");
      }
      setData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input value={inputValue} onChange={handleInputChange} />
        <Select value={selectValue} onChange={handleSelectChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DisplayData selectValue={selectValue} data={data} />
    </div>
  );
};

export default Form;
