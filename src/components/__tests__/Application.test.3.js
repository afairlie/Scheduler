import React from "react";
import axios from 'axios';

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

describe('Application', () => {
  it("3) loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, 'Archie Cohen'));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'));
  
    fireEvent.click(getByAltText(appointment, 'Delete'))
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    fireEvent.click(queryByText(appointment, 'Confirm'))
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
  
    await waitForElement(() => getByAltText(appointment, 'Add'));
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  })
})
