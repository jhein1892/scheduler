import reducer from "./application"; 

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      "reduce didn't work with null"
    );
  });
});