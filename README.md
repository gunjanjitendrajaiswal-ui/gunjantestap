# GunjanCore - All-in-One Job Portal & Placement Preparation Platform

**GunjanCore** is a modern, responsive web application engineered to bridge the gap between job discovery, company hiring intelligence, core placement preparation, and structured topic-wise Data Structures & Algorithms practice.

---

## 🚀 Features Overview

### 1. 🔑 Google Sign-In & Personalized Profile
- **One-Tap Google Authentication**: Dedicated "Sign in with Google" button with account selector modal (defaulting to Gunjan Sharma with avatar, or sign-in with any Google account).
- **Persistent Session**: Logged-in profile state is remembered across refreshes via LocalStorage.
- **Easy Apply Auto-Fill**: Automatically fills applicant credentials and generates verified resume attachments (`Gunjan_Sharma_SDE_Resume.pdf`).

### 2. 🌓 Seamless Light / Dark Mode Toggle
- **Instant Mode Switcher**: Prominently placed in the top navigation header and mobile drawer.
- **Full Contrast Support**: High-contrast, polished styling for both dark and clean light modes with smooth CSS transitions.

### 3. 💼 Tech Job Portal & Application Tracker
- **Smart Job Search & Filters**: Search across software engineering, frontend, backend, full-stack, AI/ML, and intern roles. Filter by domain, work mode (Remote/Hybrid/On-site), experience tier, and CTC.
- **Detailed Job Specifications**: Full descriptions, key responsibilities, required qualifications, transparent salary packages, and perks.
- **Kanban Application Tracker**: Move applications across 6 workflow stages (*Bookmarked &rarr; Applied &rarr; Online Assessment &rarr; Technical Rounds &rarr; Offer Received &rarr; Archived*) with interview notes and status tracking.
- **Recruiter Job Posting**: Post custom job openings with instant listing updates and browser persistence.

### 4. ⚡ Dedicated Topic-Wise DSA Preparation Sheet
- **12 Comprehensive Algorithmic Topics**: Arrays & Hashing, Two Pointers & Sliding Window, Stacks & Queues, Linked Lists, Binary Search, Trees & BSTs, Heaps & Priority Queues, Graphs, Dynamic Programming, Greedy Algorithms, Backtracking, and Bit Manipulation.
- **Curated High-Frequency Problems**: SDE sheet problems asked at Google, Amazon, Microsoft, and Meta.
- **Interactive Tracking**:
  - Solved checkboxes with live progress calculation (% completed and Easy/Medium/Hard breakdown).
  - Star / Bookmark problems for pre-interview revision.
  - Optimal Time & Space complexity badges.
  - Personal code scratchpad and hint notes modal per problem.
  - Direct LeetCode external practice links.

### 5. 📚 Preparation Hub (Aptitude, Core CS & HR)
- **Quantitative, Logical & Verbal Aptitude**:
  - Key formulas, speed shortcuts, and theorem sheets (Time & Work, Speed-Distance, Profit & Loss, Probability, Syllogisms, Blood Relations, Grammar rules).
  - **Interactive Timed Practice Quiz**: Multi-choice quiz engine with instant score calculation, question review, and step-by-step solutions.
- **Core Computer Science Subjects**:
  - **Operating Systems**: Processes vs Threads, Deadlocks (4 Coffman conditions), Virtual Memory & Paging, and code samples.
  - **DBMS & SQL**: ACID guarantees, 1NF-BCNF Normalization, B-Tree vs Hash indexing, and high-yield SQL interview queries.
  - **Computer Networks**: OSI vs TCP/IP, TCP 3-Way Handshake, DNS resolution flow, HTTP vs HTTPS.
  - **OOP & System Design**: 4 pillars with code examples, SOLID principles, Caching, Load Balancing, and CAP Theorem.
- **HR & Behavioral Section**:
  - In-depth guide on the **STAR Method** (Situation, Task, Action, Result) with real tech examples.
  - Top 30 HR interview questions with recruiter intent, recommended answer structures, and model scripts.
  - Winning questions to ask the interviewer.

### 6. 🏢 Company Hiring Process & Placement Blueprints
- **Top Tech Employers**: Google, Amazon, Microsoft, TCS (Ninja/Digital/Prime), Infosys (SE/DSE/SP), Razorpay, etc.
- **Exhaustive Blueprints**:
  - Eligibility Cutoffs (CGPA, active backlog rules, allowed academic gaps).
  - Round-by-Round Timeline & durations.
  - Online Assessment patterns (platforms, allowed languages, sectional timings).
  - High-yield syllabus and company-specific preparation tips.

### 7. 🔍 Global Productivity Features
- **Spotlight Search (`Ctrl + K` / `Cmd + K`)**: Instantly search across jobs, 160+ DSA problems, CS core notes, and company interview patterns.

---

## 💻 How to Run GunjanCore

Because GunjanCore is built with modern ES Modules, Tailwind CSS, and Lucide icons, **no compilation, bundler, or build step is required**.

### Method 1: Local HTTP Server (Active)
```powershell
# Open terminal in project folder:
C:\Users\LOQ\.gemini\antigravity\scratch\prep-job-hub\

# Start server:
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080
# Or double-click: run_server.bat
```
Visit: **http://localhost:8080**

### Method 2: Direct Browser Launch
Open [index.html](file:///C:/Users/LOQ/.gemini/antigravity/scratch/prep-job-hub/index.html) in Google Chrome.
