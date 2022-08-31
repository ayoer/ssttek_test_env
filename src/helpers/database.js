import Log from 'models/Log';
import delay from 'delay';

/**
 *
 * @param { any } mongoose.Model
 * @param { any } reqUser
 * @param { any } data
 * @param { any } mongoose.session
 * @returns
 */
export const insertDocument = async (Model, reqUser, data, session) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;

  const sessionObj = {};
  if (session) {
    sessionObj.session = session;
  }

  const model = new Model(data);
  const result = await model.save(sessionObj);
  await Log.create(
    [
      {
        logId: result._id,
        tableName: Model.collection.collectionName,
        type: 'C',
        oldData: null,
        newData: result,
        //updatedPart: data,
        userId: reqUser?._id,
        userName: reqUser?.profile?.firstName + ' ' + reqUser?.profile?.lastName,
      },
    ],
    sessionObj
  );
  return result;
};

export const updateDocumentById = async (Model, reqUser, _id, data, session) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;
  data.modifiedAt = Date.now();
  // data.volume = ((data.width || 0) * (data.length || 0) * (data.height || 0)) / (1000 * 1000 * 1000);

  const sessionObj = {
    new: true,
  };
  if (session) {
    sessionObj.session = session;
  }

  const oldResult = await Model.findById(_id).lean();
  const result = await Model.findByIdAndUpdate(_id, data, sessionObj).lean();

  await Log.create(
    [
      {
        logId: result._id,
        tableName: Model.collection.collectionName,
        type: 'U',
        oldData: oldResult,
        newData: result,
        //updatedPart: data,
        userId: reqUser?._id,
        userName: reqUser?.profile?.firstName + ' ' + reqUser?.profile?.lastName,
      },
    ],
    sessionObj
  );

  return result;
};

export const updateDocumentOne = async (Model, reqUser, where, data, session) => {
  data.creatorUser = reqUser?._id;
  data.modifierUser = reqUser?._id;
  data.modifiedAt = Date.now();

  //   data.volume = ((data.width || 0) * (data.length || 0) * (data.height || 0)) / (1000 * 1000 * 1000);

  const sessionObj = {
    new: true,
  };
  if (session) {
    sessionObj.session = session;
  }

  const oldResult = await Model.findOne(where).lean();
  const result = await Model.findOneAndUpdate(where, data, sessionObj).lean();
  await Log.create(
    [
      {
        logId: result._id,
        tableName: Model.collection.collectionName,
        type: 'U',
        oldData: oldResult,
        newData: result,
        //updatedPart: data,
        userId: reqUser?._id,
        userName: reqUser?.profile?.firstName + ' ' + reqUser?.profile?.lastName,
      },
    ],
    sessionObj
  );

  return result;
};

export const deleteDocumentById = async (Model, reqUser, _id, session) => {
  const sessionObj = {};
  if (session) {
    sessionObj.session = session;
  }

  const oldResult = await Model.findById(_id).lean();
  const result = await Model.deleteOne({_id: _id}, sessionObj).lean();
  await Log.create(
    [
      {
        logId: result._id,
        tableName: Model.collection.collectionName,
        type: 'D',
        oldData: oldResult,
        newData: result,
        userId: reqUser?._id,
        userName: reqUser?.profile?.firstName + ' ' + reqUser?.profile?.lastName,
      },
    ],
    sessionObj
  );

  return result;
};

export const runWithSession = async (Model, job) => {
  const session = await Model.startSession();
  try {
    await session.startTransaction();
    await job(session);
    await session.commitTransaction();
  } catch (err) {
    while (true) {
      try {
        await session.abortTransaction();
        break;
      } catch (err) {
        await delay(5000);
      }
    }
    throw err;
  } finally {
    session.endSession();
  }
};
