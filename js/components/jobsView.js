// Jobs View Component for CareerForge
import { store } from '../store.js';
import { jobCategories, jobExperienceLevels, jobModes } from '../data/jobsData.js';

export function renderJobsView(container) {
  let activeCategory = "All Categories";
  let activeExp = "All Experience";
  let activeMode = "All Modes";
  let searchQuery = "";
  let onlySaved = false;

  function getFilteredJobs() {
    return store.jobs.filter(job => {
      const matchCat = activeCategory === "All Categories" || job.category === activeCategory;
      const matchExp = activeExp === "All Experience" || job.experience === activeExp;
      const matchMode = activeMode === "All Modes" || job.mode === activeMode;
      const matchSaved = !onlySaved || store.isJobSaved(job.id);
      const matchQuery = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchExp && matchMode && matchSaved && matchQuery;
    });
  }

  function render() {
    const jobs = getFilteredJobs();

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Hero & Search Header -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900/80 p-8 border border-indigo-500/20 glass-panel">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Over 1,200+ Verified Tech Opportunities</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Land Your Dream Tech Role
            </h1>
            <p class="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore curated software engineering, frontend, backend, and fresher opportunities with transparent salaries and direct applicant tracking.
            </p>
          </div>

          <!-- Search & Action Bar -->
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <i data-lucide="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"></i>
              <input 
                type="text" 
                id="job-search-input"
                value="${searchQuery}"
                placeholder="Search by role, company, skills (e.g. React, Python, SDE-1)..."
                class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/70 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-inner transition"
              />
              ${searchQuery ? `
                <button id="clear-search-btn" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              ` : ''}
            </div>

            <button 
              id="open-post-job-modal-btn"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
            >
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Post a Job</span>
            </button>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="glass-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-700/50">
          <div class="flex flex-wrap items-center gap-3">
            <!-- Category Filter -->
            <div class="relative">
              <select id="filter-category" class="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                ${jobCategories.map(cat => `<option value="${cat}" ${activeCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
              </select>
            </div>

            <!-- Experience Filter -->
            <div class="relative">
              <select id="filter-exp" class="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                ${jobExperienceLevels.map(exp => `<option value="${exp}" ${activeExp === exp ? 'selected' : ''}>${exp}</option>`).join('')}
              </select>
            </div>

            <!-- Mode Filter -->
            <div class="relative">
              <select id="filter-mode" class="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                ${jobModes.map(mode => `<option value="${mode}" ${activeMode === mode ? 'selected' : ''}>${mode}</option>`).join('')}
              </select>
            </div>

            <!-- Bookmarked toggle -->
            <button 
              id="toggle-saved-filter" 
              class="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${onlySaved ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-900 text-slate-400 border border-slate-700 hover:text-slate-200'}"
            >
              <i data-lucide="bookmark" class="w-3.5 h-3.5 ${onlySaved ? 'fill-amber-400' : ''}"></i>
              <span>Saved Only</span>
            </button>
          </div>

          <!-- Total results count -->
          <div class="text-xs text-slate-400 font-medium">
            Showing <span class="text-indigo-400 font-bold">${jobs.length}</span> open positions
          </div>
        </div>

        <!-- Job Cards Grid -->
        ${jobs.length === 0 ? `
          <div class="glass-panel rounded-2xl p-12 text-center border border-slate-800">
            <div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <i data-lucide="briefcase-off" class="w-8 h-8"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-200">No matching jobs found</h3>
            <p class="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Try resetting filters or adjusting your search keywords to view other open positions.</p>
            <button id="reset-all-filters-btn" class="mt-4 px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold transition">
              Reset Filters
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${jobs.map(job => renderJobCard(job)).join('')}
          </div>
        `}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    attachEventListeners();
  }

  function renderJobCard(job) {
    const isSaved = store.isJobSaved(job.id);
    const hasApplied = store.applications.some(a => a.jobId === job.id);

    return `
      <div class="glass-panel rounded-xl p-5 border border-slate-800 hover:border-indigo-500/40 card-hover flex flex-col justify-between transition group relative" data-job-id="${job.id}">
        <div>
          <!-- Header: Logo, Title, Bookmark -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-white/90 p-2 flex items-center justify-center shadow-sm border border-slate-200/20 shrink-0">
                <img src="${job.logo}" alt="${job.company}" class="w-full h-full object-contain" onerror="this.src='https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100'"/>
              </div>
              <div>
                <h3 class="font-semibold text-slate-100 group-hover:text-indigo-300 transition text-base leading-snug">
                  ${job.title}
                </h3>
                <div class="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                  <span class="font-medium text-slate-300">${job.company}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-3 h-3 text-slate-500"></i>
                    ${job.location}
                  </span>
                </div>
              </div>
            </div>

            <!-- Save Bookmark Button -->
            <button 
              class="btn-save-job p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition"
              data-id="${job.id}"
              title="${isSaved ? 'Remove from saved' : 'Save job'}"
            >
              <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}"></i>
            </button>
          </div>

          <!-- Badges & Highlights -->
          <div class="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span class="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">
              ${job.type}
            </span>
            <span class="px-2.5 py-1 rounded-md ${job.mode === 'Remote' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800/80 text-slate-300 border border-slate-700/60'} font-medium">
              ${job.mode}
            </span>
            <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-medium">
              ${job.experience}
            </span>
            ${job.isUrgent ? `
              <span class="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30 font-semibold text-[10px] uppercase tracking-wider animate-pulse">
                Actively Hiring
              </span>
            ` : ''}
          </div>

          <!-- Summary Snippet -->
          <p class="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            ${job.summary}
          </p>

          <!-- Tags -->
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${job.tags.slice(0, 4).map(tag => `
              <span class="px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 text-[11px] border border-slate-800 font-mono">
                ${tag}
              </span>
            `).join('')}
            ${job.tags.length > 4 ? `
              <span class="px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-500 text-[11px]">
                +${job.tags.length - 4}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Footer: Compensation & Action Buttons -->
        <div class="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Compensation</div>
            <div class="text-sm font-bold text-emerald-400">${job.salary}</div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              class="btn-view-job-details px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              data-id="${job.id}"
            >
              Details
            </button>
            <button 
              class="btn-apply-job px-3.5 py-2 rounded-lg ${hasApplied ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium'} text-xs font-semibold shadow-sm transition flex items-center gap-1"
              data-id="${job.id}"
            >
              ${hasApplied ? `
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Applied</span>
              ` : `
                <span>Easy Apply</span>
              `}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function attachEventListeners() {
    // Search input
    const searchInput = container.querySelector('#job-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
      });
    }

    const clearSearch = container.querySelector('#clear-search-btn');
    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        searchQuery = '';
        render();
      });
    }

    // Filter dropdowns
    const filterCat = container.querySelector('#filter-category');
    if (filterCat) {
      filterCat.addEventListener('change', (e) => {
        activeCategory = e.target.value;
        render();
      });
    }

    const filterExp = container.querySelector('#filter-exp');
    if (filterExp) {
      filterExp.addEventListener('change', (e) => {
        activeExp = e.target.value;
        render();
      });
    }

    const filterMode = container.querySelector('#filter-mode');
    if (filterMode) {
      filterMode.addEventListener('change', (e) => {
        activeMode = e.target.value;
        render();
      });
    }

    const toggleSaved = container.querySelector('#toggle-saved-filter');
    if (toggleSaved) {
      toggleSaved.addEventListener('click', () => {
        onlySaved = !onlySaved;
        render();
      });
    }

    const resetFilters = container.querySelector('#reset-all-filters-btn');
    if (resetFilters) {
      resetFilters.addEventListener('click', () => {
        activeCategory = "All Categories";
        activeExp = "All Experience";
        activeMode = "All Modes";
        searchQuery = "";
        onlySaved = false;
        render();
      });
    }

    // Bookmark actions
    container.querySelectorAll('.btn-save-job').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.getAttribute('data-id');
        store.toggleSaveJob(jobId);
        render();
      });
    });

    // Details view modal trigger
    container.querySelectorAll('.btn-view-job-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-id');
        openJobDetailsModal(jobId);
      });
    });

    // Apply button
    container.querySelectorAll('.btn-apply-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-id');
        openApplyModal(jobId);
      });
    });

    // Post job modal trigger
    const postJobBtn = container.querySelector('#open-post-job-modal-btn');
    if (postJobBtn) {
      postJobBtn.addEventListener('click', () => {
        openPostJobModal();
      });
    }
  }

  // Open Details Modal
  function openJobDetailsModal(jobId) {
    const job = store.jobs.find(j => j.id === jobId);
    if (!job) return;

    const modalContainer = document.getElementById('global-modal-container');
    const isSaved = store.isJobSaved(job.id);
    const hasApplied = store.applications.some(a => a.jobId === job.id);

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
          
          <!-- Modal Header -->
          <div class="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-white p-2.5 flex items-center justify-center shadow-md">
                <img src="${job.logo}" alt="${job.company}" class="w-full h-full object-contain" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">${job.title}</h2>
                <div class="flex items-center gap-2 mt-1 text-sm text-slate-400">
                  <span class="text-indigo-400 font-semibold">${job.company}</span>
                  <span>•</span>
                  <span>${job.location}</span>
                </div>
              </div>
            </div>

            <button id="close-modal-btn" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Modal Body Content -->
          <div class="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
            <!-- Badges -->
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium">${job.type}</span>
              <span class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-medium">${job.mode}</span>
              <span class="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-medium">${job.experience}</span>
              <span class="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 font-bold">${job.salary}</span>
            </div>

            <!-- Overview -->
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Role Overview</h4>
              <p class="leading-relaxed text-slate-300">${job.summary}</p>
            </div>

            <!-- Responsibilities -->
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Key Responsibilities</h4>
              <ul class="list-disc list-inside space-y-1.5 text-slate-300">
                ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>

            <!-- Requirements -->
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Requirements & Qualifications</h4>
              <ul class="list-disc list-inside space-y-1.5 text-slate-300">
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
              </ul>
            </div>

            <!-- Perks & Benefits -->
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Perks & Benefits</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${job.benefits.map(b => `
                  <div class="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2 text-xs">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                    <span>${b}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <button 
              id="modal-toggle-save-btn" 
              class="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
            >
              <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}"></i>
              <span>${isSaved ? 'Saved to Bookmarks' : 'Save Job'}</span>
            </button>

            <button 
              id="modal-apply-btn" 
              class="px-6 py-2.5 rounded-xl ${hasApplied ? 'bg-emerald-600 text-white cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white'} text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              ${hasApplied ? `
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Application Submitted</span>
              ` : `
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Easy Apply Now</span>
              `}
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Modal Close
    const closeBtn = modalContainer.querySelector('#close-modal-btn');
    closeBtn.addEventListener('click', () => {
      modalContainer.innerHTML = '';
    });

    const toggleSaveBtn = modalContainer.querySelector('#modal-toggle-save-btn');
    toggleSaveBtn.addEventListener('click', () => {
      store.toggleSaveJob(job.id);
      openJobDetailsModal(job.id); // re-render modal
      render(); // re-render grid
    });

    const modalApplyBtn = modalContainer.querySelector('#modal-apply-btn');
    modalApplyBtn.addEventListener('click', () => {
      modalContainer.innerHTML = '';
      openApplyModal(job.id);
    });
  }

  // Open Easy Apply Modal
  function openApplyModal(jobId) {
    const job = store.jobs.find(j => j.id === jobId);
    if (!job) return;

    const applicantName = store.user ? store.user.name : "Gunjan Sharma";
    const applicantEmail = store.user ? store.user.email : "gunjan.sharma@gmail.com";
    const resumeFileName = `${applicantName.replace(/\s+/g, '_')}_SDE_Resume.pdf`;

    const modalContainer = document.getElementById('global-modal-container');
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 class="text-lg font-bold text-white">Apply to ${job.company}</h3>
              <p class="text-xs text-indigo-400 mt-0.5">${job.title}</p>
            </div>
            <button id="close-apply-modal" class="text-slate-400 hover:text-white p-1">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="apply-form" class="mt-5 space-y-4 text-xs">
            <div>
              <label class="block font-medium text-slate-300 mb-1">Full Name *</label>
              <input type="text" id="applicant-name-input" required value="${applicantName}" class="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label class="block font-medium text-slate-300 mb-1">Email Address *</label>
              <input type="email" id="applicant-email-input" required value="${applicantEmail}" class="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-300 mb-1">Phone Number</label>
                <input type="text" value="+91 98765 43210" class="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label class="block font-medium text-slate-300 mb-1">Notice Period / Grad Year</label>
                <input type="text" value="Immediate / 2026 Batch" class="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label class="block font-medium text-slate-300 mb-1">Attached Resume (PDF / DOCX)</label>
              <div class="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-indigo-500 transition cursor-pointer bg-slate-950/50">
                <i data-lucide="file-text" class="w-6 h-6 text-indigo-400 mx-auto mb-1"></i>
                <div class="text-slate-300 font-medium">${resumeFileName}</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Verified Profile Attachment (GunjanCore Talent Network)</div>
              </div>
            </div>

            <div>
              <label class="block font-medium text-slate-300 mb-1">Applicant Note / Cover message</label>
              <textarea rows="3" id="apply-note" placeholder="Share why you're a great fit for this role..." class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">I have solved 350+ DSA problems and built multiple distributed web systems. Excited about this opportunity!</textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-3">
              <button type="button" id="cancel-apply" class="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modalContainer.querySelector('#close-apply-modal').addEventListener('click', () => modalContainer.innerHTML = '');
    modalContainer.querySelector('#cancel-apply').addEventListener('click', () => modalContainer.innerHTML = '');

    modalContainer.querySelector('#apply-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const note = modalContainer.querySelector('#apply-note').value;
      store.applyForJob(job.id, { notes: note });
      modalContainer.innerHTML = '';
      render();
      if (window.showToast) {
        window.showToast(`Application successfully submitted to ${job.company}! Added to your Tracker.`, 'success');
      }
    });
  }

  // Open Post Job Modal
  function openPostJobModal() {
    const modalContainer = document.getElementById('global-modal-container');
    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
          
          <div class="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i data-lucide="briefcase" class="w-5 h-5 text-indigo-400"></i>
              <span>Post a Tech Job Listing</span>
            </h3>
            <button id="close-post-job" class="text-slate-400 hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="post-job-form" class="p-6 overflow-y-auto space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-slate-300 mb-1">Company Name *</label>
                <input type="text" id="post-company" required placeholder="e.g. Stripe, Airbnb" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label class="block font-medium text-slate-300 mb-1">Job Title *</label>
                <input type="text" id="post-title" required placeholder="e.g. Backend Go Engineer" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-medium text-slate-300 mb-1">Category</label>
                <select id="post-category" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none">
                  <option>Full Stack</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>AI / Data Science</option>
                  <option>DevOps & Cloud</option>
                  <option>QA & Testing</option>
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-300 mb-1">Experience</label>
                <select id="post-exp" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none">
                  <option>Fresher (0-1 yrs)</option>
                  <option>1-3 yrs</option>
                  <option>3-5 yrs</option>
                  <option>5+ yrs</option>
                </select>
              </div>
              <div>
                <label class="block font-medium text-slate-300 mb-1">Work Mode</label>
                <select id="post-mode" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-medium text-slate-300 mb-1">Location</label>
                <input type="text" id="post-location" value="Bengaluru / Remote" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200" />
              </div>
              <div>
                <label class="block font-medium text-slate-300 mb-1">Annual CTC / Stipend *</label>
                <input type="text" id="post-salary" required placeholder="e.g. ₹15,00,000 - ₹22,00,000 / yr" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200" />
              </div>
            </div>

            <div>
              <label class="block font-medium text-slate-300 mb-1">Key Skills / Tags (comma separated)</label>
              <input type="text" id="post-tags" placeholder="React, Node.js, TypeScript, PostgreSQL" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200" />
            </div>

            <div>
              <label class="block font-medium text-slate-300 mb-1">Job Summary *</label>
              <textarea id="post-summary" rows="3" required placeholder="Short overview of the role, impact, and day-to-day work..." class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"></textarea>
            </div>

            <div class="pt-2 flex justify-end gap-2">
              <button type="button" id="cancel-post-job" class="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200">Cancel</button>
              <button type="submit" class="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium">Publish Listing</button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modalContainer.querySelector('#close-post-job').addEventListener('click', () => modalContainer.innerHTML = '');
    modalContainer.querySelector('#cancel-post-job').addEventListener('click', () => modalContainer.innerHTML = '');

    modalContainer.querySelector('#post-job-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const tagsStr = modalContainer.querySelector('#post-tags').value;
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : ['Engineering'];

      const newJobData = {
        title: modalContainer.querySelector('#post-title').value,
        company: modalContainer.querySelector('#post-company').value,
        category: modalContainer.querySelector('#post-category').value,
        experience: modalContainer.querySelector('#post-exp').value,
        mode: modalContainer.querySelector('#post-mode').value,
        location: modalContainer.querySelector('#post-location').value,
        salary: modalContainer.querySelector('#post-salary').value,
        summary: modalContainer.querySelector('#post-summary').value,
        tags: tags,
        type: 'Full-time',
        responsibilities: [
          "Build and scale user-facing features and backend services.",
          "Write clean, maintainable, and well-tested code."
        ],
        requirements: [
          "Strong foundation in Computer Science and Data Structures.",
          "Familiarity with modern software development best practices."
        ],
        benefits: [
          "Competitive health benefits",
          "Flexible working environment"
        ]
      };

      store.addJob(newJobData);
      modalContainer.innerHTML = '';
      render();
      if (window.showToast) {
        window.showToast("Job successfully posted and live on the board!", "success");
      }
    });
  }

  // Initial render
  render();
}
