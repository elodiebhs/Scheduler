import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);


describe("Application", () => {


  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });




  // Render the Application.
  // Wait until the text "Archie Cohen" is displayed.
  // Click the "Add" button on the first empty appointment.
  // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  // Click the first interviewer in the list.
  // Click the "Save" button on that same appointment.
  // Check that the element with the text "Saving" is displayed.
  // Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    //console.log(prettyDOM(container));



    //Reference the first element in the appointments array.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //console.log(prettyDOM(appointment));


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    //console.log(prettyDOM(appointment));

    //verify that the the appointment element contains the text "Saving" immediately after the "Save" button is clicked
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });




  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));


    // 4. Check that the confirmation message is shown.

    expect(getByText(appointment, "Confirming you want to delete")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });




  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));


    // 4. We change the name and save the interview.

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));



    // 5. Check that the element with the text "Saving" is displayed.

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. We don't want the spots to change for "Monday", since this is an edit.

  })


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //console.log(prettyDOM(container));

    //3. Click the "Add" button on the first empty appointment.

    //Reference the first element in the appointments array.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    //4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5.Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));


    // 6.Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //8.Check that error message is showing

    await waitForElement(() => getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Cound not save appointment")).toBeInTheDocument();

  });





  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));


    // 4. Check that the confirmation message is shown.

    expect(getByText(appointment, "Confirming you want to delete")).toBeInTheDocument();

    // 5. Click the "Confirm" button 
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the Deleting message is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check that the element with the text "Error" is displayed.
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Could not cancel appointment")).toBeInTheDocument();

  });

})