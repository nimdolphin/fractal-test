import { TSelectOption, IUser, IRepo } from "../../types";

const DisplayData: React.FC<{
  selectValue: TSelectOption;
  data: IUser | IRepo | null;
}> = ({ selectValue, data }) => (
  <div>
    {selectValue === "user" && data && "login" in data && (
      <div>
        <h2>User Info:</h2>
        <p>Full Name: {(data as IUser).name || "N/A"}</p>
        <p>Public Repos: {(data as IUser).public_repos}</p>
      </div>
    )}
    {selectValue === "repo" && data && "full_name" in data && (
      <div>
        <h2>Repo Info:</h2>
        <p>Name: {(data as IRepo).name}</p>
        <p>Stars: {(data as IRepo).stargazers_count}</p>
      </div>
    )}
  </div>
);

export default DisplayData;
