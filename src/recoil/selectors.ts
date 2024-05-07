import { selector } from 'recoil';
import { recognizedWords, scrapedPhrase } from './states';

// selector
export const isAllMatched = selector({
  key: 'isAllMatched',
  get: ({ get }) => {
    const wordList = get(recognizedWords);
    let allMatched = true;
    wordList.forEach((v) => {
      if (v.isMatchedWithTranscription === false) allMatched = false;
    });
    return allMatched;
  },
});

export const scrapedSentences = selector({
  key: 'scrapedSentences',
  get: ({ get }) => {
    const phrases = get(scrapedPhrase);
    const sentences = new Map<number, number[][]>();
    phrases.forEach((v) => {
      const string = sentences.get(v.sentenceId) || [];
      string.push([v.startIndex, v.endIndex]);
      sentences.set(v.sentenceId, string);
    });
    return sentences;
  },
});
