const faunadb = require('faunadb');

const q = faunadb.query

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

exports.noDb = () => {
  return {
    statusCode: 400,
    body: 'DB name must be sent.',
  };
};

exports.getSingle = async (dbName, id) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
    });
    const response = await client.query(q.Get(q.Ref(q.Collection(dbName), id)));
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

exports.getAll = async (dbName) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
    });
    const response = await client.query(q.Map(
      q.Paginate(q.Match(q.Ref(`indexes/all_${dbName}`))),
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

exports.createEntity = async (dbName, data) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
    });
    const response = await client.query(
      q.Create(q.Collection(dbName), { data })
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

exports.updateEntity = async (dbName, data) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
    });
    const id = data.id;
    delete data.id;
    const response = await client.query(
      q.Update(q.Ref(q.Collection(dbName), id), { data: data })
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

exports.deleteEntity = async (dbName, id) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
    });
    const response = await client.query(
      q.Delete(q.Ref(q.Collection(dbName), id))
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
