import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputBox from "./InputBox";

describe("InputBox Component", () => {
  it("calls onChange when user types in the input field", () => {
    const handleChange = jest.fn(); // Mock-funksjon
    const { getByPlaceholderText } = render(
      <InputBox
        type_="text"
        placeholder_="Type here"
        onChange={handleChange}
      />
    );

    const inputElement = getByPlaceholderText("Type here") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement.value).toBe("New Value");
  });
});

