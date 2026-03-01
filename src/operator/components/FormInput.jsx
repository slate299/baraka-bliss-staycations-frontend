// src/components/FormInput.jsx
const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  min,
  step,
}) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label} {required && <span className="text-[#4A7C59]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#2C2C2C] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
      />
    </div>
  );
};

export default FormInput;
