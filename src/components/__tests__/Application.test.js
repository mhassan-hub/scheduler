import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import DayListItem from "components/DayListItem";

afterEach(cleanup);
describe("Application", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return (
      waitForElement(() => getByText("Monday"))
        .then(() => {
          fireEvent.click(getByText("Tuesday"))
          expect(getByText("Leopold Silvers")).toBeInTheDocument();
        })
    );
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    // get the first apointment
    const appointment = appointments[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
      fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      }); 

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Loading" is displayed.
    expect(getByText(appointment, "Loading")).toBeInTheDocument();

    // Adding a debug function
    // console.log(debug());

    // prettyDOM makes the container and his children to be easier to read --console.log(prettyDOM(appointment));
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones")); 
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
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
    
    const appointments = getAllByTestId(container, "appointment");
    appointments.find(appointment => getByText(appointment, "Archie Cohen"))
    console.log(prettyDOM(node))
    // 3. Click the "Delete" button on the booked appointment.

    // 4. Check if confirm message pops up
    // 5. Click the confirm button
    // 6. Check that the element with the text "Deleting" is displayed.
    // 7. Check that "Add" button pops up
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  });
})