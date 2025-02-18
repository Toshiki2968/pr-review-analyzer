const natural = require('natural');

const categories = {
  'スタイル': ['インデント', 'スペース', 'フォーマット'],
  '命名規則': ['名前', 'ネーミング', '変数名'],
  'パフォーマンス': ['パフォーマンス', '最適化', '効率'],
};

function classifyComments(comments) {
  const classifier = {};

  for (const comment of comments) {
    let matchedCategory = 'その他';

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => comment.includes(keyword))) {
        matchedCategory = category;
        break;
      }
    }

    classifier[matchedCategory] = (classifier[matchedCategory] || 0) + 1;
  }
  return classifier;
}

module.exports = { classifyComments };
