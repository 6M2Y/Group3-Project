interface ButtonProps {
  label: string;
  type_?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  id_?: string;
  style?: React.CSSProperties; // Optional custom styles
}

const Button: React.FC<ButtonProps> = ({
  label,
  type_ = "button",
  onClick,
  disabled = false,
  className = "",
  id_,
  style = {},
}) => {
  return (
    <button
      type={type_}
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
      id={id_}
    >
      {label}
    </button>
  );
};

export default Button;
