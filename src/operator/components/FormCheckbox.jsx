// src/components/FormCheckbox.jsx
const FormCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#4A7C59] bg-[#2C2C2C] border-gray-600 rounded focus:ring-[#4A7C59]"
      />
      <label htmlFor={name} className="ml-2 text-white text-sm font-medium">
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
