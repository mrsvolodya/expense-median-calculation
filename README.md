# Expense Median Calculation

This project provides two solutions to calculate the median of expenses for each month. The first solution is a straightforward approach that sorts the entire array of expenses for the month and then calculates the median. The second solution is optimized by using a heap (priority queue) for more efficient median calculation without fully sorting the data. This is ideal for large datasets.

## Task Description

You are tasked with calculating the median of expenses for a given set of data. The data consists of expenses for different categories (e.g., food, fuel) recorded for specific days within each month.

The median should be calculated based on all the expenses within the month up to the first Sunday of the month. The median is a statistical value that represents the middle value of a sorted dataset. If the dataset has an even number of values, the median is the average of the two middle values.

### Steps:

1. Retrieve expenses for each day in the month up to the first Sunday.
2. Combine the expenses from different categories (e.g., food, fuel) into one list for each day.
3. Calculate the median of the combined list for the entire month.

## Solutions

### Solution 1: Simple Sorting Approach

In this approach, all expenses for the given month are gathered into a single array. The array is then sorted, and the median is calculated from the sorted array.

- **Time Complexity:** O(n log n), where `n` is the number of expenses up to the first Sunday.
- **Space Complexity:** O(n), for storing the expenses in an array.

#### Pros:

- Simple to implement and understand.
- Works well for smaller datasets.

#### Cons:

- Sorting the entire array has a higher time complexity, making it slower for large datasets.

### Solution 2: Optimized Approach Using Heaps

This solution uses two heaps: a max-heap and a min-heap. As expenses are added, they are pushed into the appropriate heap, and the heaps are balanced to maintain the median in the middle.

- **Time Complexity:** O(n log k), where `k` is the number of expenses up to the first Sunday. The heaps allow for efficient extraction of the median in O(log n) time.
- **Space Complexity:** O(n), since we store elements in two heaps.

#### Pros:

- More efficient for larger datasets as it avoids sorting the entire array.
- Provides faster median extraction compared to the sorting approach.

#### Cons:

- More complex to implement than the sorting method.
- Requires maintaining two heaps and balancing them, which introduces some overhead.

## Example Input

```javascript
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
```

# Solution 1: { '2023-01': 20.555, '2023-03': 10.2, '2023-04': 0 } Solution 1 Time: 7.708ms

# Solution 2: { '2023-01': 20.555, '2023-03': 10.2, '2023-04': 0 } Solution 2 Time: 0.642ms
