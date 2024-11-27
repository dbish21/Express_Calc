const { mean, median, mode } = require('../utils/stats');

describe('Statistical Functions', () => {
  describe('mean', () => {
    test('calculates the mean of an array', () => {
      expect(mean([1, 3, 5, 7])).toBe(4);
      expect(mean([2, 4, 6])).toBe(4);
      expect(mean([])).toBe(0);
    });
  });

  describe('median', () => {
    test('calculates the median of an odd-length array', () => {
      expect(median([1, 3, 5])).toBe(3);
    });

    test('calculates the median of an even-length array', () => {
      expect(median([1, 3, 5, 7])).toBe(4);
    });

    test('handles empty array', () => {
      expect(median([])).toBe(0);
    });
  });

  describe('mode', () => {
    test('finds the mode of an array', () => {
      expect(mode([1, 2, 2, 3])).toBe(2);
      expect(mode([1, 1, 2, 2])).toBe(1);
      expect(mode([])).toBe(0);
    });
  });
}); 