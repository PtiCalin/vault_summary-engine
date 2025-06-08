import { wordCount, readingTime, extractKeywords } from '../src/utils';

describe('wordCount', () => {
  it('counts words separated by whitespace', () => {
    expect(wordCount('hello world')).toBe(2);
  });
});

describe('readingTime', () => {
  it('estimates minutes based on word count', () => {
    const text = Array(400).fill('word').join(' ');
    expect(readingTime(text)).toBe(2);
  });
});

describe('extractKeywords', () => {
  it('returns the most frequent long words', () => {
    const text = 'Apple banana apple banana orange apple';
    expect(extractKeywords(text, 2)).toEqual(['apple', 'banana']);
  });
});
