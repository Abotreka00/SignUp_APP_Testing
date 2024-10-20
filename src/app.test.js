import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

const cleanCodeFormTest = ({ userName, Email, Password }) => {
  const userNameInputElement = screen.getByRole("textbox", {
    name: /userName/i,
  });

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const passwordInputElement = screen.getByLabelText(/Password/i);

  const submitBtnElement = screen.getByRole("button", { name: /sign up/i });

  if (userName) {
    userEvent.type(userNameInputElement, userName);
  }
  if (Email) {
    userEvent.type(emailInputElement, Email);
  }
  if (Password) {
    userEvent.type(passwordInputElement, Password);
  }

  return {
    userNameInputElement,
    emailInputElement,
    passwordInputElement,
    submitBtnElement,
  };
};

describe("test for form validation", () => {
  it("inputs should be initially empty", () => {
    render(<App />);

    const { userNameInputElement, emailInputElement, passwordInputElement } =
      cleanCodeFormTest({ userName: "", Email: "", Password: "" });

    expect(userNameInputElement.value).toBe("");
    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
  });

  it("should be able to type a username", () => {
    render(<App />);

    const { userNameInputElement } = cleanCodeFormTest({
      userName: "saleh hossam",
    });

    expect(userNameInputElement.value).toBe("saleh hossam");
  });

  it("should be able to type a email", () => {
    render(<App />);

    const { emailInputElement } = cleanCodeFormTest({
      Email: "saleh.hossam@gmail.com",
    });

    expect(emailInputElement.value).toBe("saleh.hossam@gmail.com");
  });

  it("should be able to type a password", () => {
    render(<App />);

    const { passwordInputElement } = cleanCodeFormTest({
      Password: "123456789",
    });

    expect(passwordInputElement.value).toBe("123456789");
  });

  describe("handle errer for  invalid inputs", () => {
    it("should display an error message when the userName is invalid", () => {
      render(<App />);

      const { userNameInputElement, submitBtnElement } = cleanCodeFormTest({
        userName: "",
      });

      const errorMessageUsername = screen.queryByText(
        /username must be at least 8 characters/i
      );

      // Error message should not exist initially
      expect(errorMessageUsername).not.toBeInTheDocument();

      cleanCodeFormTest({ userName: "saleh" });

      fireEvent.click(submitBtnElement);

      expect(userNameInputElement.value).toBe("saleh");

      const errorMessageUsernameAgain = screen.queryByText(
        /username must be at least 8 characters/i
      );

      expect(errorMessageUsernameAgain).toBeInTheDocument(); // Expect the error to be shown
    });

    it("should display an error message when the Email is invalid", () => {
      render(<App />);

      const { submitBtnElement } = cleanCodeFormTest({
        userName: "",
        Email: "",
        Password: "",
      });

      const errorMessageUsername = screen.queryByText(
        /username must be at least 8 characters/i
      );

      const errorMessageEmail = screen.queryByText(
        /Please enter a valid email address/i
      );

      expect(errorMessageEmail).not.toBeInTheDocument();

      cleanCodeFormTest({ userName: "saleh hossam", Email: "salehgmail.com" });
      fireEvent.click(submitBtnElement);

      // Error message should not exist initially
      expect(errorMessageUsername).not.toBeInTheDocument();

      const errorMessageEmailAgain = screen.queryByText(
        /Please enter a valid email address/i
      );

      expect(errorMessageEmailAgain).toBeInTheDocument();
    });

    it("should display an error message when the Password is invalid", () => {
      render(<App />);

      const { submitBtnElement } = cleanCodeFormTest({
        userName: "",
        Email: "",
        Password: "",
      });

      const errorMessageUsername = screen.queryByText(
        /username must be at least 8 characters/i
      );

      const errorMessageEmail = screen.queryByText(
        /Please enter a valid email address/i
      );

      const errorMessagePassword = screen.queryByText(
        /Password must be at least 6 characters/i
      );

      expect(errorMessagePassword).not.toBeInTheDocument();

      cleanCodeFormTest({
        userName: "saleh hossam",
        Email: "saleh@gmail.com",
        Password: "123",
      });
      fireEvent.click(submitBtnElement);

      // Error message should not exist initially
      expect(errorMessageUsername).not.toBeInTheDocument();
      expect(errorMessageEmail).not.toBeInTheDocument();

      const errorMessagePasswordAgain = screen.queryByText(
        /Password must be at least 6 characters/i
      );

      expect(errorMessagePasswordAgain).toBeInTheDocument();
    });
  });
});
