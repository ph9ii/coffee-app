import Pod from "../../../src/models/pod.model";
import mongoose from "mongoose";

describe("Pod", () => {
  it("should be valid if sku is valid", done => {
    const p = new Pod({ sku: "abc" });

    expect(p.sku).toBeTruthy();

    p.validate(err => {
      expect(err.errors.sku).toBeFalsy();
      done();
    });
  });

  it("should be invalid if sku is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be invalid if sku length is less than 3", done => {
    const p = new Pod({ sku: "ab" });

    p.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be invalid if sku is more than 255", done => {
    const sku = "a".repeat(256);
    const p = new Pod({ sku });

    p.validate(err => {
      expect(err.errors.sku).toBeTruthy();
      done();
    });
  });

  it("should be valid if description is valid", done => {
    const p = new Pod({ description: "abc" });

    expect(p.description).toBeTruthy();

    p.validate(err => {
      expect(err.errors.description).toBeFalsy();
      done();
    });
  });

  it("should be invalid if description is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be invalid if description length is less than 3", done => {
    const p = new Pod({ description: "ab" });

    p.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be invalid if description is more than 255", done => {
    const description = "a".repeat(256);
    const p = new Pod({ description });

    p.validate(err => {
      expect(err.errors.description).toBeTruthy();
      done();
    });
  });

  it("should be valid if product_type_id is valid", done => {
    const p = new Pod({
      product_type_id: new mongoose.Types.ObjectId().toHexString()
    });

    expect(p.product_type_id).toBeTruthy();

    p.validate(err => {
      expect(err.errors.product_type_id).toBeFalsy();
      done();
    });
  });

  it("should be invalid if product_type_id is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.product_type_id).toBeTruthy();
      done();
    });
  });

  it("should be invalid if product_type_id is invalid ObjectId", done => {
    const p = new Pod({ product_type_id: 123 });

    p.validate(err => {
      expect(err.errors.product_type_id).toBeTruthy();
      done();
    });
  });

  it("should be valid if product_type is valid", done => {
    const p = new Pod({ product_type: "a" });

    expect(p.product_type).toBeTruthy();

    p.validate(err => {
      expect(err.errors.product_type).toBeFalsy();
      done();
    });
  });

  it("should be invalid if product_type is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.product_type).toBeTruthy();
      done();
    });
  });

  it("should be valid if coffee_flavor_id is valid", done => {
    const p = new Pod({
      coffee_flavor_id: new mongoose.Types.ObjectId().toHexString()
    });

    expect(p.coffee_flavor_id).toBeTruthy();

    p.validate(err => {
      expect(err.errors.coffee_flavor_id).toBeFalsy();
      done();
    });
  });

  it("should be invalid if coffee_flavor_id is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.coffee_flavor_id).toBeTruthy();
      done();
    });
  });

  it("should be invalid if coffee_flavor_id is invalid ObjectId", done => {
    const p = new Pod({ coffee_flavor_id: 123 });

    p.validate(err => {
      expect(err.errors.coffee_flavor_id).toBeTruthy();
      done();
    });
  });

  it("should be valid if coffee_flavor is valid", done => {
    const p = new Pod({ coffee_flavor: "a" });

    expect(p.coffee_flavor).toBeTruthy();

    p.validate(err => {
      expect(err.errors.coffee_flavor).toBeFalsy();
      done();
    });
  });

  it("should be invalid if coffee_flavor is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.coffee_flavor).toBeTruthy();
      done();
    });
  });

  it("should be valid if pack_size_id is valid", done => {
    const p = new Pod({
      pack_size_id: new mongoose.Types.ObjectId().toHexString()
    });

    expect(p.pack_size_id).toBeTruthy();

    p.validate(err => {
      expect(err.errors.pack_size_id).toBeFalsy();
      done();
    });
  });

  it("should be invalid if pack_size_id is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.pack_size_id).toBeTruthy();
      done();
    });
  });

  it("should be invalid if pack_size_id is invalid ObjectId", done => {
    const p = new Pod({ pack_size_id: 123 });

    p.validate(err => {
      expect(err.errors.pack_size_id).toBeTruthy();
      done();
    });
  });

  it("should be valid if pack_size is valid", done => {
    const p = new Pod({ pack_size: "a" });

    expect(p.pack_size).toBeTruthy();

    p.validate(err => {
      expect(err.errors.pack_size).toBeFalsy();
      done();
    });
  });

  it("should be invalid if pack_size is empty", done => {
    const p = new Pod();

    p.validate(err => {
      expect(err.errors.pack_size).toBeTruthy();
      done();
    });
  });
});
