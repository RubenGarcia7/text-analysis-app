import { getTextData } from '../formHandler';
import { performAction } from '../formHandler';

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    // Check that the getTextData function exists in this project
    expect(getTextData()).toBeDefined();
  })
});