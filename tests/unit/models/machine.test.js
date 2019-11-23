import Machine from "../../../src/models/machine.model";
import mongoose from "mongoose";

describe("Machine", () => {
  it("should be valid if sku is valid", done => {
    const m = new Machine({ sku: "abc" });

    expect(m.sku).toBeTruthy();

    m.validate(err => {
      expect(err.errors.sku).toBeFalsy();
      done();
    });
  });

  it("should be invalid if sku is empty", done => {
    const m = new Machine();

    m.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be invalid if sku length is less than 3", done => {
    const m = new Machine({ sku: "ab" });

    m.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be invalid if sku is more than 255", done => {
    const sku = "a".repeat(256);
    const m = new Machine({ sku });

    m.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be valid if description is valid", done => {
    const m = new Machine({ description: "abc" });

    expect(m.description).toBeTruthy();

    m.validate(err => {
      expect(err.errors.description).toBeFalsy();
      done();
    });
  });

  it("should be invalid if description is empty", done => {
    const m = new Machine();

    m.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be invalid if description length is less than 3", done => {
    const m = new Machine({ description: "ab" });

    m.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be invalid if description is more than 255", done => {
    const description = "a".repeat(256);
    const m = new Machine({ description });

    m.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be valid if product_type_id is valid", done => {
    const m = new Machine({
      product_type_id: new mongoose.Types.ObjectId().toHexString()
    });

    expect(m.product_type_id).toBeTruthy();

    m.validate(err => {
      expect(err.errors.product_type_id).toBeFalsy();
      done();
    });
  });

  it("should be invalid if product_type_id is empty", done => {
    const m = new Machine();

    m.validate(err => {
      expect(err.errors.product_type_id).toBeTruthy();
      done();
    });
  });

  it("should be invalid if product_type_id is invalid ObjectId", done => {
    const m = new Machine({ product_type_id: 123 });

    m.validate(err => {
      expect(err.errors.product_type_id).toBeTruthy();
      done();
    });
  });

  it("should be valid if product_type is valid", done => {
    const m = new Machine({ product_type: "a" });

    expect(m.product_type).toBeTruthy();

    m.validate(err => {
      expect(err.errors.product_type).toBeFalsy();
      done();
    });
  });

  it("should be invalid if product_type is empty", done => {
    const m = new Machine();

    m.validate(err => {
      expect(err.errors.product_type).toBeTruthy();
      done();
    });
  });
});
