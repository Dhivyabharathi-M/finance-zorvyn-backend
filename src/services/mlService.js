class MLService {
  static predictCategory(note) {
    const keywords = {
      food: ['food', 'restaurant', 'pizza', 'eat', 'meal', 'dinner', 'lunch'],
      transport: ['uber', 'taxi', 'bus', 'train', 'flight', 'travel', 'gas', 'car'],
      entertainment: ['movie', 'game', 'party', 'concert', 'theater'],
      shopping: ['shop', 'buy', 'purchase', 'clothes', 'grocery'],
      utilities: ['electricity', 'water', 'internet', 'phone', 'bill'],
      salary: ['salary', 'pay', 'wage', 'income']
    };

    const lowerNote = note.toLowerCase();
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerNote.includes(word))) {
        return category;
      }
    }
    return 'other';
  }
}

module.exports = MLService;