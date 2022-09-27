import "@testing-library/jest-dom"; //important to toBeInDocument() to run
import SplashScreen from "../../pages/SplashScreen";
import { render } from "@testing-library/react";
import React from "react"

it("should render splash screen properly", () => {
  const page = render(<SplashScreen />);
  console.log(page.asFragment())
  expect(page.asFragment()).toMatchSnapshot();
});
