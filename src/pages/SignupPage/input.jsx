import React, { useState } from "react";

const InputComponent = ({ icon,value,onChange, onEmailChange }) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleInputChange = (e) => {
    onChange(e);
    if (onEmailChange && e.target.name === "email") {
      onEmailChange(e.target.value); // Pass the email value to the parent component
    }
  };
  return (
    <div
      className="d-flex align-items-center border rounded-3 "
      style={{ width: "100%", padding: "0 1rem" }}
    >
      <input
        type={icon ? (isHidden ? "password" : "text") : "email"}
        placeholder={icon ? "Password" : "Email"}
        style={{
          width: "inherit",
          border: "none",
          height: "6vh",
          borderStyle: "none",
        }}
        value={value}
        onChange={handleInputChange}
        name="email"
      />
      <div onClick={() => setIsHidden(!isHidden)}>
        {icon && <i class={isHidden ? "bi bi-eye-slash" : "bi bi-eye"}></i>}
      </div>
    </div>
  );
};

export default InputComponent;
