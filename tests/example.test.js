const myFunc = jest.fn((word) => word.toUpperCase());

test("test function arguments", () => {
    const output = myFunc("hello");

    expect(output).toBe("HELLO");
    // expect(myFunc).toHaveBeenCalled();
    expect(myFunc).toHaveBeenCalledWith("hello");
});
