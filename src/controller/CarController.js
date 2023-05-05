const createCarService = require('../services/car/CreateCarService');
const getAnnouncement = require('../services/car/GetAnnouncementService');
const findAnnouncementByName = require('../services/car/FindAnnouncementByNameService');
const detailsService = require('../services/car/DetailsService');
const deleteAnnouncementService = require('../services/car/DeleteAnnouncementService');
const findStatusAvailableService = require('../services/car/FindStatusAvailableService');
const findStatusSoldService = require('../services/car/FindStatusSoldService');

module.exports = {
  async createCar (req, res) {
    try {
      const { car_name, car_brand, model, year, price, color, gearshift, motor, combustible, KM, accessories, description } = req.body;
      const { id } = req.enterprise;
      const { filename } = req.file;

      const accounts = await createCarService(
        {
          id,
          filename,
          car_name,
          car_brand,
          model,
          year,
          price,
          color,
          gearshift,
          motor,
          combustible,
          KM,
          accessories,
          description,
          owner_id: id,
          from_enterprise: id
        });
      return res.status(201).json(accounts);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message || 'Upload failed!'
      });
    }
  },
  async list (req, res) {
    try {
      const announcement = await getAnnouncement();
      return res.json(announcement);
    } catch (error) {
      return res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async getEnterprise (req, res) {
    const { company_name } = req.params;
    try {
      const company = await findAnnouncementByName(company_name);
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async details (req, res) {
    const { id } = req.params;
    try {
      const details = await detailsService(id);
      res.status(200).json(details);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async delete (req, res) {
    const { id } = req.params;
    const { role } = req.user;
    try {
      const deleteCar = await deleteAnnouncementService(id, role);
      res.status(200).json({
        deleteCar,
        message: 'Car deleted!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async findStatusAvailable (req, res) {
    const { status } = req.params;
    try {
      const availableStatus = await findStatusAvailableService(status);

      res.status(200).json(availableStatus);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },
  async findStatusSold (req, res) {
    const { status } = req.params;
    try {
      const statusSold = await findStatusSoldService(status);
      res.status(200).json(statusSold);
    } catch (error) {
      res.status(400).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  }
};
