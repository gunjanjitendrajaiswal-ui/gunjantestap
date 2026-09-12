// State Management & LocalStorage Persistence Engine for GunjanCore
import { initialJobs } from './data/jobsData.js';
import { dsaTopics } from './data/dsaData.js';

class Store {
  constructor() {
    this.STORAGE_KEY_DSA_SOLVED = 'gunjancore_dsa_solved_v1';
    this.STORAGE_KEY_DSA_STARRED = 'gunjancore_dsa_starred_v1';
    this.STORAGE_KEY_DSA_NOTES = 'gunjancore_dsa_notes_v1';
    this.STORAGE_KEY_JOBS = 'gunjancore_jobs_v1';
    this.STORAGE_KEY_APPLICATIONS = 'gunjancore_applications_v1';
    this.STORAGE_KEY_SAVED_JOBS = 'gunjancore_saved_jobs_v1';
    this.STORAGE_KEY_THEME = 'gunjancore_theme_v1';
    this.STORAGE_KEY_QUIZ_HISTORY = 'gunjancore_quiz_history_v1';
    this.STORAGE_KEY_USER = 'gunjancore_user_v1';

    this.listeners = [];
    this.init();
  }

  init() {
    // Load DSA solved set (with fallback to previous storage key if any)
    const savedSolved = localStorage.getItem(this.STORAGE_KEY_DSA_SOLVED) || localStorage.getItem('careerforge_dsa_solved_v1');
    this.dsaSolved = new Set(savedSolved ? JSON.parse(savedSolved) : ["dsa-1", "dsa-8", "dsa-21"]);

    // Load DSA starred set
    const savedStarred = localStorage.getItem(this.STORAGE_KEY_DSA_STARRED) || localStorage.getItem('careerforge_dsa_starred_v1');
    this.dsaStarred = new Set(savedStarred ? JSON.parse(savedStarred) : ["dsa-4", "dsa-25"]);

    // Load DSA notes
    const savedNotes = localStorage.getItem(this.STORAGE_KEY_DSA_NOTES) || localStorage.getItem('careerforge_dsa_notes_v1');
    this.dsaNotes = savedNotes ? JSON.parse(savedNotes) : {
      "dsa-1": "Classic Two Sum: Map complement to index. Watch out for duplicate elements!",
      "dsa-25": "LRU Cache: Use Doubly Linked List with head/tail dummy nodes + Hash Map for O(1) ops."
    };

    // Load Custom / Initial Jobs
    const savedJobs = localStorage.getItem(this.STORAGE_KEY_JOBS) || localStorage.getItem('careerforge_jobs_v1');
    this.jobs = savedJobs ? JSON.parse(savedJobs) : [...initialJobs];

    // Load Saved Jobs
    const savedBookmarks = localStorage.getItem(this.STORAGE_KEY_SAVED_JOBS) || localStorage.getItem('careerforge_saved_jobs_v1');
    this.savedJobs = new Set(savedBookmarks ? JSON.parse(savedBookmarks) : ["job-1", "job-5"]);

    // Load Applications
    const savedApps = localStorage.getItem(this.STORAGE_KEY_APPLICATIONS) || localStorage.getItem('careerforge_applications_v1');
    this.applications = savedApps ? JSON.parse(savedApps) : [
      {
        id: "app-1",
        jobId: "job-1",
        jobTitle: "Junior Software Development Engineer (SDE-1)",
        company: "Google",
        location: "Bangalore, India",
        salary: "₹18,00,000 - ₹24,00,000 / yr",
        appliedDate: "2026-03-01",
        stage: "screening",
        notes: "OA cleared with 100% test cases. Waiting for technical phone screen invite."
      },
      {
        id: "app-2",
        jobId: "job-2",
        jobTitle: "Frontend React Engineer",
        company: "Razorpay",
        location: "Bengaluru, India",
        salary: "₹14,00,000 - ₹20,00,000 / yr",
        appliedDate: "2026-03-05",
        stage: "interview",
        notes: "Technical round scheduled on Friday covering React rendering cycle & Web Vitals."
      },
      {
        id: "app-3",
        jobId: "job-5",
        jobTitle: "Software Engineer Intern (Summer 2026)",
        company: "Microsoft",
        location: "Noida / Hyderabad",
        salary: "₹1,25,000 / month",
        appliedDate: "2026-02-20",
        stage: "offer",
        notes: "Received official Summer Internship offer letter! Joining date in May."
      }
    ];

    // Load theme
    this.theme = localStorage.getItem(this.STORAGE_KEY_THEME) || localStorage.getItem('careerforge_theme_v1') || 'dark';

    // Load Quiz results
    const savedQuiz = localStorage.getItem(this.STORAGE_KEY_QUIZ_HISTORY) || localStorage.getItem('careerforge_quiz_history_v1');
    this.quizHistory = savedQuiz ? JSON.parse(savedQuiz) : [];

    // Load User Auth (Google Sign-In)
    const savedUser = localStorage.getItem(this.STORAGE_KEY_USER);
    this.user = savedUser ? JSON.parse(savedUser) : null;

    // Active Tab state
    this.activeTab = 'jobs';
  }

  // Event Subscription
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event, data) {
    this.listeners.forEach(cb => cb(event, data));
  }

  // Google User Authentication
  signInWithGoogle(userData = null) {
    this.user = userData || {
      name: "Gunjan Sharma",
      email: "gunjan.sharma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      provider: "google",
      loginTime: new Date().toLocaleTimeString()
    };
    localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(this.user));
    this.notify('user_change', this.user);
    return this.user;
  }

  signOut() {
    this.user = null;
    localStorage.removeItem(this.STORAGE_KEY_USER);
    this.notify('user_change', null);
  }

  isLoggedIn() {
    return !!this.user;
  }

  // Theme Management
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem(this.STORAGE_KEY_THEME, theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    this.notify('theme_change', theme);
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  // Navigation
  setActiveTab(tab) {
    this.activeTab = tab;
    this.notify('tab_change', tab);
  }

  // DSA State Methods
  toggleDsaSolved(problemId) {
    if (this.dsaSolved.has(problemId)) {
      this.dsaSolved.delete(problemId);
    } else {
      this.dsaSolved.add(problemId);
    }
    localStorage.setItem(this.STORAGE_KEY_DSA_SOLVED, JSON.stringify(Array.from(this.dsaSolved)));
    this.notify('dsa_updated', { type: 'solve', problemId });
  }

  isDsaSolved(problemId) {
    return this.dsaSolved.has(problemId);
  }

  toggleDsaStar(problemId) {
    if (this.dsaStarred.has(problemId)) {
      this.dsaStarred.delete(problemId);
    } else {
      this.dsaStarred.add(problemId);
    }
    localStorage.setItem(this.STORAGE_KEY_DSA_STARRED, JSON.stringify(Array.from(this.dsaStarred)));
    this.notify('dsa_updated', { type: 'star', problemId });
  }

  isDsaStarred(problemId) {
    return this.dsaStarred.has(problemId);
  }

  saveDsaNote(problemId, note) {
    if (note && note.trim()) {
      this.dsaNotes[problemId] = note.trim();
    } else {
      delete this.dsaNotes[problemId];
    }
    localStorage.setItem(this.STORAGE_KEY_DSA_NOTES, JSON.stringify(this.dsaNotes));
    this.notify('dsa_updated', { type: 'note', problemId });
  }

  getDsaNote(problemId) {
    return this.dsaNotes[problemId] || '';
  }

  // Get DSA Completion Statistics
  getDsaStats() {
    let totalProblems = 0;
    let totalSolved = 0;
    const topicStats = {};
    const difficultyStats = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 }
    };

    dsaTopics.forEach(topic => {
      let topicSolved = 0;
      topic.problems.forEach(problem => {
        totalProblems++;
        const solved = this.dsaSolved.has(problem.id);
        if (solved) totalSolved++;
        if (solved) topicSolved++;

        if (difficultyStats[problem.difficulty]) {
          difficultyStats[problem.difficulty].total++;
          if (solved) difficultyStats[problem.difficulty].solved++;
        }
      });

      topicStats[topic.id] = {
        title: topic.title,
        total: topic.problems.length,
        solved: topicSolved,
        percent: topic.problems.length ? Math.round((topicSolved / topic.problems.length) * 100) : 0
      };
    });

    return {
      totalProblems,
      totalSolved,
      percentage: totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0,
      topicStats,
      difficultyStats
    };
  }

  // Jobs & Applications
  toggleSaveJob(jobId) {
    if (this.savedJobs.has(jobId)) {
      this.savedJobs.delete(jobId);
    } else {
      this.savedJobs.add(jobId);
    }
    localStorage.setItem(this.STORAGE_KEY_SAVED_JOBS, JSON.stringify(Array.from(this.savedJobs)));
    this.notify('jobs_updated', { type: 'bookmark', jobId });
  }

  isJobSaved(jobId) {
    return this.savedJobs.has(jobId);
  }

  addJob(jobData) {
    const newJob = {
      id: `custom-job-${Date.now()}`,
      postedDate: 'Just now',
      isUrgent: false,
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=60',
      ...jobData
    };
    this.jobs.unshift(newJob);
    localStorage.setItem(this.STORAGE_KEY_JOBS, JSON.stringify(this.jobs));
    this.notify('jobs_updated', { type: 'add', job: newJob });
    return newJob;
  }

  applyForJob(jobId, applicationDetails = {}) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return null;

    const existing = this.applications.find(a => a.jobId === jobId);
    if (existing) return existing;

    const applicantName = this.user ? this.user.name : "Gunjan Sharma";

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'applied',
      notes: applicationDetails.notes || `Applied by ${applicantName} via GunjanCore Easy Apply.`
    };

    this.applications.unshift(newApp);
    localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(this.applications));
    this.notify('applications_updated', { type: 'new_application', application: newApp });
    return newApp;
  }

  updateApplicationStage(appId, newStage) {
    const app = this.applications.find(a => a.id === appId);
    if (app) {
      app.stage = newStage;
      localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(this.applications));
      this.notify('applications_updated', { type: 'stage_change', appId, newStage });
    }
  }

  updateApplicationNotes(appId, notes) {
    const app = this.applications.find(a => a.id === appId);
    if (app) {
      app.notes = notes;
      localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(this.applications));
      this.notify('applications_updated', { type: 'notes_change', appId });
    }
  }

  deleteApplication(appId) {
    this.applications = this.applications.filter(a => a.id !== appId);
    localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(this.applications));
    this.notify('applications_updated', { type: 'delete', appId });
  }

  // Quiz History
  recordQuizScore(score, total, topic) {
    const entry = {
      id: `quiz-${Date.now()}`,
      date: new Date().toLocaleString(),
      topic,
      score,
      total,
      percent: Math.round((score / total) * 100)
    };
    this.quizHistory.unshift(entry);
    localStorage.setItem(this.STORAGE_KEY_QUIZ_HISTORY, JSON.stringify(this.quizHistory.slice(0, 20)));
    this.notify('quiz_updated', entry);
    return entry;
  }
}

export const store = new Store();
