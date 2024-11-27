const express = require('express');
const fs = require('fs').promises;
const { mean, median, mode } = require('./utils/stats');

const app = express();

// Middleware to parse and validate numbers
const parseNumbers = (req, res, next) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const nums = req.query.nums.split(',');
  const parsedNums = [];

  for (let num of nums) {
    const parsed = Number(num);
    if (isNaN(parsed)) {
      return res.status(400).json({ error: `${num} is not a number` });
    }
    parsedNums.push(parsed);
  }

  req.nums = parsedNums;
  next();
};

// Optional save middleware
const saveResults = async (req, res, next) => {
  if (req.query.save === 'true') {
    const result = res.locals.result;
    const timestamp = new Date().toISOString();
    const data = { ...result, timestamp };
    
    try {
      await fs.appendFile('results.json', JSON.stringify(data) + '\n');
    } catch (err) {
      console.error('Error saving results:', err);
    }
  }
  next();
};

app.get('/mean', parseNumbers, (req, res, next) => {
  res.locals.result = {
    operation: 'mean',
    value: mean(req.nums)
  };
  next();
}, saveResults, (req, res) => {
  res.json(res.locals.result);
});

app.get('/median', parseNumbers, (req, res, next) => {
  res.locals.result = {
    operation: 'median',
    value: median(req.nums)
  };
  next();
}, saveResults, (req, res) => {
  res.json(res.locals.result);
});

app.get('/mode', parseNumbers, (req, res, next) => {
  res.locals.result = {
    operation: 'mode',
    value: mode(req.nums)
  };
  next();
}, saveResults, (req, res) => {
  res.json(res.locals.result);
});

app.get('/all', parseNumbers, (req, res, next) => {
  res.locals.result = {
    operation: 'all',
    mean: mean(req.nums),
    median: median(req.nums),
    mode: mode(req.nums)
  };
  next();
}, saveResults, (req, res) => {
  res.json(res.locals.result);
});

module.exports = app;