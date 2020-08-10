const { notAuthorized, invalidMethod } = require('./utils');
const party = require('./utils/party');

exports.handler = async (event, context) => {
  if (!context.clientContext || !context.clientContext.user) return notAuthorized();
  if (event.httpMethod === 'GET' && event.queryStringParameters.id) {
    return party['getAPartyMember'](event.queryStringParameters.id);
  } else if (event.httpMethod === 'GET') {
    return party['getAllPartyMembers']();
  } else if (event.httpMethod === 'POST') {
    return party['createAPartyMember'](JSON.parse(event.body));
  } else if (event.httpMethod === 'PATCH') {
    return party['updateAPartyMember'](JSON.parse(event.body));
  } else if (event.httpMethod === 'DELETE' && event.queryStringParameters.id) {
    return party['deleteAPartyMember'](event.queryStringParameters.id);
  } else {
    return invalidMethod();
  }
};
