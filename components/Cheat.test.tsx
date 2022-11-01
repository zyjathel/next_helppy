import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Cheat } from "./Cheat";

const confirmHandler = jest.fn();

describe("The `Cheat` component", () => {
  beforeEach(() => {
    const { getByRole } = render(<Cheat onConfirm={confirmHandler} />);
    // const input = getByRole("spinbutton");
    // userEvent.type(input, "10");
  });

  it("Should have an enabled input element with place holder `Type a number...`", () => {
    expect(screen.getByPlaceholderText("Type a number...")).not.toBeDisabled();
  });

  it("Button should be disabled when there is no input", () => {
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Handle user input", () => {
  beforeEach(() => {
    const { getByRole } = render(<Cheat onConfirm={confirmHandler} />);
    const input = screen.getByRole("spinbutton");
    userEvent.type(input, "10");
  });

  it("The input shows the user input value", async () => {
    await waitFor(() => expect(screen.getByRole("spinbutton")).toHaveDisplayValue("10"));
  });

  it("The button becomes activated", async () => {
    await waitFor(() => expect(screen.getByRole("button")).not.toBeDisabled());
  });
});

describe("Click the confirm button", () => {
  beforeEach(() => {
    const { getByRole } = render(<Cheat onConfirm={confirmHandler} />);
    const input = screen.getByRole("spinbutton");
    userEvent.type(input, "10");
    userEvent.click(screen.getByRole("button"));
  });

  it("Should invoke the callback", () => {
    expect(confirmHandler).toHaveBeenCalled();
  });

  it("Should invoke the callback with input value", () => {
    expect(confirmHandler).toHaveBeenCalledWith(10);
  });
});
