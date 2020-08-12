const {
  notAuthorized,
  invalidMethod,
  noDb,
  getSingle,
  getAll,
  createEntity,
  updateEntity,
  deleteEntity,
} = require('./utils');

exports.handler = async (event, context) => {
  if (!context.clientContext || !context.clientContext.user) return notAuthorized();
  let { dbName } = event.queryStringParameters;
  if (!dbName) return noDb();
  if (event.httpMethod === 'GET' && event.queryStringParameters.id) {
    return getSingle(dbName, event.queryStringParameters.id);
  } else if (event.httpMethod === 'GET') {
    return getAll(dbName);
  } else if (event.httpMethod === 'POST') {
    return createEntity(dbName, JSON.parse(event.body));
  } else if (event.httpMethod === 'PATCH') {
    return updateEntity(dbName, JSON.parse(event.body));
  } else if (event.httpMethod === 'DELETE' && event.queryStringParameters.id) {
    return deleteEntity(dbName, event.queryStringParameters.id);
  } else {
    return invalidMethod();
  }
};
