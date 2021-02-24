import React from "react";
import { getByText, prettyDOM, render, waitForElement } from "@testing-library/react";
import Appointment from "components/Application";


describe("Appointment", () => {
  it("renders without crashing", async () => {
   const { container } = render(<Appointment />);
    await waitForElement(() => getByText(container, "5pm"));
  });
}); 