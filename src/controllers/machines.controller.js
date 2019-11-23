import Machine from "../models/machine.model";
import showAll from "../util/api.responser";
import { hyperMediaAll } from "../transformers/machine.transformer";

exports.getMachines = async (req, res, next) => {
  const pageSize = +parseInt(req.query.pagesize) || 10;
  const currentPage = +parseInt(req.query.page) || 1;

  const productType = req.query.productType
    ? { product_type: req.query.productType }
    : {};

  const waterLine =
    req.query.waterLine === "true" || req.query.waterLine === "false"
      ? { water_line_compatible: req.query.waterLine }
      : {};

  const queryCount = await Machine.find(productType)
    .find(waterLine)
    .countDocuments();

  const machines = await Machine.find(productType)
    .find(waterLine)
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);

  const hyperMachines = hyperMediaAll(req, machines);

  showAll(req, res, hyperMachines, Machine, queryCount);
};
