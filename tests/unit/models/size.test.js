import Size from "../../../src/models/size.model";

describe("Size", () => {
  it("should be valid if pack_size is valid", done => {
    const s = new Size({ pack_size: "abc" });

    expect(s.pack_size).toBeTruthy();
    done();
  });

  it("should be invalid if pack_size is empty", done => {
    const s = new Size();

    s.validate(err => {
      expect(err.errors.pack_size).toBeTruthy();
      done();
    });
  });

  it("should be invalid if pack_size length is less than 3", done => {
    const s = new Size({ pack_size: "ab" });

    s.validate(err => {
      expect(err.errors.pack_size).toBeTruthy();
      done();
    });
  });

  it("should be invalid if pack_size is more than 255", done => {
    const pack_size = "a".repeat(256);
    const s = new Size({ pack_size });

    s.validate(err => {
      expect(err.errors.pack_size).toBeTruthy();
      done();
    });
  });
});
