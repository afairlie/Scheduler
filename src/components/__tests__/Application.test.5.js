import React from "react";
import axios from 'axios';

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, queryByText, getByPlaceholderText} from "@testing-library/react";

import Application from "components/Application";

beforeEach(() => {
  jest.resetModules();
})

afterEach(() => {
  cleanup();
});

describe('Application', () => {
  it("5) shows the save error when failing to save an appointment", async () => {
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
})




  // it("6) shows the delete error when failing to delete an existing appointment", async () => {
  //   axios.delete.mockRejectedValueOnce();
  //   const { container, debug } = render(<Application />);

  //   await waitForElement(() => getByText(container, 'Archie Cohen'))
  //   const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))

  //   fireEvent.click(getByAltText(appointment, 'Delete'))
  //   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  //   fireEvent.click(queryByText(appointment, 'Confirm'))

  //   await waitForElement(() => getByText(appointment, /could not delete appointment/i))
  //   fireEvent.click(getByAltText(appointment, 'Close'))

  //   expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument()
  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );
  //   expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  // })