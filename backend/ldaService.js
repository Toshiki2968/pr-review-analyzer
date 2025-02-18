import {lda} from 'lda';

// 例：複数のコメント
const comments = [
  "The code has a bug when handling user input.",
  "This function is too complex, it should be refactored.",
  "We need to improve performance by optimizing database queries.",
  "Please add more unit tests to cover edge cases."
];

// LDAモデルを使ってトピックを抽出
const topics = lda(comments, 3, 5);  // 3つのトピック、各トピックに関連する5つの単語
console.log(topics);
