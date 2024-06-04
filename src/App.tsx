import React, { useState } from "react";
import { SelectOption, IUser, IRepo } from "./types";
import Input from "./components/Input";
import Select from "./components/Select";
import "./App.css";

const API_BASE_URL = "https://api.github.com";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<SelectOption>(
    SelectOption.USER
  );
  const [data, setData] = useState<IUser | IRepo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value as SelectOption);
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
      selectValue === SelectOption.USER
        ? `${API_BASE_URL}/users/${inputValue}`
        : `${API_BASE_URL}/repos/${inputValue}`;

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
    <main>
      <h1>Form</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Input value={inputValue} onChange={handleInputChange} />
          <Select value={selectValue} onChange={handleSelectChange} />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {selectValue === SelectOption.USER && data && (
          <div>
            <h2>User Info:</h2>
            <p>Full Name: {(data as IUser).name}</p>
            <p>Public Repos: {(data as IUser).public_repos}</p>
          </div>
        )}
        {selectValue === SelectOption.REPO && data && (
          <div>
            <h2>Repo Info:</h2>
            <p>Name: {(data as IRepo).name}</p>
            <p>Stars: {(data as IRepo).stargazers_count}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
