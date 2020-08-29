import { formValidator } from '../formChecker';

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    // Check that the function works when the user types something
    expect(formValidator('Sample text')).toBe(true);
  })
});