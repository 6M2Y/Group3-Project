import React from "react";

interface InputBoxProps {
  name_: string;
  type_: string;
  id_?: string;
  value_?: string | "";
  placeholder_: string;
}
const InputBox: React.FC<InputBoxProps> = ({
  name_,
  type_,
  id_,
  value_,
  placeholder_,
}) => {
  return (
    <div>
      <input
        name={name_}
        type={type_}
        defaultValue={value_}
        placeholder={placeholder_}
        id={id_}
      ></input>
    </div>
  );
};

export default InputBox;
