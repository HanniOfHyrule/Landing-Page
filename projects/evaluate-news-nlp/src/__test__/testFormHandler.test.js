import { handleSubmit } from "../client/js/formHandler";
import { updateUiWithSentiment } from "../client/js/formHandler";

/**
 * @jest-environment jsdom
 */

describe("testing handleSubmit functionality", () => {
  test("testing the submit functionality", () => {
    expect(handleSubmit).toBeDefined();
  });
  // test("testing the Submit function", () => {
  //   const event = { preventDefault: jest.fn() };
  //   handleSubmit(event);
  //   expect(event.preventDefault).toHaveBeenCalledTimes(1);
  // });
  // test("testing to valid the URL", () => {
  //   const url = window.document.getElementById("url").value;
  //   expect(url.preventDefault).toBeDefined();
  // });
});
