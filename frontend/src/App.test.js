import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

// Basic smoke test that the home hero section renders
it("renders the LearningHub home hero", () => {
  render(<App />);
  expect(screen.getByText(/Transform Learning with/i)).toBeInTheDocument();
});
