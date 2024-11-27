function mean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
}

function median(nums) {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function mode(nums) {
  if (nums.length === 0) return 0;
  const freqMap = {};
  let maxFreq = 0;
  let mode = nums[0];

  nums.forEach(num => {
    freqMap[num] = (freqMap[num] || 0) + 1;
    if (freqMap[num] > maxFreq) {
      maxFreq = freqMap[num];
      mode = num;
    }
  });

  return mode;
}

module.exports = { mean, median, mode }; 