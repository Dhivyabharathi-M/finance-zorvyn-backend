const RecordService = require('../services/recordService');
const { validateRecord } = require('../utils/validators');

const createRecord = (req, res) => {
  const errors = validateRecord(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  RecordService.createRecord(req.body, req.user.id, (err, record) => {
    if (err) return res.status(500).json({ error: 'Error creating record' });
    res.status(201).json(record);
  });
};

const getRecords = (req, res) => {
  const filters = {};
  if (req.query.type) filters.type = req.query.type;
  if (req.query.category) filters.category = req.query.category;
  if (req.query.startDate && req.query.endDate) {
    filters.startDate = req.query.startDate;
    filters.endDate = req.query.endDate;
  }

  RecordService.getRecords(req.user.id, filters, (err, records) => {
    if (err) return res.status(500).json({ error: 'Error fetching records' });
    res.json(records);
  });
};

const updateRecord = (req, res) => {
  const errors = validateRecord(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { id } = req.params;
  RecordService.updateRecord(id, req.body, req.user.id, (err) => {
    if (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Error updating record' });
    }
    res.json({ message: 'Record updated successfully' });
  });
};

const deleteRecord = (req, res) => {
  const { id } = req.params;
  RecordService.deleteRecord(id, req.user.id, (err) => {
    if (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Error deleting record' });
    }
    res.json({ message: 'Record deleted successfully' });
  });
};

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };