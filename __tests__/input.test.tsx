import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Input from "../components/input";

describe("Input", () => {
  it("renders an input", () => {

    const { container } = render(
      <Input
        type={""}
        name={""}
        error={null}
        label={""}
        onChange={() => { }}
      />);

    expect(container).toMatchSnapshot()
  });
});
