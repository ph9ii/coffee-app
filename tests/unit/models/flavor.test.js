import Flavor from "../../../src/models/flavor.model";

describe("Flavor", () => {
  it("should be valid if flavor is valid", done => {
    const f = new Flavor({ flavor: "abc" });

    expect(f.flavor).toBeTruthy();
    done();
  });

  it("should be invalid if flavor is empty", done => {
    const f = new Flavor();

    f.validate(err => {
      expect(err.errors.flavor).toBeTruthy();
      done();
    });
  });

  it("should be invalid if flavor length is less than 3", done => {
    const f = new Flavor({ flavor: "ab" });

    f.validate(err => {
      expect(err.errors.flavor).toBeTruthy();
      done();
    });
  });

  it("should be invalid if flavor is more than 255", done => {
    const flavor = "a".repeat(256);
    const f = new Flavor({ flavor });

    f.validate(err => {
      expect(err.errors.flavor).toBeTruthy();
      done();
    });
  });
});
