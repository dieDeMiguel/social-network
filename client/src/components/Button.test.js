import { render } from "@testing-library/react";
import Button from "./Button";
import { DEFAULT_TEXT } from "./Button";

test("Button should display passed text", () => {
    const myText = "Melanie";
    const { container } = render(<Button text={myText} />);
    expect(container.querySelector("button").innerHTML).toBe(myText);
});

test("Button displays default text when no text", () => {
    const { container } = render(<Button></Button>);
    expect(container.querySelector("button").innerHTML).toBe(DEFAULT_TEXT);
});
