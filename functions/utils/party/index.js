const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.getAllPartyMembers = async () => {
  try {
    const response = await client.query(q.Map(
      q.Paginate(q.Match(q.Ref("indexes/all_party"))),
      q.Lambda(x => q.Get(x))
    ));
    const returnData = response.data.map(member => ({
      id: member.ref.value.id,
      data: member.data,
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(returnData),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};

exports.getAPartyMember = async (id) => {
  try {
    const response = await client.query(q.Get(q.Ref(q.Collection('party'), id)));
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.ref.value.id,
        data: response.data,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};

exports.createAPartyMember = async (data) => {
  try {
    const response = await client.query(
      q.Create(q.Collection('party'), { data })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.ref.value.id,
        data: response.data,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};

exports.updateAPartyMember = async (data) => {
  try {
    const id = data.id;
    delete data.id;
    const response = await client.query(
      q.Update(q.Ref(q.Collection('party'), id), { data: data })
    )
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.ref.value.id,
        data: response.data,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};

exports.deleteAPartyMember = async (id) => {
  try {
    const response = await client.query(
      q.Delete(q.Ref(q.Collection('party'), id))
    )
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.ref.value.id,
        data: response.data,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};
