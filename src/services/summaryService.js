const Record = require('../models/recordModel');

class SummaryService {
  static getSummary(userId, callback) {
    Record.getAllForUser(userId, (err, records) => {
      if (err) return callback(err);

      let totalIncome = 0;
      let totalExpense = 0;
      const categoryBreakdown = {};

      records.forEach(record => {
        if (record.type === 'income') {
          totalIncome += record.amount;
        } else if (record.type === 'expense') {
          totalExpense += record.amount;
        }

        if (!categoryBreakdown[record.category]) {
          categoryBreakdown[record.category] = 0;
        }
        categoryBreakdown[record.category] += record.amount;
      });

      const netBalance = totalIncome - totalExpense;

      const recentActivity = records.slice(0, 5).map(r => ({
        id: r.id,
        amount: r.amount,
        type: r.type,
        category: r.category,
        date: r.date,
        note: r.note
      }));

      callback(null, {
        total_income: totalIncome,
        total_expense: totalExpense,
        net_balance: netBalance,
        category_breakdown: categoryBreakdown,
        recent_activity: recentActivity
      });
    });
  }
}

module.exports = SummaryService;