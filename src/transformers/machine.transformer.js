/**
 * HATEOAS LINKS
 *
 * @param {Object} req
 * @param {Object} machine
 *
 * @return {Array}
 */
function getHyperLinks(req, machine) {
  const baseUrl = req.protocol + '://' + req.headers.host;

  const links = [
    {
      'rel': `self`,
      'href': `${baseUrl}/api/machines/${machine._id}`
    },
    {
      'rel': `machine.type`,
      'method': "GET",
      'href': `${baseUrl}/api/types/${machine.product_type_id}`
    }
  ];

  return links;
}

/**
 * Defrag collection, get hyperLinks
 *
 * @param {Object} req
 * @param {Object} collection
 *
 * @return {Object}
 */
module.exports.hyperMediaAll = function hyperMedia(req, collection) {
  const hyperCollections = [];

  collection.forEach(function (item, index, array) {
    const hyperCollection = item.toJSON();

    hyperCollection.links = getHyperLinks(req, hyperCollection);

    hyperCollections.push(hyperCollection);
  });

  return hyperCollections;
}

/**
 * Defrag object, get hyperLinks
 *
 * @param {Object} req
 * @param {Object} object
 *
 * @return {Object}
 */
module.exports.hyperMediaOne = function hyperMedia(req, object) {
  const hyperObject = object.toJSON();
  hyperObject.links = getHyperLinks(req, hyperObject);

  return hyperObject;
}