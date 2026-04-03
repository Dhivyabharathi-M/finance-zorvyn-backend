const SummaryService = require('../services/summaryService');

const getSummary = (req, res) => {
  SummaryService.getSummary(req.user.id, (err, summary) => {
    if (err) return res.status(500).json({ error: 'Error fetching summary' });
    res.json(summary);
  });
};

module.exports = { getSummary };