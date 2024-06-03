import { TSelectOption } from "../../types";

const Select: React.FC<{
  value: TSelectOption;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, onChange }) => (
  <div>
    <label>
      Select:
      <select value={value} onChange={onChange}>
        <option value="user">User</option>
        <option value="repo">Repo</option>
      </select>
    </label>
  </div>
);

export default Select;
