const expenses = {
  "2023-01": {
    "01": {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    "09": {
      food: [11.9],
      fuel: [190.22],
    },
  },
  "2023-03": {
    "07": {
      food: [20, 11.9, 30.2, 11.9],
    },
    "04": {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  "2023-04": {},
};

// Function to calculate the median of an array
function calculateMedian(arr) {
  if (arr.length === 0) return null;
  const sorted = arr.sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[half]
    : (sorted[half - 1] + sorted[half]) / 2;
}

// Helper function to get the first Sunday of the month
function getFirstSundayOfMonth(month) {
  const firstDay = new Date(`${month}-01`);
  const dayToSunday = (7 - firstDay.getDay()) % 7;
  const firstSunday = new Date(firstDay);
  firstSunday.setDate(firstDay.getDate() + dayToSunday);
  return firstSunday;
}

// Non-optimized solution (solution1)
function solution1(expenses) {
  const result = {};

  for (const month in expenses) {
    const firstSunday = getFirstSundayOfMonth(month);

    const days = Array.from({ length: firstSunday.getDate() }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );

    let totalExpenses = [];
    for (const day of days) {
      if (expenses[month][day]) {
        for (const category in expenses[month][day]) {
          totalExpenses = totalExpenses.concat(expenses[month][day][category]);
        }
      }
    }

    result[month] = calculateMedian(totalExpenses) || 0;
  }

  return result;
}

// Optimized solution (solution2)
/**
 * In this solution, we use two heaps (max heap for the lower half of the data,
 * min heap for the higher half) to maintain an efficient median calculation.
 *
 * The primary goal is to calculate the median without fully sorting the array,
 * achieving better performance for large data sets.
 *
 * **Advantages:**
 * - **Efficiency:** By maintaining two heaps, we are able to keep track of the median in O(log n) time
 *   each time we add an element. This is much more efficient than sorting the array completely
 *   (O(n log n)).
 * - **Memory Efficiency:** The heaps store only part of the array at a time, so we do not need to
 *   maintain a full sorted list of the entire dataset.
 *
 * **Disadvantages:**
 * - **Complexity:** Managing two heaps and balancing them requires a more complex implementation.
 * - **Insertion overhead:** While each insertion takes O(log n), balancing heaps introduces some overhead.
 */
class MedianHeap {
  constructor() {
    this.lower = []; // Max heap
    this.higher = []; // Min heap
  }

  add(num) {
    if (this.lower.length === 0 || num <= -this.lower[0]) {
      this.lower.push(-num);
      this.lower.sort((a, b) => a - b);
    } else {
      this.higher.push(num);
      this.higher.sort((a, b) => a - b);
    }

    // Balancing heaps
    if (this.lower.length > this.higher.length + 1) {
      this.higher.push(-this.lower.shift());
      this.higher.sort((a, b) => a - b);
    } else if (this.higher.length > this.lower.length) {
      this.lower.push(-this.higher.shift());
      this.lower.sort((a, b) => a - b);
    }
  }

  getMedian() {
    if (this.lower.length === this.higher.length) {
      return (-this.lower[0] + this.higher[0]) / 2;
    }
    return -this.lower[0];
  }
}

function solution2(expenses) {
  const result = {};

  for (const month in expenses) {
    const firstSunday = getFirstSundayOfMonth(month);
    const days = Array.from({ length: firstSunday.getDate() }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );

    const medianHeap = new MedianHeap();
    for (const day of days) {
      if (expenses[month][day]) {
        for (const category in expenses[month][day]) {
          for (const value of expenses[month][day][category]) {
            medianHeap.add(value);
          }
        }
      }
    }

    result[month] =
      medianHeap.lower.length + medianHeap.higher.length > 0
        ? medianHeap.getMedian()
        : 0;
  }

  return result;
}

// Output results without optimized solution
console.time("Solution 1 Time");
console.log("Solution 1:", solution1(expenses));
console.timeEnd("Solution 1 Time");

// Measuring the execution time of the second function with optimized solution
console.time("Solution 2 Time");
console.log("Solution 2:", solution2(expenses));
console.timeEnd("Solution 2 Time");
