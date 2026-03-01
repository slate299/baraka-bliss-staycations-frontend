// src/components/FormTextArea.jsx
const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label} {required && <span className="text-[#4A7C59]">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full bg-[#2C2C2C] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormTextArea;
