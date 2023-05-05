const DocumentModel = require('../../database/model/DocumentModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async (filename, name, document_type, user_id) => {
  const userExists = await UserModel.findOne({
    _id: user_id
  });
  if (!userExists) throw new Error("User doesn't exists!");

  const documentExists = await DocumentModel.findOne({
    user_id
  });
  if (documentExists) throw new Error('Document already exists!');

  const document = await DocumentModel.create({
    filename,
    name,
    document_type,
    user_id
  });

  return document;
};
