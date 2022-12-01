import React, { useState } from 'react'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const PasswordInput = ({label, value, onChange, id, name, placeholder}) => {

    const [showPass, setShowPass] = useState(false);
    const [type, setType] = useState("password");

    const showPassword = (e) => {
      setType("text");
      setShowPass(true);
    };

    const hidePassword = (e) => {
      if (e.target.id === "confirmPass") {
        setType("password");
        setShowPass(false);
      }
      console.log(e.target.id);
    };
  return (
    <div className="inputGroup col-span-1 flex flex-col my-4 relative">
      <label htmlFor={id} className="text-sm px-2 mb-3">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="outline-gray-500 border font-firasans border-gray-300 py-2 px-4"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {showPass === false && (
        <RiEyeCloseLine
          className="absolute top-11 cursor-pointer right-4 text-gray-600 text-lg"
          onClick={showPassword}
        />
      )}
      {showPass === true && (
        <RiEyeLine
          id="confirmPass"
          className="absolute top-11 cursor-pointer right-4 text-gray-600 text-lg"
          onClick={hidePassword}
        />
      )}
    </div>
  );
}

export default PasswordInput
