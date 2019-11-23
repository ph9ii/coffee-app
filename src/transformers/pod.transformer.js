/**
 * HATEOAS LINKS
 *
 * @param {Object} req
 * @param {Object} pod
 *
 * @return {Array}
 */
function getHyperLinks(req, pod) {
  const baseUrl = req.protocol + '://' + req.headers.host;

  const links = [
    {
      'rel': `self`,
      'href': `${baseUrl}/api/pods/${pod._id}`
    },
    {
      'rel': `pod.type`,
      'method': "GET",
      'href': `${baseUrl}/api/types/${pod.product_type_id}`
    },
    {
      'rel': `pod.flavor`,
      'method': "GET",
      'href': `${baseUrl}/api/flavors/${pod.coffee_flavor_id}`
    },
    {
      'rel': `pod.size`,
      'method': "GET",
      'href': `${baseUrl}/api/sizes/${pod.pack_size_id}`
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