// import React from "react";

// interface InputBoxProps {
//   name_: string;
//   type_: string;
//   id_?: string;
//   value_?: string | "";
//   placeholder_: string;
// }
// const InputBox: React.FC<InputBoxProps> = ({
//   name_,
//   type_,
//   id_,
//   value_,
//   placeholder_,
// }) => {
//   return (
//     <div>
//       <input
//         name={name_}
//         type={type_}
//         defaultValue={value_}
//         placeholder={placeholder_}
//         id={id_}
//       ></input>
//     </div>
//   );
// };

// export default InputBox;
interface InputBoxProps {
  // name_: File;
  type_: string;
  accept_?: string; // Optional for file input
  value_?: string | "";
  placeholder_?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  // name_,
  type_,
  accept_,
  value_,
  placeholder_,
  onChange,
}) => {
  return (
    <div>
      <input
        // name={name_}
        type={type_}
        value={value_}
        placeholder={placeholder_}
        accept={accept_}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
