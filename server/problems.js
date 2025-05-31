const PROBLEMS = [
  {
    problemId: "P006",
    title: "Two Sum",
    problem: "You are given an array of integers `nums` and an integer `target`. Your task is to return the indices of the two numbers such that they add up to the `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n### Example:\nIf `nums = [2, 7, 11, 15]` and `target = 9`, then `nums[0] + nums[1] == 9`, so you should return `[0, 1]`.\n\n### Input Format:\n- The first line contains an integer `n` (the length of the array).\n- The second line contains `n` integers (the elements of the array).\n- The third line contains a single integer `target`.\n\n### Output Format:\n- Print two space-separated indices (0-based) of the two numbers that sum up to the target.\n\n### Constraints:\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Exactly one solution exists for each test case.",
    constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9, exactly one solution exists",
    sampleInputs: [
      "4\n2 7 11 15\n9",
      "3\n3 2 4\n6",
      "2\n3 3\n6"
    ],
    sampleOutputs: [
      "0 1",
      "1 2",
      "0 1"
    ],
    hiddenInputs: [
      "5\n10 5 -2 7 3\n5",
      "6\n8 6 1 5 4 2\n10",
      "4\n-3 4 3 90\n0",
      "10\n0 4 3 0 7 2 1 9 5 6\n11"
    ],
    hiddenOutputs: [
      "1 2",
      "1 5",
      "0 2",
      "3 7"
    ]
  },
  {
    problemId: "P007",
    title: "Palindrome Number",
    problem: "Given an integer `x`, return `true` if `x` is a palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward. For example, 121 is a palindrome while 123 is not.\n\n### Input Format:\n- A single integer `x`.\n\n### Output Format:\n- Print `true` if the number is a palindrome, else print `false`.\n\n### Constraints:\n- -2^31 <= x <= 2^31 - 1",
    constraints: "-2^31 <= x <= 2^31 - 1",
    sampleInputs: [
      "121",
      "-121",
      "10",
      "0"
    ],
    sampleOutputs: [
      "true",
      "false",
      "false",
      "true"
    ],
    hiddenInputs: [
      "1221",
      "1234321",
      "-101"
    ],
    hiddenOutputs: [
      "true",
      "true",
      "false"
    ]
  },
  {
    problemId: "P008",
    title: "Merge Sorted Arrays",
    problem: "Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array. The final array should also be sorted in non-decreasing order.\n\n`nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to 0 and should be ignored. `nums2` has a length of `n`.\n\n### Input Format:\n- First line: Two integers `m` and `n`.\n- Second line: `m + n` integers for `nums1`.\n- Third line: `n` integers for `nums2`.\n\n### Output Format:\n- Print the merged array as space-separated integers.\n\n### Constraints:\n- 0 <= m, n <= 10^4\n- -10^9 <= nums1[i], nums2[i] <= 10^9\n- nums1 and nums2 are sorted in non-decreasing order",
    constraints: "0 <= m, n <= 10^4, elements are sorted, -10^9 <= value <= 10^9",
    sampleInputs: [
      "3 3\n1 2 3 0 0 0\n2 5 6",
      "2 1\n1 2 0\n3"
    ],
    sampleOutputs: [
      "1 2 2 3 5 6",
      "1 2 3"
    ],
    hiddenInputs: [
      "4 2\n0 2 4 5 0 0\n1 3",
      "1 2\n4 0 0\n2 3"
    ],
    hiddenOutputs: [
      "0 1 2 3 4 5",
      "2 3 4"
    ]
  },
  {
    problemId: "P009",
    title: "Remove Duplicates from Sorted Array",
    problem: "Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once and return the new length.\n\nDo not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.\n\n### Input Format:\n- First line: an integer `n`.\n- Second line: `n` space-separated integers representing the sorted array.\n\n### Output Format:\n- Print the new length followed by the modified array up to that length.\n\n### Constraints:\n- 1 <= n <= 3 * 10^4\n- -100 <= nums[i] <= 100\n- `nums` is sorted in non-decreasing order.",
    constraints: "1 <= n <= 3*10^4, -100 <= nums[i] <= 100, sorted input",
    sampleInputs: [
      "5\n1 1 2 2 3",
      "3\n1 2 2"
    ],
    sampleOutputs: [
      "3\n1 2 3",
      "2\n1 2"
    ],
    hiddenInputs: [
      "7\n0 0 1 1 1 2 3",
      "6\n1 1 1 1 1 1"
    ],
    hiddenOutputs: [
      "4\n0 1 2 3",
      "1\n1"
    ]
  }
];

module.exports = { PROBLEMS };
