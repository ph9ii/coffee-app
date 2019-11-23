import Type from "../../../src/models/type.model";

describe("Type", () => {
  it("should be valid if product_type is valid", done => {
    const t = new Type({ product_type: "abc" });

    expect(t.product_type).toBeTruthy();
    done();
  });

  it("should be invalid if product_type is empty", done => {
    const t = new Type();

    t.validate(err => {
      expect(err.errors.product_type).toBeTruthy();
      done();
    });
  });

  it("should be invalid if product_type length is less than 3", done => {
    const t = new Type({ product_type: "ab" });

    t.validate(err => {
      expect(err.errors.product_type).toBeTruthy();
      done();
    });
  });

  it("should be invalid if product_type is more than 255", done => {
    const product_type = "a".repeat(256);
    const t = new Type({ product_type });

    t.validate(err => {
      expect(err.errors.product_type).toBeTruthy();
      done();
    });
  });
});
