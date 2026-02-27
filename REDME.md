# Number Padding Consistency Checker

This project implements a TypeScript function that determines whether a sequence of numeric strings uses consistent left-zero padding.

---
## Problem Overview

Given a sequence of numeric strings, the function determines:

- If consistent left-zero padding exists (returns padding length > 1)
- If no padding was used (returns 1)
- If padding is inconsistent (returns -1)
- If padding is inconclusive (returns negative smallest observed length)
- If no values were provided (returns 0)
---

## Examples
```
[“001”, “002”]            → 3
[“001”, “002”, “9999”]    → 3
[“1”, “2”]                → 1
[“1”, “2”, “999”]         → 1
[“999”, “9999”]           → -3
[“99”, “999”, “9999”]     → -2
[“01”, “002”]             → -1
[]                        → 0
```

---
## How to Run

Project can be executed via 2 ways; running locally (without docker) and running with Docker

### 1. Running Locally

#### 1. Install dependencies
```
npm install
```
#### 2. Build the project
```
npm run build
```
#### 3. Run from CLI
```
node dist/index.js 001 002 9999
```
#### 4. How to Run Tests
```
npm test
```
---

### 2. Running with Docker

#### 1. Build image
```
docker build -t padding-checker .
```
#### 2. Run container
```
docker run –rm padding-checker 001 002 9999
```
---

## Implementation Details

- Written in TypeScript
- Strict type checking enabled
- O(n) time complexity
- CLI wrapper provided for direct execution
- The test suite includes - Deterministic unit tests