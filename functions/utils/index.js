exports.notAuthorized = () => {
  return {
    statusCode: 403,
    body: 'Unauthorized.',
  };
};

exports.invalidMethod = () => {
  return {
    statusCode: 405,
    body: 'Method not allowed.',
  };
};
