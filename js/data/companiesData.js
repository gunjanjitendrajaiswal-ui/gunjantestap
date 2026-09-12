// Company Hiring Processes, Exam Patterns, Eligibility & Syllabus for CareerForge

export const companiesData = [
  {
    id: "google",
    name: "Google",
    tier: "Tier-1 Product",
    category: "Product",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    color: "#4285F4",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MS / PhD in Computer Science or related fields",
      cgpa: "No rigid CGPA cutoff (Generally 7.0+ recommended)",
      backlogs: "No active backlogs at time of joining",
      branches: "Open to all branches with strong CS fundamentals"
    },
    ctcBreakdown: {
      fresher: "₹24 LPA - ₹40 LPA (Base ~₹16-18L + ₹20-30L Stocks over 4 yrs + Joining Bonus)",
      intern: "₹1,15,000 - ₹1,30,000 / month"
    },
    hiringRounds: [
      {
        round: "Round 1: Online Assessment (OA)",
        duration: "90 Minutes",
        format: "2 Algorithmic Coding Questions on HackerEarth / internal platform",
        details: "Focuses on Arrays, Strings, Dynamic Programming, Graphs, or Segment Trees. Clean modular code with optimal time/space is mandatory."
      },
      {
        round: "Round 2: Technical Phone Screen",
        duration: "45 Minutes",
        format: "1-2 Coding Questions on Google Docs / Google Meet",
        details: "Live pair-coding. Emphasis on communication, clarifying assumptions, handling edge cases, and calculating Big-O complexities."
      },
      {
        round: "Round 3 & 4: Onsite / Virtual Coding Interviews",
        duration: "45 Minutes each",
        format: "Deep DSA problem-solving and algorithmic optimization",
        details: "Advanced topics: Dynamic Programming, Graph Traversals, Trees, Heaps, and Recursion. Expect follow-up constraints testing scalability."
      },
      {
        round: "Round 5: Googliness & Leadership",
        duration: "45 Minutes",
        format: "Behavioral & Cultural Interview",
        details: "Evaluates teamwork, intellectual humility, navigating ambiguity, ethical decision making, and bias for action."
      }
    ],
    examPattern: {
      platforms: ["Google Meet", "Google Docs / Internal Coderpad"],
      allowedLanguages: ["C++", "Java", "Python", "Go"],
      keyTopics: [
        "Dynamic Programming (Grid, Subsequences, State Compression)",
        "Graphs (BFS/DFS, Dijkstra, Topological Sort)",
        "Trees & Binary Search Trees (LCA, Views, Traversals)",
        "Tries, Disjoint Set Union (DSU)",
        "Binary Search on Answers"
      ]
    },
    prepStrategy: [
      "Practice coding on a blank document or Google Docs without syntax highlighting or auto-complete.",
      "Think out loud: interviewers evaluate your thought process and problem formulation as much as the final code.",
      "Always test your code with dry runs on normal inputs, edge cases (empty, negative, null, duplicates), and extreme scale."
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    tier: "Tier-1 Product",
    category: "Product",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    color: "#FF9900",
    eligibility: {
      degree: "B.Tech / M.Tech / MCA",
      cgpa: "6.5+ CGPA or 65%",
      backlogs: "No active backlogs allowed",
      branches: "CS, IT, ECE, EE and allied branches"
    },
    ctcBreakdown: {
      fresher: "₹28 LPA - ₹45 LPA (Base ~₹16-19L + Stocks + Sign-on Bonus Year 1 & 2)",
      intern: "₹80,000 - ₹1,10,000 / month"
    },
    hiringRounds: [
      {
        round: "Round 1: Online Assessment (OA)",
        duration: "105 Minutes",
        format: "Part 1: 2 Coding Questions (70 mins) + Part 2: Work Style Assessment (35 mins)",
        details: "Part 1 tests Medium-to-Hard LeetCode problems. Part 2 evaluates Amazon's 16 Leadership Principles (LPs)."
      },
      {
        round: "Round 2: Technical Interview 1 (DSA)",
        duration: "60 Minutes",
        format: "1-2 DSA Problems + 2 Leadership Principle Questions",
        details: "Binary Trees, Priority Queues, Hash Maps, Two Pointers. LP questions answered in STAR format."
      },
      {
        round: "Round 3: Technical Interview 2 (DSA + LLD)",
        duration: "60 Minutes",
        format: "Complex DSA or Low-Level Object Oriented Design",
        details: "Design patterns (Strategy, Factory), clean OOP modeling (e.g. Design Parking Lot, Elevator, Chess) + STAR questions."
      },
      {
        round: "Round 4: The Bar Raiser Round",
        duration: "60 Minutes",
        format: "Deep dive into past projects, architectural tradeoffs, and extreme LP scrutiny",
        details: "Conducted by an independent cross-team interviewer. Focus on 'Customer Obsession', 'Dive Deep', and 'Bias for Action'."
      }
    ],
    examPattern: {
      platforms: ["HackerRank / Amazon Chime CodeLive"],
      allowedLanguages: ["Java", "C++", "Python", "C#"],
      keyTopics: [
        "Priority Queues / Heaps (Top-K elements)",
        "Binary Trees & BSTs (Zig-zag, LCA, Path Sum)",
        "Graphs (BFS/DFS, Connected Components)",
        "Sliding Window & Hash Maps",
        "Object Oriented Design (SOLID principles)"
      ]
    },
    prepStrategy: [
      "Prepare at least 2 distinct STAR stories for EACH of the 16 Amazon Leadership Principles.",
      "Amazon loves Top K Elements (Heaps) and Tree/Graph traversals.",
      "Never compromise on customer perspective when resolving architectural or design dilemmas."
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    tier: "Tier-1 Product",
    category: "Product",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    color: "#00A4EF",
    eligibility: {
      degree: "B.Tech / M.Tech / Dual Degree",
      cgpa: "7.0+ CGPA or 70%",
      backlogs: "Zero active backlogs",
      branches: "Open to CS/IT/Circuital branches"
    },
    ctcBreakdown: {
      fresher: "₹25 LPA - ₹42 LPA (Base ~₹15.5L + Stocks + Performance Bonus + Relocation)",
      intern: "₹1,25,000 / month"
    },
    hiringRounds: [
      {
        round: "Round 1: Online Assessment (OA)",
        duration: "90 Minutes",
        format: "3 Coding Problems on Codility or Mettl",
        details: "Emphasis on test case accuracy, handling corner cases, and memory limits."
      },
      {
        round: "Round 2: Technical Interview 1",
        duration: "45-60 Minutes",
        format: "Data Structures & Core CS Concepts",
        details: "Linked Lists, Strings, Binary Trees, alongside questions on OS memory management and Threads."
      },
      {
        round: "Round 3: Technical Interview 2",
        duration: "45-60 Minutes",
        format: "Advanced Algorithms & System Design Fundamentals",
        details: "Graph algorithms, Dynamic Programming, API design, and Database schemas."
      },
      {
        round: "Round 4: Partner / AA (As Appropriate) Round",
        duration: "45-60 Minutes",
        format: "Leadership, growth mindset, resume drilldown, and cultural fit",
        details: "Conducted by a Director or Partner Engineering Manager. Highlights Microsoft's Growth Mindset philosophy."
      }
    ],
    examPattern: {
      platforms: ["Codility", "Microsoft Teams"],
      allowedLanguages: ["C++", "C#", "Java", "Python"],
      keyTopics: [
        "Arrays, Strings & String Matching (KMP, Rolling Hash)",
        "Linked Lists (Reverse, Cycle, Palindrome, Deep Copy)",
        "Binary Trees (Subtree checks, Views, Diameter)",
        "Dynamic Programming (Grid, Strings)",
        "Core OS concepts: Multithreading, Mutex, Semaphores"
      ]
    },
    prepStrategy: [
      "Focus heavily on Linked Lists and Binary Trees - Microsoft is famous for pointers and trees.",
      "Emphasize Growth Mindset: demonstrate how you learned from past mistakes and embrace continuous improvement.",
      "Be prepared to write production-clean code with descriptive variable names and comments."
    ]
  },
  {
    id: "tcs",
    name: "TCS (Tata Consultancy Services)",
    tier: "Tier-3 Mass Recruiter & Digital/Prime",
    category: "Service",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    color: "#0078D7",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
      cgpa: "60% or 6.0 CGPA throughout (10th, 12th, Diploma, UG, PG)",
      backlogs: "Up to 1 active backlog permitted during test; 0 at time of joining",
      branches: "All Engineering & MCA branches eligible",
      gap: "Maximum 24 months academic gap permitted with valid reasoning"
    },
    ctcBreakdown: {
      fresher: "Ninja: ₹3.36 - ₹3.6 LPA | Digital: ₹7.0 - ₹7.5 LPA | Prime: ₹9.0 - ₹11.5 LPA",
      intern: "₹15,000 - ₹35,000 / month (Digital/Prime)"
    },
    hiringRounds: [
      {
        round: "Round 1: National Qualifier Test (NQT)",
        duration: "165 Minutes",
        format: "Part A (Foundation) + Part B (Advanced / Digital & Prime)",
        details: "Part A: Numerical Ability (20 Qs), Verbal (25 Qs), Reasoning (20 Qs). Part B: Advanced Quantitative (15 Qs), Advanced Reasoning (10 Qs), Advanced Coding (2 Qs - 90 mins)."
      },
      {
        round: "Round 2: Technical Interview",
        duration: "30-45 Minutes",
        format: "Core Subjects + Coding Logic + Final Year Project",
        details: "Questions on Java/Python/C, OOPs, SQL queries, normalization, OS deadlocks, and project architecture."
      },
      {
        round: "Round 3: Managerial & HR Round",
        duration: "20-30 Minutes",
        format: "Behavioral, relocation willingness, shift flexibility, and situational questions",
        details: "Assesses communication, readiness to relocate, shift work adaptability, and background checks."
      }
    ],
    examPattern: {
      platforms: ["TCS iON Platform"],
      allowedLanguages: ["C", "C++", "Java", "Python"],
      keyTopics: [
        "Aptitude: Time & Work, Speed & Distance, Percentages, P&C, Probability",
        "Reasoning: Blood Relations, Coding-Decoding, Data Sufficiency",
        "Coding 1 (Easy): Basic arrays, string manipulation, pattern printing",
        "Coding 2 (Medium): Hashing, Matrix operations, Greedy, DP basics"
      ]
    },
    prepStrategy: [
      "Master TCS NQT previous year question papers - questions repeatedly follow standard patterns.",
      "Solve at least 1 coding question fully and pass all public + private test cases to qualify for Digital/Prime band.",
      "Be thoroughly prepared to write SQL queries on paper during the technical interview."
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    tier: "Tier-2/3 Mass Recruiter & Specialist Cadre",
    category: "Service",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    color: "#007CC3",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
      cgpa: "60%+ or 6.0+ CGPA in 10th, 12th, and Degree",
      backlogs: "No active backlogs allowed",
      branches: "All engineering branches allowed"
    },
    ctcBreakdown: {
      fresher: "Systems Engineer (SE): ₹3.6 LPA | Digital Specialist Engineer (DSE): ₹6.25 LPA | Specialist Programmer (SP): ₹9.5 LPA",
      intern: "₹10,000 - ₹25,000 / month"
    },
    hiringRounds: [
      {
        round: "Round 1: Online Assessment (InfyTQ / HackWithInfy / National Test)",
        duration: "100-180 Minutes",
        format: "SE Track: Reasoning (15 Qs), Technical (10 Qs), Verbal (20 Qs), Numerical (10 Qs), Pseudocode (5 Qs). SP/DSE Track (HackWithInfy): 3 Coding Questions (1 Easy, 1 Medium, 1 Hard).",
        details: "HackWithInfy focuses on dynamic programming, greedy, graphs, and bit manipulation."
      },
      {
        round: "Round 2: Technical Interview",
        duration: "30-45 Minutes",
        format: "Resume Walkthrough, Data Structures, OOPs & Project Discussion",
        details: "Explaining project workflow, database schemas, write a program to check palindrome or Armstrong number, reverse linked list."
      },
      {
        round: "Round 3: HR Interview",
        duration: "15-20 Minutes",
        format: "Basic HR & Background Check",
        details: "Questions on college experience, strengths, weaknesses, night shift willingness, and service agreement."
      }
    ],
    examPattern: {
      platforms: ["Infosys Online Assessment / HackerEarth"],
      allowedLanguages: ["Java", "Python", "C++"],
      keyTopics: [
        "Pseudocode Analysis (Loops, recursion output prediction)",
        "Quantitative & Logical Reasoning",
        "HackWithInfy: DP, Trees, Graphs, Strings, Number Theory"
      ]
    },
    prepStrategy: [
      "Practice pseudocode questions: predict outputs and variable values across nested loops and recursion.",
      "Participate in HackWithInfy - this is the highest direct route to secure the ₹9.5 LPA Specialist Programmer package.",
      "Understand all core OOP concepts with concrete real-world code examples."
    ]
  },
  {
    id: "razorpay",
    name: "Razorpay",
    tier: "Tier-1 Fintech Unicorn",
    category: "Fintech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    color: "#0c2340",
    eligibility: {
      degree: "B.Tech / M.Tech / Dual Degree in CS or allied fields",
      cgpa: "7.0+ CGPA preferred",
      backlogs: "No active backlogs",
      branches: "CS, IT, ECE"
    },
    ctcBreakdown: {
      fresher: "₹18 LPA - ₹26 LPA (Base ~₹14-16L + ESOPs + Annual Performance Bonus)",
      intern: "₹50,000 - ₹75,000 / month"
    },
    hiringRounds: [
      {
        round: "Round 1: Online Coding Assessment",
        duration: "90 Minutes",
        format: "3 Algorithmic Coding Questions on HackerRank",
        details: "Medium-Hard difficulty focusing on Arrays, Two Pointers, Graphs, and Hash Tables."
      },
      {
        round: "Round 2: Technical DSA Round",
        duration: "60 Minutes",
        format: "Data structures & problem solving",
        details: "Live problem solving. Real-world financial transaction scenarios (e.g. rate limiter, ledger reconciliation)."
      },
      {
        round: "Round 3: System Design & CS Fundamentals",
        duration: "60 Minutes",
        format: "Low Level Design (LLD) or High Level Design (HLD) + DBMS/OS",
        details: "Designing an idempotent payment checkout, ACID transaction isolation, webhook retry queue mechanism."
      },
      {
        round: "Round 4: Cultural & Hiring Manager Fit",
        duration: "45 Minutes",
        format: "Values, customer focus, past challenges, ownership",
        details: "Evaluation on Razorpay's core values: 'Customer First', 'Integrity', 'Think Big'."
      }
    ],
    examPattern: {
      platforms: ["HackerRank", "Google Meet"],
      allowedLanguages: ["Java", "Go", "Python", "JavaScript/TypeScript", "C++"],
      keyTopics: [
        "Distributed Locks & Idempotency",
        "Concurrency & Thread Safety",
        "Graph & Tree Traversals",
        "Caching patterns with Redis",
        "SQL Transaction Isolation & Locking"
      ]
    },
    prepStrategy: [
      "Understand payment workflows: Idempotent API requests, webhook retries, and database transaction locks.",
      "Be strong in both DSA and Low Level Design (SOLID principles, Factory, Strategy, Observer).",
      "Read the Razorpay Engineering blog - it gives huge leverage in architectural discussions."
    ]
  }
];
