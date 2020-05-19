import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText('Tuesday'))
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  })
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: { value: "Lydia Miller-Jones" }});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))
    // 3. Click 'Delete' Button
    fireEvent.click(getByAltText(appointment, 'Delete'))
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 4. Wait until confrim loads
    // 5. Click 'Confirm' Button
    fireEvent.click(queryByText(appointment, 'Confirm'))
    // 6. Check that 'Deleting' is displayed
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    // 7. wait for empty appointment to reappear
    await waitForElement(() => getByAltText(appointment, 'Add'))
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument()
    // debug(day)
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))

    fireEvent.click(getByAltText(appointment, 'Edit'))

    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {target: { value: "Edited Name" }});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))

    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Edited Name'))
    expect(getByText(appointment, 'Sylvia Palmer' && 'Edited Name')).toBeInTheDocument()

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: { value: "Lydia Miller-Jones" }});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))

    await waitForElement(() => getByText(appointment, /could not save appointment/i))
    expect(getByText(appointment, /could not save appointment/i)).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, 'Close'))
    expect(getByAltText(appointment, 'Add'))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))

    fireEvent.click(getByAltText(appointment, 'Delete'))
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, 'Confirm'))

    await waitForElement(() => getByText(appointment, /could not delete appointment/i))
    fireEvent.click(getByAltText(appointment, 'Close'))

    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument()
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  })
})