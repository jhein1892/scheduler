import React from "react";
import axios from "axios"; 

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByTestId } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment")[0]
  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); 

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument(); 
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />); 

  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen")); 
  fireEvent.click(queryByAltText(appointment, "Delete"))
  expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument(); 
  fireEvent.click(getByText(appointment, "Confirm"))
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  await waitForElement(() => getByAltText(appointment, "Add"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument(); 

  
})

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  
  fireEvent.click(queryByAltText(appointment, "Edit"))
  fireEvent.change(getByTestId(appointment, "student-name-input"), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByText(appointment, "Save"))
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));  
  
})

it("shows the save error when failing to save an appointment", async () => {
  const { container, debug } = render(<Application />);
  axios.put.mockRejectedValueOnce(); 
  
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment")[0]
  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); 
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving"));
  await waitForElement(() => getByText(container, "Error"));
  expect(getByText(appointment, "Error"));
})

it("shows the delete error when failing to delete an existing appointment", async () => {
  const { container, debug } = render(<Application />); 
  axios.delete.mockRejectedValueOnce();
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen")); 
  fireEvent.click(queryByAltText(appointment, "Delete"))
  fireEvent.click(getByText(appointment, "Confirm"))
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  await waitForElement(() => getByText(container, "Could not Delete"));
  expect(getByText(appointment, "Error"))
})
 
})