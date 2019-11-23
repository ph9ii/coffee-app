import "@babel/polyfill";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import Pod from "../../src/models/pod.model";
import Size from "../../src/models/size.model";
import Type from "../../src/models/type.model";
import Flavor from "../../src/models/flavor.model";

let port;
let server;

describe("/api/pods", () => {
  beforeEach(() => {
    port = 2100;
    server = app.listen(port, () => {});
  });
  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    beforeEach(async () => {
      const large = new Type({
        product_type: "COFFEE_POD_LARGE"
      });
      await large.save();

      const small = new Type({
        product_type: "COFFEE_POD_SMALL"
      });
      await small.save();

      const vanilla = new Flavor({
        flavor: "COFFEE_FLAVOR_VANILLA"
      });
      await vanilla.save();

      const caramel = new Flavor({
        flavor: "COFFEE_FLAVOR_CARAMEL"
      });
      await caramel.save();

      const oneDozen = new Size({
        pack_size: "1 dozen"
      });
      await oneDozen.save();

      const threeDozen = new Size({
        pack_size: "3 dozen"
      });
      await threeDozen.save();

      await Pod.insertMany([
        {
          sku: "CP001",
          description: "small coffee pod, 1 dozen, vanilla",
          product_type_id: small.id,
          product_type: small.product_type,
          coffee_flavor_id: vanilla.id,
          coffee_flavor: vanilla.flavor,
          pack_size_id: oneDozen.id,
          pack_size: oneDozen.pack_size
        },
        {
          sku: "CP002",
          description: "large coffee pod, 3 dozen, caramel",
          product_type_id: large.id,
          product_type: large.product_type,
          coffee_flavor_id: caramel.id,
          coffee_flavor: caramel.flavor,
          pack_size_id: threeDozen.id,
          pack_size: threeDozen.pack_size
        }
      ]);
    });

    afterEach(async () => {
      await Type.deleteMany({});
      await Flavor.deleteMany({}, () => {});
      await Size.deleteMany({}, () => {});
      await Pod.deleteMany({}, () => {});
    });

    it("should return all coffee pods", async () => {
      const res = await request(server).get("/api/pods");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some(m => m.sku === "CP001")).toBeTruthy();
      expect(res.body.data.some(m => m.sku === "CP002")).toBeTruthy();
    });

    it("should filter by productType, return only coffee pods of type 'COFFEE_POD_LARGE'", async () => {
      const filterByType = "COFFEE_POD_LARGE";
      const res = await request(server).get(
        `/api/pods?productType=${filterByType}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(
        res.body.data.some(p => p.product_type === filterByType)
      ).toBeTruthy();
    });

    it("should return an empty array when filtering by not found product type", async () => {
      const filterByType = "a";
      const res = await request(server).get(
        `/api/pods?productType=${filterByType}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0);
      expect(res.body.data.length === 0).toBeTruthy();
    });

    it("should filter by flavor, return only coffee pods of flavor 'COFFEE_FLAVOR_CARAMEL'", async () => {
      const filterByFlavor = "COFFEE_FLAVOR_CARAMEL";
      const res = await request(server).get(
        `/api/pods?coffeeFlavor=${filterByFlavor}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(
        res.body.data.some(p => p.coffee_flavor === filterByFlavor)
      ).toBeTruthy();
    });

    it("should filter by size, return only coffee pods of size '3 dozen'", async () => {
      const filterBySize = "3 dozen";
      const res = await request(server).get(
        `/api/pods?packSize=${filterBySize}`
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(
        res.body.data.some(p => p.pack_size === filterBySize)
      ).toBeTruthy();
    });

    it("should paginate, return only one pod", async () => {
      const res = await request(server).get("/api/pods?pagesize=1");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.meta.pagination.perPage).toBe(1);
    });
  });

  afterAll(done => {
    mongoose.disconnect(done);
  });
});
