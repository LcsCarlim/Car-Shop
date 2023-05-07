const createDocumentService = require('../../services/document/CreateDocumentService');
const fs = require('fs');

module.exports = {
  async createDocument (req, res) {
    const { path } = req.file;
    try {
      const { user_id } = req.user;
      const { name, document_type } = req.body;
      const { filename } = req.file;

      const document = await createDocumentService(user_id, name, document_type, filename);
      return res.status(201).json(document);
    } catch (error) {
      return res.status(400).json({
        error: 'Something wrong happened, try again!',
        message: error.message || 'Upload failed'
      });
    } finally {
      fs.unlinkSync(path);
    }
  }
};
