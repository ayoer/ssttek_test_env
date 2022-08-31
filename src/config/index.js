module.exports.initModules = ['environment', 'asyncWrapper', 'database', 'listen'];
module.exports.middlewareModules = ['express', 'routes', 'cors', 'error'];

module.exports.apiRoutes = ['vendor', 'country'];

module.exports.env = process.env;
