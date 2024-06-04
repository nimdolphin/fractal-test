import { SelectOption } from "../../types";

const Select: React.FC<{
  value: SelectOption;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, onChange }) => (
  <div>
    <label>
      Select:
      <select value={value} onChange={onChange}>
        <option value={SelectOption.USER}>User</option>
        <option value={SelectOption.REPO}>Repo</option>
      </select>
    </label>
  </div>
);

export default Select;
