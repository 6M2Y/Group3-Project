import { emailRegEx, passwordRegEx } from "./Regex";

describe("Regex utilities", () => {
  describe("emailRegEx", () => {
    it("should match a valid email", () => {
      const validEmail = "test@example.com";
      expect(emailRegEx.test(validEmail)).toBe(true);
    });

    it("should not match an invalid email", () => {
      const invalidEmail = "plainaddress";
      expect(emailRegEx.test(invalidEmail)).toBe(false);
    });
  });

  describe("passwordRegEx", () => {
    it("should match a valid password", () => {
      const validPassword = "Password1";
      expect(passwordRegEx.test(validPassword)).toBe(true);
    });

    it("should not match an invalid password", () => {
      const invalidPassword = "short";
      expect(passwordRegEx.test(invalidPassword)).toBe(false);
    });
  });
});
