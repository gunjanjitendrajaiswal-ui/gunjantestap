// Preparation Hub Dataset for CareerForge (Aptitude, Core Technical, HR & Behavioral)

export const aptitudeData = {
  topics: [
    {
      id: "time-work",
      category: "Quantitative",
      title: "Time & Work",
      formulas: [
        "If A can do a piece of work in n days, then A's 1 day's work = 1/n",
        "Total Work = Efficiency × Time Taken",
        "If A is thrice as good a workman as B, ratio of work done by A and B = 3 : 1, and ratio of times taken = 1 : 3",
        "Pipes & Cisterns: If an inlet fills in X hours and outlet empties in Y hours (Y > X), net fill per hour = (1/X - 1/Y)"
      ],
      quickTips: [
        "Use the LCM method: assume total work to be the LCM of individual days to work with integer efficiencies instead of fractions.",
        "Work done is directly proportional to wages distributed."
      ]
    },
    {
      id: "speed-distance",
      category: "Quantitative",
      title: "Speed, Time & Distance",
      formulas: [
        "Speed = Distance / Time",
        "Conversion: x km/hr = x × (5/18) m/sec; y m/sec = y × (18/5) km/hr",
        "Average Speed (equal distances at speeds u and v) = (2uv) / (u + v)",
        "Relative Speed: Moving in opposite directions = (u + v); Moving in same direction = (u - v)",
        "Train crossing a pole: Distance = Length of train; Crossing platform: Distance = Length of train + Length of platform"
      ],
      quickTips: [
        "For Boats & Streams: Downstream speed = u + v, Upstream speed = u - v, Boat in still water = (Downstream + Upstream)/2"
      ]
    },
    {
      id: "profit-loss",
      category: "Quantitative",
      title: "Profit, Loss & Discount",
      formulas: [
        "Profit = Selling Price (SP) - Cost Price (CP)",
        "Loss = Cost Price (CP) - Selling Price (SP)",
        "Profit % = (Profit / CP) × 100",
        "Loss % = (Loss / CP) × 100",
        "SP = CP × (100 + Gain%) / 100",
        "Single equivalent discount of successive discounts d1% and d2% = (d1 + d2 - (d1 × d2)/100)%"
      ],
      quickTips: [
        "Profit and Loss percentage is ALWAYS calculated on Cost Price unless specifically mentioned otherwise.",
        "Marked Price (MP) = CP + Markup."
      ]
    },
    {
      id: "permutations-probability",
      category: "Quantitative",
      title: "Permutations, Combinations & Probability",
      formulas: [
        "Permutation (Order matters): nPr = n! / (n - r)!",
        "Combination (Order does not matter): nCr = n! / [r! × (n - r)!]",
        "nCr = nC(n-r)",
        "Probability P(E) = (Number of Favorable Outcomes) / (Total Number of Exhaustive Outcomes)",
        "P(A ∪ B) = P(A) + P(B) - P(A ∩ B); For mutually exclusive events: P(A ∪ B) = P(A) + P(B)"
      ],
      quickTips: [
        "In dice problems, total outcomes for n dice = 6^n.",
        "In coin problems, total outcomes for n coins = 2^n."
      ]
    },
    {
      id: "logical-blood-relations",
      category: "Logical Reasoning",
      title: "Blood Relations & Coded Hierarchy",
      formulas: [
        "Father's/Mother's son = Brother",
        "Father's/Mother's daughter = Sister",
        "Father's/Mother's brother = Paternal/Maternal Uncle",
        "Brother's/Sister's son = Nephew; Brother's/Sister's daughter = Niece",
        "Paternal indicates father's lineage; Maternal indicates mother's lineage"
      ],
      quickTips: [
        "Draw a family tree diagram: use '+' for male, '-' for female, '=' for married couples, and vertical arrows for generations.",
        "Never assume gender simply based on traditional names unless explicitly confirmed."
      ]
    },
    {
      id: "logical-syllogisms",
      category: "Logical Reasoning",
      title: "Syllogisms & Venn Logic",
      formulas: [
        "All A are B: A is a subset inside B",
        "No A is B: Disjoint sets of A and B",
        "Some A are B: Overlapping regions of A and B",
        "Some A are not B: At least one element of A exists outside B"
      ],
      quickTips: [
        "A conclusion follows ONLY if it holds true in all possible Venn diagram configurations.",
        "Check for 'Either-Or' condition if two conclusions contradict each other with identical subjects and predicates."
      ]
    },
    {
      id: "verbal-sentence-correction",
      category: "Verbal Ability",
      title: "Sentence Correction & Grammar Rules",
      formulas: [
        "Subject-Verb Agreement: Singular subject takes a singular verb; Plural subject takes a plural verb.",
        "Modifiers must be placed adjacent to the word they modify (avoid dangling modifiers).",
        "Parallelism: Elements in a list or comparison must share the identical grammatical form (e.g., all gerunds or all infinitives).",
        "Pronoun-Antecedent Agreement: A pronoun must agree in gender and number with its antecedent."
      ],
      quickTips: [
        "Watch out for intervening prepositional phrases (e.g., 'The box of chocolates IS delicious' -> subject is 'box', not 'chocolates')."
      ]
    }
  ],

  // Interactive Timed Practice Quiz
  quizQuestions: [
    {
      id: "q1",
      topic: "Time & Work",
      question: "A can complete a piece of work in 12 days, and B can complete the same work in 16 days. If they work together for 4 days, what fraction of the total work remains unfinished?",
      options: [
        "7/12",
        "5/12",
        "7/24",
        "1/3"
      ],
      correctIndex: 1,
      explanation: "A's 1 day work = 1/12. B's 1 day work = 1/16. Together 1 day work = 1/12 + 1/16 = 7/48. In 4 days, work completed = 4 × (7/48) = 7/12. Remaining work = 1 - 7/12 = 5/12."
    },
    {
      id: "q2",
      topic: "Speed, Time & Distance",
      question: "A train 180 meters long is traveling at a uniform speed of 54 km/hr. In how many seconds will it completely cross an electric pole standing beside the track?",
      options: [
        "10 seconds",
        "12 seconds",
        "15 seconds",
        "18 seconds"
      ],
      correctIndex: 1,
      explanation: "Convert speed to m/s: 54 × (5/18) = 15 m/s. Distance to cover = Length of train = 180 m. Time = Distance / Speed = 180 / 15 = 12 seconds."
    },
    {
      id: "q3",
      topic: "Profit & Loss",
      question: "An article is sold at a gain of 15%. If it had been sold for ₹24 more, the gain would have been 20%. What is the cost price (CP) of the article?",
      options: [
        "₹400",
        "₹450",
        "₹480",
        "₹520"
      ],
      correctIndex: 2,
      explanation: "Difference between 20% and 15% is 5% of CP. Thus, 5% of CP = ₹24 => CP = 24 × (100 / 5) = ₹480."
    },
    {
      id: "q4",
      topic: "Permutations & Probability",
      question: "Two standard fair six-faced dice are rolled simultaneously. What is the probability of getting a sum of numbers equal to 8?",
      options: [
        "5/36",
        "7/36",
        "1/6",
        "1/9"
      ],
      correctIndex: 0,
      explanation: "Total outcomes = 6 × 6 = 36. Favorable pairs giving sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes. Probability = 5/36."
    },
    {
      id: "q5",
      topic: "Logical Reasoning",
      question: "Pointing to a photograph of a woman, Rahul said: 'She is the only daughter of the only daughter of my maternal grandfather.' How is Rahul related to the woman in the photograph?",
      options: [
        "Brother",
        "Cousin",
        "Uncle",
        "Nephew"
      ],
      correctIndex: 0,
      explanation: "Maternal grandfather's only daughter = Rahul's mother. The only daughter of Rahul's mother = Rahul's sister. Therefore, Rahul is her brother."
    },
    {
      id: "q6",
      topic: "Quantitative",
      question: "What is the single discount equivalent to two successive discounts of 20% and 10%?",
      options: [
        "28%",
        "30%",
        "26%",
        "25%"
      ],
      correctIndex: 0,
      explanation: "Equivalent discount = d1 + d2 - (d1 × d2)/100 = 20 + 10 - (20 × 10)/100 = 30 - 2 = 28%."
    },
    {
      id: "q7",
      topic: "Verbal Ability",
      question: "Choose the correct sentence that obeys proper grammatical agreement:",
      options: [
        "Either the manager or the employees is attending the conference.",
        "Either the manager or the employees are attending the conference.",
        "Neither the manager nor the employees has been informed.",
        "The team of developers have submitted their project."
      ],
      correctIndex: 1,
      explanation: "When two subjects are joined by 'either...or' or 'neither...nor', the verb agrees with the subject closest to it. Here 'employees' (plural) is closer to the verb, so 'are attending' is correct."
    }
  ]
};

export const technicalCoreData = [
  {
    id: "os",
    subject: "Operating Systems",
    icon: "terminal",
    description: "Processes, Threads, CPU Scheduling, Deadlocks, Memory Management, and Linux Internals.",
    topics: [
      {
        title: "Process vs Thread",
        summary: "A process is an executing program with its own isolated address space, while a thread is a lightweight execution unit sharing memory with its parent process.",
        keyPoints: [
          "Processes have separate virtual memory spaces; inter-process communication (IPC) requires pipes, shared memory, or sockets.",
          "Threads share the same text, data, and heap segments, but each maintains its own stack, registers, and program counter.",
          "Context switching between threads is significantly faster than between processes because page tables do not need invalidation."
        ],
        codeSnippet: `// Linux Fork vs Pthread Example
// Process creation via fork()
pid_t pid = fork();
if (pid == 0) {
    // Child process runs in isolated memory
}

// POSIX thread creation
pthread_t tid;
pthread_create(&tid, NULL, workerFunction, NULL); // Shares heap memory`
      },
      {
        title: "Deadlocks & The 4 Coffman Conditions",
        summary: "A deadlock occurs when a set of processes are blocked because each holds a resource and waits for another resource held by another process.",
        keyPoints: [
          "1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.",
          "2. Hold and Wait: A process holding at least one resource is waiting to acquire additional resources held by other processes.",
          "3. No Preemption: Resources cannot be forcibly taken from a process holding them.",
          "4. Circular Wait: A closed chain of processes exists such that each process holds at least one resource needed by the next.",
          "Prevention: Break any one of the 4 conditions (e.g., impose global resource ordering to eliminate circular wait)."
        ],
        codeSnippet: `// Banker's Algorithm Safety Check:
// If (Need[i] <= Available) {
//    Available += Allocation[i];
//    Finish[i] = true;
// }`
      },
      {
        title: "Virtual Memory & Paging",
        summary: "Virtual memory maps process logical addresses to physical RAM frames, enabling memory isolation and over-commit.",
        keyPoints: [
          "MMU (Memory Management Unit) translates virtual addresses to physical addresses using Page Tables.",
          "TLB (Translation Lookaside Buffer) is a high-speed hardware cache for page table translations.",
          "Page Fault: Triggered when a requested page is not present in RAM; OS swaps the page in from disk.",
          "Page Replacement Algorithms: FIFO, LRU (Least Recently Used), Optimal (Belady's)."
        ],
        codeSnippet: `Virtual Address = [ Page Number (p) | Page Offset (d) ]
Physical Address = [ Frame Number (f) | Page Offset (d) ]`
      }
    ]
  },
  {
    id: "dbms",
    subject: "Database Management Systems & SQL",
    icon: "database",
    description: "ACID Properties, Normalization, B-Tree Indexing, Transactions, and High-Yield SQL Queries.",
    topics: [
      {
        title: "ACID Properties in Relational Databases",
        summary: "The foundational guarantees ensuring reliable transaction processing in database systems.",
        keyPoints: [
          "Atomicity: 'All or nothing'. If any operation fails, the entire transaction is rolled back.",
          "Consistency: The database transitions from one valid state to another, preserving all constraints.",
          "Isolation: Concurrent transactions execute without mutual interference. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.",
          "Durability: Once committed, data changes survive system crashes (ensured via Write-Ahead Logging / WAL)."
        ],
        codeSnippet: `BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT; -- Changes permanent; rollback if any statement errors`
      },
      {
        title: "Database Normalization (1NF through BCNF)",
        summary: "Systematic technique of organizing schemas to minimize data redundancy and avoid anomalies (Insert, Update, Delete).",
        keyPoints: [
          "1NF: Atomic values only; no repeating groups or nested arrays.",
          "2NF: Must be in 1NF + No partial dependencies (all non-prime attributes fully functionally dependent on whole candidate key).",
          "3NF: Must be in 2NF + No transitive dependencies (non-prime attributes must not determine other non-prime attributes).",
          "BCNF (Boyce-Codd): Strict 3NF where for every functional dependency X -> Y, X must be a super key."
        ],
        codeSnippet: `-- Finding the Nth highest salary in SQL (e.g. 2nd highest):
SELECT DISTINCT salary 
FROM Employee 
ORDER BY salary DESC 
LIMIT 1 OFFSET 1;

-- Or using Window Functions:
WITH Ranked AS (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
  FROM Employee
)
SELECT salary FROM Ranked WHERE rnk = 2;`
      },
      {
        title: "B-Tree vs Hash Indexing",
        summary: "Indexes speed up data retrieval at the cost of slower writes and extra disk storage.",
        keyPoints: [
          "B+ Tree: Default index in MySQL (InnoDB) and Postgres. Keys stored in balanced multi-way tree; leaves linked as linked list. Excels at range scans (BETWEEN, >, <, ORDER BY).",
          "Hash Index: Provides O(1) exact match lookup (WHERE id = 5), but CANNOT perform range queries or prefix matching.",
          "Clustered Index: Dictates physical storage order on disk (usually Primary Key). Only one clustered index per table."
        ],
        codeSnippet: `-- Creating composite index to support multi-column lookups:
CREATE INDEX idx_user_status ON users(country, status, created_at);`
      }
    ]
  },
  {
    id: "cn",
    subject: "Computer Networks",
    icon: "globe",
    description: "OSI vs TCP/IP Models, TCP 3-Way Handshake, DNS, HTTP/HTTPS, and WebSockets.",
    topics: [
      {
        title: "TCP 3-Way Handshake & Teardown",
        summary: "How connection-oriented reliable communication is established and terminated over IP.",
        keyPoints: [
          "SYN: Client sends SYN packet with Initial Sequence Number (ISN_c).",
          "SYN-ACK: Server acknowledges with ACK = ISN_c + 1 and sends its own SYN with ISN_s.",
          "ACK: Client acknowledges with ACK = ISN_s + 1. Connection established!",
          "Termination: 4-way FIN-ACK handshake (FIN -> ACK -> FIN -> ACK) with TIME_WAIT state to guarantee delivery of final ACK."
        ],
        codeSnippet: `Client                       Server
  | ----- SYN (seq=x) -------> |
  | <--- SYN-ACK (x+1, y) ---- |
  | ----- ACK (y+1) ---------> | [ESTABLISHED]`
      },
      {
        title: "HTTP vs HTTPS & SSL/TLS Handshake",
        summary: "HTTPS layers HTTP over TLS encryption to provide Confidentiality, Integrity, and Authentication.",
        keyPoints: [
          "HTTP runs on Port 80 in plain text; HTTPS runs on Port 443 with asymmetric encryption for key exchange and symmetric encryption for session data.",
          "TLS Handshake: Client Hello -> Server Hello + Certificate -> Certificate Verification via CA -> Key Exchange (Diffie-Hellman) -> Encrypted Session begins."
        ],
        codeSnippet: `Port 80 (HTTP) -> Plaintext packets readable by network sniffers
Port 443 (HTTPS) -> TLS encrypted payload protecting tokens & credentials`
      },
      {
        title: "DNS Resolution Flow: What happens when you type google.com?",
        summary: "The step-by-step path from URL input to rendered webpage.",
        keyPoints: [
          "1. Browser checks local cache (Browser cache -> OS hosts cache -> Router cache).",
          "2. Recursive DNS Resolver queries Root Name Server (.), TLD Name Server (.com), and Authoritative Name Server (google.com).",
          "3. IP address returned to browser.",
          "4. TCP 3-way handshake + TLS handshake performed.",
          "5. Browser issues HTTP GET request; server returns HTML, CSS, and JS.",
          "6. DOM and CSSOM trees constructed, layout computed, and pixels painted on screen."
        ],
        codeSnippet: `Browser -> Local DNS Cache -> Root (.) -> TLD (.com) -> Authoritative -> IP Address`
      }
    ]
  },
  {
    id: "oops-design",
    subject: "OOPs & System Design Primer",
    icon: "cpu",
    description: "The 4 OOP Pillars, SOLID Principles, Caching, Load Balancing, and Scalability Patterns.",
    topics: [
      {
        title: "The 4 Pillars of Object-Oriented Programming",
        summary: "Encapsulation, Abstraction, Inheritance, and Polymorphism.",
        keyPoints: [
          "Encapsulation: Bundling data and methods operating on that data within a unit, restricting direct access via access modifiers.",
          "Abstraction: Hiding internal complexity and exposing only necessary interfaces (interfaces, abstract classes).",
          "Inheritance: Mechanism where a child class acquires attributes and behaviors from a parent class (reusability).",
          "Polymorphism: Compile-time (Method Overloading) and Runtime (Method Overriding using virtual functions)."
        ],
        codeSnippet: `// Runtime Polymorphism in Java:
abstract class Payment {
    abstract void pay(double amount);
}

class UPIPayment extends Payment {
    void pay(double amount) { System.out.println("Paid via UPI: " + amount); }
}

class CardPayment extends Payment {
    void pay(double amount) { System.out.println("Paid via Card: " + amount); }
}`
      },
      {
        title: "SOLID Principles for Software Architecture",
        summary: "Five design principles to make software designs understandable, flexible, and maintainable.",
        keyPoints: [
          "S - Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.",
          "O - Open/Closed Principle (OCP): Classes should be open for extension, but closed for modification.",
          "L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering correctness.",
          "I - Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.",
          "D - Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions."
        ],
        codeSnippet: `// Dependency Inversion:
// High level service depends on NotificationService interface, not concrete EmailNotifier`
      },
      {
        title: "System Design: Scalability, Caching & Load Balancing",
        summary: "Core building blocks for scaling architectures to millions of active users.",
        keyPoints: [
          "Horizontal vs Vertical Scaling: Adding more commodity nodes vs upgrading CPU/RAM on a single machine.",
          "Load Balancers: Distribute traffic across instances using algorithms like Round Robin, Least Connections, or IP Hash.",
          "Caching (Redis / Memcached): Cache-Aside, Write-Through, Write-Back patterns. Invalidation strategies: TTL, LRU eviction.",
          "CAP Theorem: In a distributed system, you can only pick two out of Consistency, Availability, and Partition Tolerance."
        ],
        codeSnippet: `User -> DNS -> CDN (Static Assets) -> Load Balancer -> App Servers -> Redis Cache -> Database (Read Replicas + Write Master)`
      }
    ]
  }
];

export const hrBehavioralData = {
  starMethod: {
    title: "Mastering the STAR Technique",
    description: "The gold standard framework for answering behavioral interview questions asked by top tech firms (Amazon Leadership Principles, Google Googliness).",
    steps: [
      {
        letter: "S",
        name: "Situation",
        detail: "Set the context. Describe the specific challenge, project, or problem you faced. Include scale, timeframe, and background.",
        example: "'During my final year project, our team of 4 was building an emergency hospital bed allocation platform during peak pandemic loads...'"
      },
      {
        letter: "T",
        name: "Task",
        detail: "Define your personal role and responsibility. What were YOU specifically tasked with accomplishing?",
        example: "'I was responsible for designing the database schema and backend API to handle concurrent booking requests without double-allocating beds.'"
      },
      {
        letter: "A",
        name: "Action",
        detail: "Detail the specific technical and interpersonal actions YOU took. Explain why you chose that approach over alternatives.",
        example: "'I implemented distributed locks using Redis to guarantee mutual exclusion during booking transactions and wrote automated load tests with k6...'"
      },
      {
        letter: "R",
        name: "Result",
        detail: "Share the quantified outcome and what you learned. Numbers and metrics speak louder than generic statements.",
        example: "'As a result, API response times dropped from 850ms to 120ms, and the system handled over 10,000 simulated concurrent requests with 0 duplicate bookings.'"
      }
    ]
  },

  topQuestions: [
    {
      id: "hr-1",
      question: "Tell me about yourself / Walk me through your resume.",
      intent: "The interviewer wants a concise 90-120 second professional narrative, not your life story.",
      structure: "Present (Current status & core skills) -> Past (Notable achievements or college projects) -> Future (Why this specific company & role).",
      modelAnswer: "I'm a Computer Science graduate with a strong passion for full-stack engineering and distributed systems. Over the past couple of years, I've built several production-grade applications, including an open-source real-time collaboration tool that attracted over 1,500 active users. Through that, I honed my skills in React, Go, and PostgreSQL, along with solving 350+ DSA problems on LeetCode. I'm excited about this opportunity at your company because of your engineering culture around massive scalability and the opportunity to contribute to high-impact products."
    },
    {
      id: "hr-2",
      question: "Why do you want to join our company?",
      intent: "Tests whether you researched the company culture, technology stack, and business model.",
      structure: "Specific company achievement/product -> Engineering culture alignment -> How your skills add value.",
      modelAnswer: "I have followed your recent work on distributed payment infrastructure, particularly the engineering blog post regarding zero-downtime database migrations. What excites me most is your focus on engineering craftsmanship and customer trust. Given my solid foundation in systems programming, data structures, and database optimization, I want to work in an environment that tackles challenging scale problems while learning alongside top-tier mentors."
    },
    {
      id: "hr-3",
      question: "What are your greatest strengths and weaknesses?",
      intent: "Tests self-awareness, honesty, and proactive attitude towards self-improvement.",
      structure: "Strength (Back it up with evidence) + Weakness (Genuine area of growth + specific steps you are taking to overcome it).",
      modelAnswer: "My greatest strength is my curiosity and perseverance when debugging complex, edge-case problems. I don't stop at making code work; I seek to understand the root cause. For my weakness, earlier I found it difficult to say 'no' to feature requests, which sometimes spread my focus too thin. Recently, I've started adopting agile estimation frameworks and time-boxing my commitments, which has drastically improved my delivery consistency."
    },
    {
      id: "hr-4",
      question: "Tell me about a time you had a disagreement with a team member. How did you resolve it?",
      intent: "Assesses conflict management, maturity, emotional intelligence, and team collaboration.",
      structure: "Describe disagreement objectively -> Focus on data/pros & cons -> Prioritize team goals over ego.",
      modelAnswer: "In our capstone project, my teammate and I disagreed on whether to use MongoDB or PostgreSQL. He favored Mongo for schema flexibility, while I advocated for Postgres due to our relational transaction requirements. Instead of arguing theoretically, we built a 1-day proof of concept benchmarking both for our specific queries. The benchmark clearly showed PostgreSQL prevented data inconsistency during our transaction tests. We mutually agreed on Postgres, documented our rationale, and delivered the project on time."
    },
    {
      id: "hr-5",
      question: "Where do you see yourself in 3 to 5 years?",
      intent: "Measures career ambition, stability, and whether your growth aspirations align with the company.",
      structure: "Mastery of current role -> Technical depth/ownership -> Mentorship & architectural impact.",
      modelAnswer: "Over the next 2-3 years, my goal is to develop deep domain expertise in the systems I work on, becoming a trusted, go-to engineer on the team. In 5 years, I envision taking on technical ownership of major architectural initiatives, mentoring junior engineers, and contributing to cross-functional product strategy."
    }
  ],

  questionsToAskInterviewer: [
    "What does a typical day look like for a software engineer on this specific team?",
    "How does the engineering team balance shipping new features with paying down technical debt?",
    "What are the biggest technical challenges the team is planning to tackle in the next 6 to 12 months?",
    "What metrics or milestones define success for someone in this role during their first 90 days?"
  ]
};
