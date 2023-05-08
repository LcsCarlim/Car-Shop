const createDocumentService = require('../../services/document/CreateDocumentService');
const fs = require('fs');

module.exports = {
  async createDocument (req, res) {
    const { path } = req.file;
    try {
      const { name, document_type } = req.body;
      const { id } = req.user;
      const { filename } = req.file;

      const document = await createDocumentService(filename, document_type, name, id);
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
