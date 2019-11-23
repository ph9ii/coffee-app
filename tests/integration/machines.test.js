import "@babel/polyfill";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import Type from "../../src/models/type.model";
import Machine from "../../src/models/machine.model";

let port;
let server;

describe("/api/machines", () => {
  beforeEach(() => {
    port = 2100;
    // This will decouple our test server
    server = app.listen(port, () => {});
  });
  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    beforeEach(async () => {
      const small = new Type({
        product_type: "COFFEE_MACHINE_SMALL"
      });
      await small.save();

      const large = new Type({
        product_type: "COFFEE_MACHINE_LARGE"
      });
      await large.save();

      await Machine.insertMany([
        {
          sku: "CM001",
          description: "small machine, base model",
          water_line_compatible: true,
          product_type_id: small.id,
          product_type: small.product_type
        },
        {
          sku: "CM002",
          description: "large machine, premium model",
          water_line_compatible: false,
          product_type_id: large.id,
          product_type: large.product_type
        }
      ]);
    });

    afterEach(async () => {
      await Type.deleteMany({});
      await Machine.deleteMany({});
    });

    it("should return all coffee machines", async () => {
      const res = await request(server).get("/api/machines");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some(m => m.sku === "CM001")).toBeTruthy();
      expect(res.body.data.some(m => m.sku === "CM002")).toBeTruthy();
    });

    it("should filter by productType, return only coffee machines of type 'COFFEE_MACHINE_LARGE'", async () => {
      const filterByType = "COFFEE_MACHINE_LARGE";
      const res = await request(server).get(
        `/api/machines?productType=${filterByType}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(
        res.body.data.some(m => m.product_type === filterByType)
      ).toBeTruthy();
    });

    it("should return an empty array when filtering by not found product type", async () => {
      const filterByType = "a";
      const res = await request(server).get(
        `/api/machines?productType=${filterByType}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0);
      expect(res.body.data.length === 0).toBeTruthy();
    });

    it("should filter by waterLine, return only coffee machines of water line compatabe is set to 'true'", async () => {
      const filterByWaterLine = "true";
      const res = await request(server).get(
        `/api/machines?waterLine=${filterByWaterLine}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(
        res.body.data.some(m => m.water_line_compatible === true)
      ).toBeTruthy();
    });

    it("should paginate, return only one machine", async () => {
      const res = await request(server).get("/api/machines?pagesize=1");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.meta.pagination.perPage).toBe(1);
    });
  });

  afterAll(done => {
    mongoose.disconnect(done);
  });
});
