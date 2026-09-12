// Dedicated Topic-Wise DSA Preparation Sheet View for CareerForge
import { store } from '../store.js';
import { dsaTopics } from '../data/dsaData.js';

export function renderDsaView(container) {
  let activeDifficulty = "All"; // "All", "Easy", "Medium", "Hard"
  let activeStatus = "All"; // "All", "Solved", "Unsolved", "Starred"
  let searchQuery = "";
  let openTopicIds = new Set(dsaTopics.map(t => t.id)); // All open by default

  function render() {
    const stats = store.getDsaStats();

    container.innerHTML = `
      <div class="space-y-6">
        <!-- DSA Header & Analytics Dashboard -->
        <div class="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                <i data-lucide="award" class="w-3.5 h-3.5"></i>
                <span>SDE Sheet - High Frequency Interview Questions</span>
              </div>
              <h1 class="text-3xl font-extrabold text-white tracking-tight">Dedicated DSA Preparation</h1>
              <p class="mt-1 text-slate-300 text-sm max-w-xl">
                Master 12 core algorithmic patterns curated from top tech interviews (Google, Amazon, Microsoft). Track your progress, review hints, and save notes.
              </p>
            </div>

            <!-- Overall Progress Widget -->
            <div class="glass-panel rounded-xl p-5 border border-slate-700/80 bg-slate-900/80 shrink-0 min-w-[280px]">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Solved</span>
                <span class="text-xs font-mono font-bold text-emerald-400">${stats.totalSolved} / ${stats.totalProblems} (${stats.percentage}%)</span>
              </div>

              <!-- Main Progress Bar -->
              <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500" style="width: ${stats.percentage}%"></div>
              </div>

              <!-- Breakdown pills -->
              <div class="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center text-xs">
                <div>
                  <div class="text-emerald-400 font-bold font-mono">${stats.difficultyStats.Easy.solved}/${stats.difficultyStats.Easy.total}</div>
                  <div class="text-[10px] text-slate-400">Easy</div>
                </div>
                <div>
                  <div class="text-amber-400 font-bold font-mono">${stats.difficultyStats.Medium.solved}/${stats.difficultyStats.Medium.total}</div>
                  <div class="text-[10px] text-slate-400">Medium</div>
                </div>
                <div>
                  <div class="text-rose-400 font-bold font-mono">${stats.difficultyStats.Hard.solved}/${stats.difficultyStats.Hard.total}</div>
                  <div class="text-[10px] text-slate-400">Hard</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="glass-panel rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Difficulty Filters -->
            ${["All", "Easy", "Medium", "Hard"].map(diff => `
              <button 
                class="btn-filter-diff px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeDifficulty === diff ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}"
                data-diff="${diff}"
              >
                ${diff}
              </button>
            `).join('')}

            <span class="text-slate-700 hidden sm:inline">|</span>

            <!-- Status Filters -->
            ${["All", "Solved", "Unsolved", "Starred"].map(st => `
              <button 
                class="btn-filter-status px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeStatus === st ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}"
                data-status="${st}"
              >
                ${st}
              </button>
            `).join('')}
          </div>

          <!-- Problem Search -->
          <div class="relative w-full md:w-72">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
            <input 
              type="text" 
              id="dsa-search-input"
              value="${searchQuery}"
              placeholder="Search problem or company..." 
              class="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-500"
            />
          </div>
        </div>

        <!-- Topic Sections Accordions -->
        <div class="space-y-4">
          ${dsaTopics.map(topic => renderTopicSection(topic, stats.topicStats[topic.id])).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    attachEventListeners();
  }

  function renderTopicSection(topic, topicStat) {
    // Filter problems within this topic
    const filteredProblems = topic.problems.filter(prob => {
      const isSolved = store.isDsaSolved(prob.id);
      const isStarred = store.isDsaStarred(prob.id);

      // Difficulty filter
      if (activeDifficulty !== "All" && prob.difficulty !== activeDifficulty) return false;

      // Status filter
      if (activeStatus === "Solved" && !isSolved) return false;
      if (activeStatus === "Unsolved" && isSolved) return false;
      if (activeStatus === "Starred" && !isStarred) return false;

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(q);
        const matchesCompany = prob.companies.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany) return false;
      }

      return true;
    });

    if (filteredProblems.length === 0 && (activeDifficulty !== "All" || activeStatus !== "All" || searchQuery)) {
      return ''; // hide topic if no matching problems under active filter
    }

    const isOpen = openTopicIds.has(topic.id);

    return `
      <div class="glass-panel rounded-xl border border-slate-800 overflow-hidden transition" data-topic-id="${topic.id}">
        <!-- Topic Accordion Header -->
        <button 
          class="btn-toggle-topic w-full p-4 flex items-center justify-between bg-slate-900/60 hover:bg-slate-800/60 transition text-left"
          data-topic-id="${topic.id}"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <i data-lucide="${topic.icon || 'code'}" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-100 text-sm sm:text-base">${topic.title}</h3>
              <p class="text-xs text-slate-400 line-clamp-1">${topic.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Mini progress -->
            <div class="hidden sm:flex items-center gap-2">
              <div class="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full transition-all" style="width: ${topicStat ? topicStat.percent : 0}%"></div>
              </div>
              <span class="text-xs font-mono text-slate-400">${topicStat ? topicStat.solved : 0}/${topicStat ? topicStat.total : 0}</span>
            </div>

            <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4 text-slate-400"></i>
          </div>
        </button>

        <!-- Problem Table Content -->
        ${isOpen ? `
          <div class="divide-y divide-slate-800/80 border-t border-slate-800">
            ${filteredProblems.map(prob => renderProblemRow(prob)).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderProblemRow(prob) {
    const isSolved = store.isDsaSolved(prob.id);
    const isStarred = store.isDsaStarred(prob.id);
    const userNote = store.getDsaNote(prob.id);

    const diffColors = {
      Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    };

    return `
      <div class="p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/40 transition group ${isSolved ? 'bg-emerald-950/10' : ''}">
        <!-- Left: Checkbox + Title + Star -->
        <div class="flex items-center gap-3">
          <input 
            type="checkbox" 
            class="dsa-checkbox custom-checkbox" 
            data-problem-id="${prob.id}"
            ${isSolved ? 'checked' : ''}
            title="Mark as solved"
          />

          <button 
            class="btn-star-problem text-slate-500 hover:text-amber-400 transition" 
            data-problem-id="${prob.id}"
            title="${isStarred ? 'Remove Star' : 'Star for Revision'}"
          >
            <i data-lucide="star" class="w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}"></i>
          </button>

          <div>
            <a 
              href="${prob.link}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="font-medium text-slate-200 hover:text-indigo-400 transition text-sm inline-flex items-center gap-1.5 ${isSolved ? 'line-through text-slate-400' : ''}"
            >
              <span>${prob.title}</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400"></i>
            </a>

            <!-- Companies Tags -->
            <div class="flex items-center gap-1.5 mt-1 flex-wrap">
              ${prob.companies.map(c => `
                <span class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-medium">
                  ${c}
                </span>
              `).join('')}
              <span class="text-[10px] font-mono text-slate-500 hidden sm:inline ml-1">${prob.optimalComplexity}</span>
            </div>
          </div>
        </div>

        <!-- Right: Difficulty & Hint/Notes Action -->
        <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${diffColors[prob.difficulty]}">
            ${prob.difficulty}
          </span>

          <button 
            class="btn-problem-hint px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition ${userNote ? 'border border-indigo-500/50 text-indigo-300' : ''}"
            data-problem-id="${prob.id}"
            title="View Approach & Notes"
          >
            <i data-lucide="lightbulb" class="w-3.5 h-3.5 ${userNote ? 'text-amber-400' : ''}"></i>
            <span>${userNote ? 'Notes (Saved)' : 'Hint / Notes'}</span>
          </button>
        </div>
      </div>
    `;
  }

  function attachEventListeners() {
    // Difficulty filters
    container.querySelectorAll('.btn-filter-diff').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDifficulty = btn.getAttribute('data-diff');
        render();
      });
    });

    // Status filters
    container.querySelectorAll('.btn-filter-status').forEach(btn => {
      btn.addEventListener('click', () => {
        activeStatus = btn.getAttribute('data-status');
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#dsa-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
      });
    }

    // Toggle Topic Accordion
    container.querySelectorAll('.btn-toggle-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.getAttribute('data-topic-id');
        if (openTopicIds.has(topicId)) {
          openTopicIds.delete(topicId);
        } else {
          openTopicIds.add(topicId);
        }
        render();
      });
    });

    // Solved checkbox toggle
    container.querySelectorAll('.dsa-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const probId = cb.getAttribute('data-problem-id');
        store.toggleDsaSolved(probId);
        render();
      });
    });

    // Star problem toggle
    container.querySelectorAll('.btn-star-problem').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const probId = btn.getAttribute('data-problem-id');
        store.toggleDsaStar(probId);
        render();
      });
    });

    // Hint / Notes modal
    container.querySelectorAll('.btn-problem-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        const probId = btn.getAttribute('data-problem-id');
        openProblemNotesModal(probId);
      });
    });
  }

  function openProblemNotesModal(problemId) {
    // Find problem across all topics
    let targetProblem = null;
    let targetTopic = null;
    for (const t of dsaTopics) {
      const p = t.problems.find(item => item.id === problemId);
      if (p) {
        targetProblem = p;
        targetTopic = t;
        break;
      }
    }
    if (!targetProblem) return;

    const modal = document.getElementById('global-modal-container');
    const existingNote = store.getDsaNote(problemId);

    modal.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
          <div class="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <span>${targetTopic.title}</span>
                <span>•</span>
                <span class="text-amber-400">${targetProblem.difficulty}</span>
              </div>
              <h3 class="text-lg font-bold text-white mt-1">${targetProblem.title}</h3>
            </div>
            <button id="close-notes-modal" class="text-slate-400 hover:text-white p-1">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Approach & Complexity Hint -->
          <div class="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 space-y-2">
            <div class="font-bold flex items-center gap-1.5 text-indigo-300">
              <i data-lucide="lightbulb" class="w-4 h-4 text-amber-400"></i>
              <span>Optimal Approach & Hint:</span>
            </div>
            <p class="leading-relaxed">${targetProblem.hint}</p>
            <div class="pt-1 font-mono text-[11px] text-indigo-400 font-semibold">
              Complexity: ${targetProblem.optimalComplexity}
            </div>
          </div>

          <!-- Personal Code / Scratchpad Notes -->
          <div class="mt-4 space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Personal Solution Notes & Code Snippet
            </label>
            <textarea 
              id="user-dsa-note-text"
              rows="5"
              placeholder="Paste your key observations, edge cases, or code snippet here..."
              class="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
            >${existingNote}</textarea>
          </div>

          <!-- Modal actions -->
          <div class="mt-5 flex items-center justify-between">
            <a 
              href="${targetProblem.link}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Solve on LeetCode</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>

            <div class="flex items-center gap-2">
              <button id="cancel-note-btn" class="px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200">Close</button>
              <button id="save-note-btn" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md">Save Notes</button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.querySelector('#close-notes-modal').addEventListener('click', () => modal.innerHTML = '');
    modal.querySelector('#cancel-note-btn').addEventListener('click', () => modal.innerHTML = '');

    modal.querySelector('#save-note-btn').addEventListener('click', () => {
      const noteVal = modal.querySelector('#user-dsa-note-text').value;
      store.saveDsaNote(problemId, noteVal);
      modal.innerHTML = '';
      render();
      if (window.showToast) {
        window.showToast("Notes saved successfully!", "success");
      }
    });
  }

  // Initial render
  render();
}
