import { useState } from 'react';
import { DarkArrowDown } from 'assets/icons';

interface CustomSelectProps {
  labelFor: string;
  label: string;
  containerStyles?: string;
  selectStyles?: string;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
  formik?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  labelFor,
  label,
  containerStyles = '',
  selectStyles = '',
  options,
  placeholder = '',
  icon = <DarkArrowDown />,
  formik,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(placeholder || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (formik) {
      formik.setFieldValue(labelFor, value); // Update Formik value
    }
  };

  return (
    <div className={`relative ${containerStyles}`}>
      <label htmlFor={labelFor} className="mb-2 block font-semibold text-gray-700">
        {label}
      </label>
      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 ${selectStyles} ${
          formik?.touched[labelFor] && formik?.errors[labelFor] ? 'border-red-400' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="px-2">{selectedValue || placeholder}</span>
        {icon}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {formik?.touched[labelFor] && formik?.errors[labelFor] && (
        <p className="absolute top-[90px] text-xs italic text-red-400">{formik.errors[labelFor]}</p>
      )}
    </div>
  );
};

export default CustomSelect;
