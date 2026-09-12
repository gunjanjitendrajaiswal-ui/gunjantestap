// Main Application Controller for GunjanCore
import { store } from './store.js';
import { renderJobsView } from './components/jobsView.js';
import { renderTrackerView } from './components/trackerView.js';
import { renderDsaView } from './components/dsaView.js';
import { renderPrepView } from './components/prepView.js';
import { renderCompaniesView } from './components/companiesView.js';
import { dsaTopics } from './data/dsaData.js';
import { companiesData } from './data/companiesData.js';
import { technicalCoreData } from './data/prepData.js';

class App {
  constructor() {
    this.mainContainer = document.getElementById('app-main-content');
    this.initTheme();
    this.initAuth();
    this.initNavigation();
    this.initUniversalSearch();
    this.initToastSystem();
    this.subscribeStore();

    // Initial View
    this.renderCurrentView();

    // Initial Load: If user is not logged in, show the Welcome Sign-Up Gateway on the first page!
    if (!store.isLoggedIn()) {
      setTimeout(() => {
        this.openWelcomeSignupModal();
      }, 250);
    }
  }

  // Theme Management
  initTheme() {
    this.applyTheme(store.theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        store.toggleTheme();
      });
    }

    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', () => {
        store.toggleTheme();
      });
    }
  }

  applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);

    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');

    if (icon) {
      icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      icon.className = isDark ? 'w-4 h-4 text-amber-400' : 'w-4 h-4 text-indigo-500';
    }

    if (text) {
      text.textContent = isDark ? 'Dark Mode' : 'Light Mode';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Google Authentication System
  initAuth() {
    this.renderAuthNav();
  }

  renderAuthNav() {
    const container = document.getElementById('auth-nav-container');
    if (!container) return;

    if (store.isLoggedIn()) {
      const u = store.user;
      container.innerHTML = `
        <div class="relative group">
          <button id="user-profile-btn" class="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 transition">
            <span class="text-xs font-semibold text-slate-200 hidden md:inline">${u.name.split(' ')[0]}</span>
            <img src="${u.avatar}" alt="${u.name}" class="w-6 h-6 rounded-lg object-cover ring-1 ring-emerald-500" />
            <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
          </button>

          <!-- Dropdown Profile Menu -->
          <div class="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 hidden group-hover:block animate-fade-in z-50">
            <div class="p-2.5 border-b border-slate-800">
              <div class="text-xs font-bold text-white">${u.name}</div>
              <div class="text-[10px] text-slate-400 truncate">${u.email}</div>
              <div class="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Google Verified</span>
              </div>
            </div>
            <button id="auth-signout-btn" class="w-full mt-1.5 p-2 rounded-lg text-left text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      `;

      container.querySelector('#auth-signout-btn').addEventListener('click', () => {
        store.signOut();
        this.renderAuthNav();
        if (window.showToast) {
          window.showToast("Signed out successfully.", "info");
        }
      });
    } else {
      container.innerHTML = `
        <div class="flex items-center gap-2">
          <!-- Sign In with Google -->
          <button 
            id="google-signin-btn" 
            class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-md border border-slate-200 transition transform active:scale-95 shrink-0"
            title="Sign in with Google"
          >
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span class="hidden sm:inline">Google Sign In</span>
            <span class="sm:hidden">Google</span>
          </button>

          <!-- Sign Up Gateway Trigger -->
          <button 
            id="nav-signup-btn"
            class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition transform active:scale-95 hidden sm:inline-block"
          >
            Sign Up
          </button>
        </div>
      `;

      container.querySelector('#google-signin-btn').addEventListener('click', () => {
        this.openGoogleAuthModal();
      });

      const navSignup = container.querySelector('#nav-signup-btn');
      if (navSignup) {
        navSignup.addEventListener('click', () => {
          this.openWelcomeSignupModal();
        });
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Welcome First-Page Sign-Up Gateway
  openWelcomeSignupModal() {
    const modal = document.getElementById('global-modal-container');
    modal.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
          
          <!-- Top Welcome Header -->
          <div class="p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-center relative border-b border-slate-800">
            <button id="close-welcome-modal" class="absolute right-4 top-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800/60 transition">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center mx-auto shadow-xl font-black text-white text-xl mb-3">
              GC
            </div>
            
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
              <span>GunjanCore • All-in-One Placement Hub</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create Your Account</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
              Sign in or create your free account to track 160+ DSA problems, practice Aptitude quizzes, and apply to tech jobs.
            </p>
          </div>

          <!-- Body -->
          <div class="p-6 sm:p-7 space-y-4">
            <!-- Big Google Sign-In Button -->
            <button 
              id="welcome-google-btn" 
              class="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 shadow-lg border border-slate-200 transition transform active:scale-95"
            >
              <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google (Fast 1-Click)</span>
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-2 text-slate-500 text-xs">
              <div class="flex-1 h-px bg-slate-800"></div>
              <span>or sign up with email</span>
              <div class="flex-1 h-px bg-slate-800"></div>
            </div>

            <!-- Email Registration Form -->
            <form id="welcome-signup-form" class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="welcome-name" 
                  required 
                  value="Gunjan Sharma" 
                  placeholder="e.g. Gunjan Sharma" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="welcome-email" 
                  required 
                  value="gunjan.sharma@gmail.com" 
                  placeholder="e.g. gunjan@example.com" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Target Role</label>
                <select id="welcome-role" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Software Development Engineer (SDE-1)</option>
                  <option>Frontend Engineer (React / Next.js)</option>
                  <option>Backend Engineer (Go / Java / Python)</option>
                  <option>Full Stack Developer</option>
                  <option>College Fresher / 2026 Batch</option>
                </select>
              </div>

              <button 
                type="submit" 
                class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
              >
                Complete Free Registration
              </button>
            </form>

            <!-- Skip / Guest Link -->
            <div class="pt-3 text-center border-t border-slate-800">
              <button id="welcome-skip-btn" class="text-xs text-slate-400 hover:text-indigo-400 font-semibold inline-flex items-center gap-1.5 transition">
                <span>Want to explore first? Continue as Guest</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Close on X
    modal.querySelector('#close-welcome-modal').addEventListener('click', () => {
      modal.innerHTML = '';
    });

    // Skip to guest
    modal.querySelector('#welcome-skip-btn').addEventListener('click', () => {
      modal.innerHTML = '';
      if (window.showToast) {
        window.showToast("Exploring as Guest. You can sign in anytime from the top bar!", "info");
      }
    });

    // Fast Google Sign-in from welcome modal
    modal.querySelector('#welcome-google-btn').addEventListener('click', () => {
      modal.innerHTML = '';
      this.openGoogleAuthModal();
    });

    // Submit Email form
    modal.querySelector('#welcome-signup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modal.querySelector('#welcome-name').value;
      const email = modal.querySelector('#welcome-email').value;
      const user = store.signInWithGoogle({
        name,
        email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      });
      modal.innerHTML = '';
      this.renderAuthNav();
      if (window.showToast) {
        window.showToast(`Welcome to GunjanCore, ${user.name}! Your account is now active.`, "success");
      }
    });
  }

  openGoogleAuthModal() {
    const modal = document.getElementById('global-modal-container');
    modal.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-sm rounded-2xl bg-white text-slate-900 shadow-2xl p-6 border border-slate-200">
          
          <!-- Google Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span class="font-bold text-sm text-slate-800">Sign in with Google</span>
            </div>
            <button id="close-google-modal" class="text-slate-400 hover:text-slate-600 p-1">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="mt-4 text-center">
            <h3 class="font-bold text-base text-slate-900">Choose an account</h3>
            <p class="text-xs text-slate-500 mt-0.5">to continue to <span class="font-semibold text-indigo-600">GunjanCore</span></p>
          </div>

          <!-- Account Options -->
          <div class="mt-5 space-y-2.5">
            <button id="select-primary-google-account" class="w-full p-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-between text-left transition group">
              <div class="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Gunjan" class="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30" />
                <div>
                  <div class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Gunjan Sharma</div>
                  <div class="text-[11px] text-slate-500">gunjan.sharma@gmail.com</div>
                </div>
              </div>
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
            </button>

            <!-- Custom account input toggle -->
            <div class="pt-2 border-t border-slate-100">
              <button id="toggle-custom-google-account" class="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5 w-full py-1.5">
                <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
                <span>Use another Google account</span>
              </button>

              <form id="custom-google-form" class="hidden mt-3 space-y-3">
                <input type="text" id="custom-google-name" required placeholder="Your Full Name" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" id="custom-google-email" required placeholder="name@gmail.com" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" class="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
                  Sign in with this account
                </button>
              </form>
            </div>
          </div>

          <div class="mt-6 text-center text-[10px] text-slate-400 leading-relaxed">
            To continue, Google will share your name, email address, and profile picture with GunjanCore.
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.querySelector('#close-google-modal').addEventListener('click', () => modal.innerHTML = '');

    // Select primary default account
    modal.querySelector('#select-primary-google-account').addEventListener('click', () => {
      const user = store.signInWithGoogle({
        name: "Gunjan Sharma",
        email: "gunjan.sharma@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      });
      modal.innerHTML = '';
      this.renderAuthNav();
      if (window.showToast) {
        window.showToast(`Signed in as ${user.name} via Google!`, "success");
      }
    });

    // Toggle custom account form
    const toggleBtn = modal.querySelector('#toggle-custom-google-account');
    const customForm = modal.querySelector('#custom-google-form');
    toggleBtn.addEventListener('click', () => {
      customForm.classList.toggle('hidden');
    });

    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modal.querySelector('#custom-google-name').value;
      const email = modal.querySelector('#custom-google-email').value;
      const user = store.signInWithGoogle({
        name,
        email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
      });
      modal.innerHTML = '';
      this.renderAuthNav();
      if (window.showToast) {
        window.showToast(`Welcome ${user.name}! Signed in via Google.`, "success");
      }
    });
  }

  initNavigation() {
    // Nav tab buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  switchTab(tab) {
    store.setActiveTab(tab);
    this.updateNavUI();
    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateNavUI() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      const isActive = store.activeTab === tab;

      if (isActive) {
        btn.classList.add('text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/30');
        btn.classList.remove('text-slate-400', 'border-transparent');
      } else {
        btn.classList.remove('text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/30');
        btn.classList.add('text-slate-400', 'border-transparent');
      }
    });

    // Update Nav Badges
    const dsaBadge = document.getElementById('nav-dsa-badge');
    if (dsaBadge) {
      const stats = store.getDsaStats();
      dsaBadge.textContent = `${stats.percentage}%`;
    }

    const trackerBadge = document.getElementById('nav-tracker-badge');
    if (trackerBadge) {
      trackerBadge.textContent = store.applications.length;
    }
  }

  renderCurrentView() {
    this.mainContainer.innerHTML = '';

    switch (store.activeTab) {
      case 'jobs':
        renderJobsView(this.mainContainer);
        break;
      case 'tracker':
        renderTrackerView(this.mainContainer);
        break;
      case 'dsa':
        renderDsaView(this.mainContainer);
        break;
      case 'prep':
        renderPrepView(this.mainContainer);
        break;
      case 'companies':
        renderCompaniesView(this.mainContainer);
        break;
      default:
        renderJobsView(this.mainContainer);
    }
  }

  subscribeStore() {
    store.subscribe((event, data) => {
      this.updateNavUI();
      if (event === 'tab_change') {
        this.renderCurrentView();
      }
      if (event === 'theme_change') {
        this.applyTheme(data);
      }
      if (event === 'user_change') {
        this.renderAuthNav();
      }
    });
  }

  initToastSystem() {
    window.showToast = (message, type = 'info') => {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      const bgColors = {
        success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
        info: 'bg-slate-900/90 border-indigo-500/50 text-indigo-200',
        warning: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
        error: 'bg-rose-950/90 border-rose-500/50 text-rose-200'
      };

      const icons = {
        success: 'check-circle-2',
        info: 'info',
        warning: 'alert-triangle',
        error: 'x-circle'
      };

      toast.className = `p-4 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-semibold flex items-center gap-3 animate-fade-in transition duration-300 ${bgColors[type] || bgColors.info}`;
      toast.innerHTML = `
        <i data-lucide="${icons[type] || 'info'}" class="w-4 h-4 shrink-0"></i>
        <span>${message}</span>
      `;

      container.appendChild(toast);
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    };
  }

  initUniversalSearch() {
    const searchModal = document.getElementById('universal-search-modal');
    const searchInput = document.getElementById('universal-search-input');
    const searchResults = document.getElementById('universal-search-results');
    const openSearchBtns = document.querySelectorAll('.open-universal-search-trigger');
    const closeSearchBtn = document.getElementById('close-search-modal');

    const openSearch = () => {
      searchModal.classList.remove('hidden');
      searchInput.value = '';
      searchInput.focus();
      this.performUniversalSearch('', searchResults);
    };

    const closeSearch = () => {
      searchModal.classList.add('hidden');
    };

    openSearchBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

    // Keyboard shortcut (Ctrl+K / Cmd+K / Esc)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal.classList.contains('hidden')) {
          openSearch();
        } else {
          closeSearch();
        }
      }
      if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
        closeSearch();
      }
    });

    searchInput.addEventListener('input', (e) => {
      this.performUniversalSearch(e.target.value, searchResults);
    });
  }

  performUniversalSearch(query, resultsContainer) {
    const q = query.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = `
        <div class="p-6 text-center text-slate-500 text-xs">
          Type to search across jobs, 160+ DSA problems, CS core topics, and company guides...
        </div>
      `;
      return;
    }

    const results = [];

    // Search Jobs
    store.jobs.forEach(job => {
      if (job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({
          type: 'Job',
          title: job.title,
          subtitle: `${job.company} • ${job.location}`,
          icon: 'briefcase',
          color: 'text-indigo-400',
          action: () => this.switchTab('jobs')
        });
      }
    });

    // Search DSA
    dsaTopics.forEach(topic => {
      topic.problems.forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.companies.some(c => c.toLowerCase().includes(q))) {
          results.push({
            type: 'DSA Problem',
            title: p.title,
            subtitle: `${topic.title} • ${p.difficulty} • ${p.companies.join(', ')}`,
            icon: 'code',
            color: 'text-emerald-400',
            action: () => this.switchTab('dsa')
          });
        }
      });
    });

    // Search Companies
    companiesData.forEach(comp => {
      if (comp.name.toLowerCase().includes(q) || comp.examPattern.keyTopics.some(t => t.toLowerCase().includes(q))) {
        results.push({
          type: 'Company Guide',
          title: comp.name,
          subtitle: `${comp.tier} • Exam Pattern & Syllabus`,
          icon: 'building-2',
          color: 'text-blue-400',
          action: () => this.switchTab('companies')
        });
      }
    });

    // Search Technical Core CS
    technicalCoreData.forEach(subject => {
      subject.topics.forEach(t => {
        if (t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)) {
          results.push({
            type: 'Core CS Note',
            title: t.title,
            subtitle: `${subject.subject} • Interview Takeaway`,
            icon: 'cpu',
            color: 'text-purple-400',
            action: () => this.switchTab('prep')
          });
        }
      });
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          No matches found for "<span class="text-white font-semibold">${query}</span>".
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="divide-y divide-slate-800/80 max-h-96 overflow-y-auto">
        ${results.slice(0, 10).map((r, i) => `
          <button class="search-result-item w-full p-3.5 flex items-center justify-between hover:bg-slate-800/60 transition text-left" data-result-idx="${i}">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <i data-lucide="${r.icon}" class="w-4 h-4 ${r.color}"></i>
              </div>
              <div>
                <div class="text-xs font-bold text-slate-200">${r.title}</div>
                <div class="text-[11px] text-slate-400 truncate max-w-sm">${r.subtitle}</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900 border border-slate-800 text-slate-400">
              ${r.type}
            </span>
          </button>
        `).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-result-idx'), 10);
        document.getElementById('universal-search-modal').classList.add('hidden');
        results[idx].action();
      });
    });
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
