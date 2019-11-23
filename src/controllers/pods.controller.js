import Pod from "../models/pod.model";
import showAll from "../util/api.responser";
import { hyperMediaAll } from "../transformers/pod.transformer";

exports.getPods = async (req, res, next) => {
  const pageSize = +parseInt(req.query.pagesize) || 10;
  const currentPage = +parseInt(req.query.page) || 1;

  const productType = req.query.productType
    ? { product_type: req.query.productType }
    : {};

  const coffeeFlavor = req.query.coffeeFlavor
    ? { coffee_flavor: req.query.coffeeFlavor }
    : {};

  const packSize = req.query.packSize ? { pack_size: req.query.packSize } : {};

  const queryCount = await Pod.find(productType)
    .find(coffeeFlavor)
    .find(packSize)
    .countDocuments();

  const pods = await Pod.find(productType)
    .find(coffeeFlavor)
    .find(packSize)
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);

  const hyperPods = hyperMediaAll(req, pods);

  showAll(req, res, hyperPods, Pod, queryCount);
};
