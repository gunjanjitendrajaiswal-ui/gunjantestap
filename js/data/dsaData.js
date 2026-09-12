// Comprehensive Dedicated DSA Sheet Dataset for CareerForge
// Curated by Topic, Difficulty, and Target Companies

export const dsaTopics = [
  {
    id: "arrays-hashing",
    title: "1. Arrays & Hashing",
    icon: "layers",
    description: "Foundational data structure for indexing, hash maps, frequency counting, and prefix sums.",
    problems: [
      {
        id: "dsa-1",
        title: "Two Sum",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Microsoft", "Meta"],
        link: "https://leetcode.com/problems/two-sum/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Store seen numbers in a Hash Map mapping value -> index. Check if target - num exists in O(1)."
      },
      {
        id: "dsa-2",
        title: "Contains Duplicate",
        difficulty: "Easy",
        companies: ["Apple", "Amazon", "Adobe"],
        link: "https://leetcode.com/problems/contains-duplicate/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Use a HashSet to detect duplicate values in a single pass."
      },
      {
        id: "dsa-3",
        title: "Group Anagrams",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Uber", "Goldman Sachs"],
        link: "https://leetcode.com/problems/group-anagrams/",
        optimalComplexity: "O(N * K log K) Time, O(N * K) Space",
        hint: "Use sorted string or 26-element character frequency tuple as the hash map key."
      },
      {
        id: "dsa-4",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google"],
        link: "https://leetcode.com/problems/top-k-frequent-elements/",
        optimalComplexity: "O(N) Time, O(N) Space via Bucket Sort",
        hint: "Count frequencies in a map, then use Bucket Sort where array index represents frequency count."
      },
      {
        id: "dsa-5",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        companies: ["Amazon", "Apple", "Microsoft", "Asana"],
        link: "https://leetcode.com/problems/product-of-array-except-self/",
        optimalComplexity: "O(N) Time, O(1) Extra Space",
        hint: "Two passes: compute prefix products in output array left-to-right, then suffix product right-to-left."
      },
      {
        id: "dsa-6",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        companies: ["Google", "Spotify", "Amazon"],
        link: "https://leetcode.com/problems/longest-consecutive-sequence/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Insert all numbers into a HashSet. Only start counting sequence if (num - 1) is NOT in the set."
      },
      {
        id: "dsa-7",
        title: "First Missing Positive",
        difficulty: "Hard",
        companies: ["Amazon", "Microsoft", "Meta"],
        link: "https://leetcode.com/problems/first-missing-positive/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Place each number x in its correct index (x - 1) using cycle sort swap logic."
      }
    ]
  },
  {
    id: "two-pointers",
    title: "2. Two Pointers & Sliding Window",
    icon: "move-horizontal",
    description: "Crucial patterns for linear sequence optimization, substrings, and sorted searches.",
    problems: [
      {
        id: "dsa-8",
        title: "Valid Palindrome",
        difficulty: "Easy",
        companies: ["Meta", "Microsoft", "Amazon"],
        link: "https://leetcode.com/problems/valid-palindrome/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Left and right pointers moving inwards, skipping non-alphanumeric characters."
      },
      {
        id: "dsa-9",
        title: "3Sum",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Apple", "Adobe"],
        link: "https://leetcode.com/problems/3sum/",
        optimalComplexity: "O(N^2) Time, O(1) Extra Space",
        hint: "Sort the array. Fix first element, then run classic Two Sum II two-pointer approach on remaining subarray."
      },
      {
        id: "dsa-10",
        title: "Container With Most Water",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Goldman Sachs"],
        link: "https://leetcode.com/problems/container-with-most-water/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Two pointers at boundaries. Always advance the pointer pointing to the shorter vertical line."
      },
      {
        id: "dsa-11",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        companies: ["Amazon", "Microsoft", "Uber", "Citadel"],
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Track minimum price seen so far and maximum difference (profit) achievable on each day."
      },
      {
        id: "dsa-12",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Bloomberg", "Adobe"],
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        optimalComplexity: "O(N) Time, O(min(m, n)) Space",
        hint: "Sliding window with a hash map of char -> latest index seen. Shrink left pointer when duplicate seen."
      },
      {
        id: "dsa-13",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        companies: ["Meta", "Amazon", "Google", "LinkedIn"],
        link: "https://leetcode.com/problems/minimum-window-substring/",
        optimalComplexity: "O(N + M) Time, O(K) Space",
        hint: "Maintain character count match counter. Expand right until all chars satisfied, then shrink left to minimize."
      },
      {
        id: "dsa-14",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
        link: "https://leetcode.com/problems/trapping-rain-water/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Two pointers keeping track of maxLeft and maxRight boundaries simultaneously."
      }
    ]
  },
  {
    id: "stacks-queues",
    title: "3. Stacks & Queues",
    icon: "layers-3",
    description: "LIFO and FIFO data structures, monotonic stacks, and sliding window buffers.",
    problems: [
      {
        id: "dsa-15",
        title: "Valid Parentheses",
        difficulty: "Easy",
        companies: ["Amazon", "Google", "Microsoft", "Meta"],
        link: "https://leetcode.com/problems/valid-parentheses/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Push expected closing brackets onto stack when opening bracket is seen; verify stack top on match."
      },
      {
        id: "dsa-16",
        title: "Min Stack",
        difficulty: "Medium",
        companies: ["Bloomberg", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/min-stack/",
        optimalComplexity: "O(1) All Ops, O(N) Space",
        hint: "Use an auxiliary min-stack or store pairs of (val, currentMin) on each push."
      },
      {
        id: "dsa-17",
        title: "Daily Temperatures",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google"],
        link: "https://leetcode.com/problems/daily-temperatures/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Monotonic decreasing stack storing indices. Pop when current temperature exceeds stack top."
      },
      {
        id: "dsa-18",
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        companies: ["LinkedIn", "Amazon"],
        link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Push operands onto stack. When operator encountered, pop two operands, evaluate, push result back."
      },
      {
        id: "dsa-19",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Monotonic increasing stack storing indices of heights. Calculate max area when taller bar ends."
      },
      {
        id: "dsa-20",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Citadel"],
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        optimalComplexity: "O(N) Time, O(K) Space",
        hint: "Monotonic decreasing Deque storing indices. Elements outside current window are popped from front."
      }
    ]
  },
  {
    id: "linked-lists",
    title: "4. Linked Lists",
    icon: "git-commit",
    description: "Node-pointer manipulations, cycle detection, reordering, and merges.",
    problems: [
      {
        id: "dsa-21",
        title: "Reverse Linked List",
        difficulty: "Easy",
        companies: ["Amazon", "Microsoft", "Apple", "Google"],
        link: "https://leetcode.com/problems/reverse-linked-list/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Iterative 3-pointer technique: prev, curr, next. Point curr.next to prev, step forward."
      },
      {
        id: "dsa-22",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        companies: ["Amazon", "Microsoft", "Meta"],
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        optimalComplexity: "O(N + M) Time, O(1) Space",
        hint: "Use a dummy head node. Iteratively compare current heads and stitch the smaller node to tail."
      },
      {
        id: "dsa-23",
        title: "Linked List Cycle & Start Node",
        difficulty: "Medium",
        companies: ["Microsoft", "Amazon", "Goldman Sachs"],
        link: "https://leetcode.com/problems/linked-list-cycle-ii/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Floyd's Tortoise & Hare: after fast and slow meet, reset slow to head; move both 1 step at a time."
      },
      {
        id: "dsa-24",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        companies: ["Meta", "Google", "Amazon"],
        link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Advance fast pointer by N + 1 steps ahead of slow from a dummy node. Then advance both together."
      },
      {
        id: "dsa-25",
        title: "LRU Cache",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Microsoft", "Meta", "Salesforce"],
        link: "https://leetcode.com/problems/lru-cache/",
        optimalComplexity: "O(1) Get & Put, O(Capacity) Space",
        hint: "Hash Map for O(1) lookup coupled with a Doubly Linked List for O(1) node removal and insertion."
      },
      {
        id: "dsa-26",
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        companies: ["Meta", "Amazon", "Google", "Apple"],
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        optimalComplexity: "O(N log K) Time, O(K) Space",
        hint: "Use a Min-Heap of size K containing the current node of each list, or divide-and-conquer pair merges."
      }
    ]
  },
  {
    id: "binary-search",
    title: "5. Binary Search",
    icon: "search",
    description: "Logarithmic time search space reduction, sorted arrays, and monotonic predicate functions.",
    problems: [
      {
        id: "dsa-27",
        title: "Binary Search",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/binary-search/",
        optimalComplexity: "O(log N) Time, O(1) Space",
        hint: "Standard low + (high - low) / 2 to avoid integer overflow."
      },
      {
        id: "dsa-28",
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Adobe"],
        link: "https://leetcode.com/problems/search-a-2d-matrix/",
        optimalComplexity: "O(log(M * N)) Time, O(1) Space",
        hint: "Treat m x n matrix as a 1D virtual sorted array using index / cols and index % cols mapping."
      },
      {
        id: "dsa-29",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Google", "LinkedIn"],
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        optimalComplexity: "O(log N) Time, O(1) Space",
        hint: "Determine which half (left or right) is normally sorted, then check if target falls in that range."
      },
      {
        id: "dsa-30",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        companies: ["Microsoft", "Amazon", "Goldman Sachs"],
        link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        optimalComplexity: "O(log N) Time, O(1) Space",
        hint: "Compare mid with high. If nums[mid] > nums[high], inflection point lies to the right."
      },
      {
        id: "dsa-31",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        companies: ["Google", "Airbnb"],
        link: "https://leetcode.com/problems/koko-eating-bananas/",
        optimalComplexity: "O(N log(max(P))) Time, O(1) Space",
        hint: "Binary search on answers: search space [1, max(piles)] with helper function canEatInTime(speed)."
      },
      {
        id: "dsa-32",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        optimalComplexity: "O(log(min(M, N))) Time, O(1) Space",
        hint: "Binary search on the partition cut of the smaller array so left partition has half of total elements."
      }
    ]
  },
  {
    id: "trees-bst",
    title: "6. Trees & Binary Search Trees",
    icon: "git-branch",
    description: "Hierarchical data structures, DFS/BFS traversals, LCA, and BST properties.",
    problems: [
      {
        id: "dsa-33",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Apple"],
        link: "https://leetcode.com/problems/invert-binary-tree/",
        optimalComplexity: "O(N) Time, O(H) Space",
        hint: "Recursive post-order or pre-order swap: swap root.left and root.right, then recurse down."
      },
      {
        id: "dsa-34",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        companies: ["Amazon", "Microsoft", "LinkedIn"],
        link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        optimalComplexity: "O(N) Time, O(H) Space",
        hint: "Return 1 + max(depth(left), depth(right))."
      },
      {
        id: "dsa-35",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Bloomberg"],
        link: "https://leetcode.com/problems/validate-binary-search-tree/",
        optimalComplexity: "O(N) Time, O(H) Space",
        hint: "Pass valid value ranges (minLimit, maxLimit) recursively down both subtrees."
      },
      {
        id: "dsa-36",
        title: "Lowest Common Ancestor of a BST / BT",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        optimalComplexity: "O(N) Time, O(H) Space",
        hint: "If root equals p or q, return root. If left and right child searches both return non-null, root is LCA."
      },
      {
        id: "dsa-37",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Microsoft"],
        link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Standard BFS using a Queue. Process elements level-by-level by looping queue length at start of level."
      },
      {
        id: "dsa-38",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        companies: ["Meta", "Google", "Amazon"],
        link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        optimalComplexity: "O(N) Time, O(H) Space",
        hint: "For each node, compute max single-arm path. Update global max with root.val + max(0, left) + max(0, right)."
      },
      {
        id: "dsa-39",
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        companies: ["Amazon", "Microsoft", "Google", "Meta"],
        link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "Pre-order DFS traversal with delimiter (e.g. ',') and '#' placeholder for null nodes."
      }
    ]
  },
  {
    id: "heaps",
    title: "7. Heaps & Priority Queues",
    icon: "triangle",
    description: "Min/Max heaps, top-K selection, dynamic running median, and task scheduling.",
    problems: [
      {
        id: "dsa-40",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Google"],
        link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        optimalComplexity: "O(N log K) Time with Min-Heap, or O(N) QuickSelect",
        hint: "Maintain a Min-Heap of size K. Once heap exceeds K, pop root; heap top is the Kth largest."
      },
      {
        id: "dsa-41",
        title: "Task Scheduler",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Pinterest"],
        link: "https://leetcode.com/problems/task-scheduler/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Greedy approach based on the maximum frequency character and required cooldown intervals n."
      },
      {
        id: "dsa-42",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
        link: "https://leetcode.com/problems/find-median-from-data-stream/",
        optimalComplexity: "O(log N) Add, O(1) Find, O(N) Space",
        hint: "Two heaps: a Max-Heap for the lower half numbers, and a Min-Heap for the upper half numbers."
      }
    ]
  },
  {
    id: "graphs",
    title: "8. Graphs & Traversals",
    icon: "network",
    description: "Connected components, shortest paths, topological sort, and cycle detection.",
    problems: [
      {
        id: "dsa-43",
        title: "Number of Islands",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
        link: "https://leetcode.com/problems/number-of-islands/",
        optimalComplexity: "O(M * N) Time, O(M * N) Space",
        hint: "Iterate 2D grid. When '1' seen, increment count and flood-fill sink connected land using BFS/DFS."
      },
      {
        id: "dsa-44",
        title: "Clone Graph",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Twitter"],
        link: "https://leetcode.com/problems/clone-graph/",
        optimalComplexity: "O(V + E) Time, O(V) Space",
        hint: "DFS/BFS with a Hash Map mapping originalNode -> clonedNode to prevent infinite recursion."
      },
      {
        id: "dsa-45",
        title: "Course Schedule I & II",
        difficulty: "Medium",
        companies: ["Google", "Amazon", "Uber", "Intuit"],
        link: "https://leetcode.com/problems/course-schedule/",
        optimalComplexity: "O(V + E) Time, O(V + E) Space",
        hint: "Kahn's algorithm using in-degree array and queue for topological sorting; check if all courses processed."
      },
      {
        id: "dsa-46",
        title: "Network Delay Time (Dijkstra)",
        difficulty: "Medium",
        companies: ["Amazon", "Google"],
        link: "https://leetcode.com/problems/network-delay-time/",
        optimalComplexity: "O(E log V) Time, O(V + E) Space",
        hint: "Dijkstra's algorithm with a Min-Heap Priority Queue storing pairs of (cumulativeDist, node)."
      },
      {
        id: "dsa-47",
        title: "Word Ladder",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Meta"],
        link: "https://leetcode.com/problems/word-ladder/",
        optimalComplexity: "O(M^2 * N) Time, O(M * N) Space",
        hint: "Shortest transformation path via unweighted BFS level by level using a HashSet for dictionary lookup."
      },
      {
        id: "dsa-48",
        title: "Alien Dictionary",
        difficulty: "Hard",
        companies: ["Meta", "Amazon", "Airbnb", "Twitter"],
        link: "https://leetcode.com/problems/alien-dictionary/",
        optimalComplexity: "O(C) Time, O(U + min(U^2, N)) Space",
        hint: "Derive character ordering by comparing adjacent words, construct directed graph, and run Topo Sort."
      }
    ]
  },
  {
    id: "dynamic-programming",
    title: "9. Dynamic Programming",
    icon: "cpu",
    description: "Optimal substructure, overlapping subproblems, memoization, and bottom-up tabulation.",
    problems: [
      {
        id: "dsa-49",
        title: "Climbing Stairs",
        difficulty: "Easy",
        companies: ["Amazon", "Google", "Adobe"],
        link: "https://leetcode.com/problems/climbing-stairs/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Fibonacci recurrence: dp[i] = dp[i-1] + dp[i-2]. Optimize space with 2 rolling variables."
      },
      {
        id: "dsa-50",
        title: "Coin Change",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Walmart"],
        link: "https://leetcode.com/problems/coin-change/",
        optimalComplexity: "O(Amount * N) Time, O(Amount) Space",
        hint: "1D DP array initialized to Amount + 1. dp[a] = min(dp[a], 1 + dp[a - coin]) for each coin."
      },
      {
        id: "dsa-51",
        title: "Longest Increasing Subsequence (LIS)",
        difficulty: "Medium",
        companies: ["Microsoft", "Google", "Amazon"],
        link: "https://leetcode.com/problems/longest-increasing-subsequence/",
        optimalComplexity: "O(N log N) Time, O(N) Space (Patience Sorting)",
        hint: "Maintain 'tails' array. For each number, binary search for its position in tails to replace or append."
      },
      {
        id: "dsa-52",
        title: "Longest Common Subsequence (LCS)",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Paypal"],
        link: "https://leetcode.com/problems/longest-common-subsequence/",
        optimalComplexity: "O(M * N) Time, O(min(M, N)) Space",
        hint: "2D DP grid. If text1[i] == text2[j], 1 + dp[i+1][j+1]; else max(dp[i+1][j], dp[i][j+1])."
      },
      {
        id: "dsa-53",
        title: "0/1 Knapsack Problem",
        difficulty: "Medium",
        companies: ["Flipkart", "TCS Prime", "Amazon"],
        link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
        optimalComplexity: "O(N * W) Time, O(W) Space",
        hint: "Standard 0/1 knapsack: iterate weights backwards in 1D array to avoid reusing current item."
      },
      {
        id: "dsa-54",
        title: "Edit Distance",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/edit-distance/",
        optimalComplexity: "O(M * N) Time, O(min(M, N)) Space",
        hint: "dp[i][j] represents min ops. Transitions: insert (dp[i][j-1]), delete (dp[i-1][j]), replace (dp[i-1][j-1])."
      },
      {
        id: "dsa-55",
        title: "Burst Balloons",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Uber"],
        link: "https://leetcode.com/problems/burst-balloons/",
        optimalComplexity: "O(N^3) Time, O(N^2) Space",
        hint: "Interval DP: think about which balloon is popped LAST in the subarray (i, j)."
      }
    ]
  },
  {
    id: "greedy-intervals",
    title: "10. Greedy Algorithms & Intervals",
    icon: "check-circle",
    description: "Locally optimal choices leading to globally optimal results, and interval overlaps.",
    problems: [
      {
        id: "dsa-56",
        title: "Maximum Subarray (Kadane's Algorithm)",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "LinkedIn"],
        link: "https://leetcode.com/problems/maximum-subarray/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Kadane's: currSum = max(num, currSum + num); update maxGlobal."
      },
      {
        id: "dsa-57",
        title: "Jump Game I & II",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Apple"],
        link: "https://leetcode.com/problems/jump-game/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "Maintain the furthest reachable index. If current index i > maxReach, return false."
      },
      {
        id: "dsa-58",
        title: "Merge Intervals",
        difficulty: "Medium",
        companies: ["Google", "Meta", "Amazon", "Uber"],
        link: "https://leetcode.com/problems/merge-intervals/",
        optimalComplexity: "O(N log N) Time, O(N) Space",
        hint: "Sort intervals by start time. If current.start <= prev.end, merge by updating prev.end = max(prev.end, current.end)."
      },
      {
        id: "dsa-59",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        companies: ["Meta", "Amazon"],
        link: "https://leetcode.com/problems/non-overlapping-intervals/",
        optimalComplexity: "O(N log N) Time, O(1) Space",
        hint: "Sort intervals by END time. Always pick interval with earliest end time to leave maximum room."
      }
    ]
  },
  {
    id: "backtracking",
    title: "11. Backtracking & Recursion",
    icon: "corner-down-right",
    description: "Exhaustive combinatorial search, permutations, subsets, and state pruning.",
    problems: [
      {
        id: "dsa-60",
        title: "Subsets & Subsets II",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Uber"],
        link: "https://leetcode.com/problems/subsets/",
        optimalComplexity: "O(2^N * N) Time, O(N) Space",
        hint: "Pick / Don't pick branching or loop with backtracking push and pop."
      },
      {
        id: "dsa-61",
        title: "Permutations",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Google"],
        link: "https://leetcode.com/problems/permutations/",
        optimalComplexity: "O(N! * N) Time, O(N) Space",
        hint: "Swap elements in-place or use a visited array with backtracking recursion."
      },
      {
        id: "dsa-62",
        title: "Combination Sum",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Airbnb"],
        link: "https://leetcode.com/problems/combination-sum/",
        optimalComplexity: "O(2^T) Time, O(T) Space",
        hint: "Sort candidates. When exploring candidate, allow re-use at same index; prune branches when sum > target."
      },
      {
        id: "dsa-63",
        title: "N-Queens",
        difficulty: "Hard",
        companies: ["Google", "Amazon", "Microsoft"],
        link: "https://leetcode.com/problems/n-queens/",
        optimalComplexity: "O(N!) Time, O(N) Space",
        hint: "Place queens row by row. Use HashSets to track occupied columns, positive diagonals (r + c), and negative diagonals (r - c)."
      },
      {
        id: "dsa-64",
        title: "Word Search II (Boggle with Trie)",
        difficulty: "Hard",
        companies: ["Amazon", "Google", "Microsoft"],
        link: "https://leetcode.com/problems/word-search-ii/",
        optimalComplexity: "O(M * N * 4^L) Time, O(Total chars in words) Space",
        hint: "Insert dictionary into a Prefix Trie. Run DFS on grid cells matching current Trie node."
      }
    ]
  },
  {
    id: "bit-manipulation",
    title: "12. Bit Manipulation & Math",
    icon: "binary",
    description: "Low-level bitwise operations, XOR tricks, powers of two, and two's complement arithmetic.",
    problems: [
      {
        id: "dsa-65",
        title: "Single Number",
        difficulty: "Easy",
        companies: ["Amazon", "Google"],
        link: "https://leetcode.com/problems/single-number/",
        optimalComplexity: "O(N) Time, O(1) Space",
        hint: "XOR all numbers together: a ^ a = 0 and a ^ 0 = a. The unique single number remains."
      },
      {
        id: "dsa-66",
        title: "Number of 1 Bits (Hamming Weight)",
        difficulty: "Easy",
        companies: ["Microsoft", "Apple"],
        link: "https://leetcode.com/problems/number-of-1-bits/",
        optimalComplexity: "O(Number of set bits) Time, O(1) Space",
        hint: "Brian Kernighan's Algorithm: n = n & (n - 1) clears the lowest set bit in O(1)."
      },
      {
        id: "dsa-67",
        title: "Counting Bits",
        difficulty: "Easy",
        companies: ["Amazon", "Meta"],
        link: "https://leetcode.com/problems/counting-bits/",
        optimalComplexity: "O(N) Time, O(N) Space",
        hint: "dp[i] = dp[i >> 1] + (i & 1). Bit count of i equals bit count of i/2 plus 1 if i is odd."
      }
    ]
  }
];
