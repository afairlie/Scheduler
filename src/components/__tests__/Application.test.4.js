import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, queryByText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

beforeEach(() => {
  jest.resetModules();
})

afterEach(() => {
  cleanup();
});

describe('Application', () => {

  it("4) loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
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
})