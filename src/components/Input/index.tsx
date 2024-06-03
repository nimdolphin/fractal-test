const Input: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <div>
    <label>
      Text Input:
      <input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);

export default Input;
