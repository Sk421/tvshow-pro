import { useState } from 'react';

const CustomInput = ({
  name,
  placeholder = '',
  value,
  onChange = () => { },
  type = 'text',
  onBlur = () => { },
}) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    const isValid = onBlur && onBlur(value);
    isValid ? setError('') : setError(`Invalid ${name}`);
  };

  return (
    <div className="custom-input">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CustomInput;