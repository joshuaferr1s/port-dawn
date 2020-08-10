import netlifyIdentity from 'netlify-identity-widget';

const getToken = async () => {
  const currentUser = await netlifyIdentity.currentUser();
  return currentUser ? currentUser.jwt(true) : null;
};

const makeRequest = async (path, method = 'GET', body = {}) => {
  const reqBody = {
    method,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify(body),
  };
  if (Object.keys(body).length === 0) delete reqBody.body;
  const res = await fetch(`/.netlify/functions/${path}`, reqBody);
  if (!res.ok) return { success: false, msg: await res.text() };
  return { success: true, data: await res.json() };
};

export const getPartyMembers = async () => {
  return makeRequest('party');
};

export const getPartyMember = async (id) => {
  return makeRequest(`party?id=${id}`);
};

export const createPartyMember = async (newMember) => {
  return makeRequest('party', 'POST', newMember);
};

export const updatePartyMember = async (updateData) => {
  return makeRequest('party', 'PATCH', updateData);
};

export const deletePartyMember = async (id) => {
  return makeRequest(`party?id=${id}`, 'DELETE');
};
