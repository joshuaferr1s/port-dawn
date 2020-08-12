import netlifyIdentity from 'netlify-identity-widget';

const getToken = async () => {
  const currentUser = await netlifyIdentity.currentUser();
  return currentUser ? currentUser.jwt(true) : null;
};

const makeRequest = async (dbName, options) => {
  const searchParams = new URLSearchParams({ dbName });
  if (options && options.id) searchParams.append('id', options.id);
  let reqBody = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  };
  if (options) {
    if (options.method) reqBody.method = options.method;
    if (options.headers) reqBody.headers = {...options.headers, ...reqBody.headers};
    if (options.body) reqBody.body = JSON.stringify(options.body);
  }
  const res = await fetch(`/.netlify/functions/crud?${searchParams.toString()}`, reqBody);
  if (!res.ok) return { success: false, msg: await res.text() };
  return { success: true, data: await res.json() };
};

export const getAll = (dbName) => {
  return makeRequest(dbName);
};

export const getSingle = (dbName, id) => {
  return makeRequest(dbName, { id });
};

export const createEntity = (dbName, newEntity) => {
  return makeRequest(dbName, {
    method: 'POST',
    body: newEntity,
  });
};

export const updateEntity = (dbName, updatedEntity) => {
  return makeRequest(dbName, {
    method: 'PATCH',
    body: updatedEntity,
  });
};

export const deleteEntity = (dbName, id) => {
  return makeRequest(dbName, {
    method: 'DELETE',
    id,
  });
};

// const makeRequest = async (path, method = 'GET', body = {}) => {
//   const reqBody = {
//     method,
//     headers: {
//       Authorization: `Bearer ${await getToken()}`,
//     },
//     body: JSON.stringify(body),
//   };
//   if (Object.keys(body).length === 0) delete reqBody.body;
//   const res = await fetch(`/.netlify/functions/${path}`, reqBody);
//   if (!res.ok) return { success: false, msg: await res.text() };
//   return { success: true, data: await res.json() };
// };

// export const getPartyMembers = async () => {
//   return makeRequest('party');
// };

// export const getPartyMember = async (id) => {
//   return makeRequest(`party?id=${id}`);
// };

// export const createPartyMember = async (newMember) => {
//   return makeRequest('party', 'POST', newMember);
// };

// export const updatePartyMember = async (updateData) => {
//   return makeRequest('party', 'PATCH', updateData);
// };

// export const deletePartyMember = async (id) => {
//   return makeRequest(`party?id=${id}`, 'DELETE');
// };
