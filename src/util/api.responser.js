// @flow

/**
 * Show collections with pagination,
 * return response with collection+meta
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} collection
 * @param {Model} Model
 * @param {Number} queryCount
 * @param {Number} code
 *
 * @return {Object}
 */
export default async (
  req: Object,
  res: Object,
  collection: Object,
  Model: Function,
  queryCount: number,
  code: number = 200
): Object => {
  const pageSize = +parseInt(req.query.pagesize) || 10;
  const currentPage =
    collection.length === 0 ? 0 : +parseInt(req.query.page) || 1;

  const totalPages = Math.ceil(queryCount / pageSize);

  const navLinks = getNavLinks(req, currentPage, totalPages, pageSize);

  const totalCount = await Model.countDocuments();

  return res.status(code).json({
    data: collection,
    meta: {
      pagination: {
        total: totalCount,
        count: queryCount,
        perPage: pageSize,
        currentPage,
        totalPages,

        links: {
          prev: navLinks.prev,
          next: navLinks.next
        }
      }
    }
  });
};

/**
 * Return page next & prev links
 *
 * @param {Object} req
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Number} pageSize
 *
 * @return {Object}
 */
const getNavLinks = (
  req: Object,
  currentPage: number,
  totalPages: number,
  pageSize: number
): Object => {
  const fullUrl = req.protocol + "://" + req.headers.host + req.originalUrl;

  const regex = /(.*?page=.*[0-9])|(.*?pagesize=.*[0-9])/g;

  const endUrl = fullUrl.match(regex) ? fullUrl.replace(regex, "") : "";

  let customUrl = fullUrl.replace(/(.?page=.*)|(.?pagesize=.*)/g, "");

  customUrl += customUrl.match(/(\?)/g) ? "" : "?";

  let page = currentPage;

  return {
    prev:
      currentPage <= 1
        ? ""
        : `${customUrl}&pagesize=${pageSize}&page=${--page}${endUrl}`,
    next:
      currentPage >= totalPages
        ? ""
        : `${customUrl}&pagesize=${pageSize}&page=${++page}${endUrl}`
  };
};
