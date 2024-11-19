import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    render(<Button label="Click Me" />);
    const button = screen.getByRole("button", { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button label="Can't Click Me" disabled={true} />);
    const button = screen.getByRole("button", { name: /Can't Click Me/i });
    expect(button).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /Click Me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct className and id", () => {
    render(
      <Button
        label="Styled Button"
        className="custom-class"
        id_="custom-id"
      />
    );
    const button = screen.getByRole("button", { name: /Styled Button/i });
    expect(button).toHaveClass("button custom-class");
    expect(button).toHaveAttribute("id", "custom-id");
  });
});
