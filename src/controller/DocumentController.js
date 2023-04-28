const createDocumentService = require('../services/Document/CreateDocumentService');
const fs = require('fs');

module.exports = {
  async upload (req, res) {
    const { path } = req.file;
    try {
      const { name, document_type } = req.body;
      const { id } = req.user;
      const { filename } = req.file;

      const accounts = await createDocumentService(
        filename,
        name,
        document_type,
        id
      );

      return res.status(201).json(accounts);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message || 'Upload failed!'
      });
    } finally {
      fs.unlinkSync(path);
    }
  }
};
