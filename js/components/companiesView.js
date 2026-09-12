// Company Hiring Processes & Placement Guides View for CareerForge
import { companiesData } from '../data/companiesData.js';

export function renderCompaniesView(container) {
  let activeCategory = "All"; // "All", "Product", "Service", "Fintech"
  let searchQuery = "";

  function getFilteredCompanies() {
    return companiesData.filter(c => {
      const matchCat = activeCategory === "All" || c.category === activeCategory;
      const matchSearch = !searchQuery || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.examPattern.keyTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }

  function render() {
    const list = getFilteredCompanies();

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Banner -->
        <div class="glass-panel rounded-2xl p-6 sm:p-8 border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/30">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
              <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
              <span>Recruiter Intelligence & Exam Patterns</span>
            </div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Company Hiring Processes</h1>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Explore exhaustive round breakdowns, online assessment patterns, eligibility cutoffs, and insider strategies for top tech employers.
            </p>
          </div>

          <!-- Filter & Search Controls -->
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div class="flex items-center gap-2">
              ${["All", "Product", "Service", "Fintech"].map(cat => `
                <button 
                  class="btn-company-cat px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}"
                  data-cat="${cat}"
                >
                  ${cat}
                </button>
              `).join('')}
            </div>

            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
              <input 
                type="text" 
                id="company-search-input"
                value="${searchQuery}"
                placeholder="Search company or topic (e.g. TCS, Trees)..."
                class="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Companies Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${list.map(c => renderCompanyCard(c)).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    attachEventListeners();
  }

  function renderCompanyCard(company) {
    return `
      <div class="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 card-hover flex flex-col justify-between transition group relative">
        <div>
          <!-- Top: Logo & Tier -->
          <div class="flex items-start justify-between gap-3">
            <div class="w-14 h-14 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-md border border-slate-700/50">
              <img src="${company.logo}" alt="${company.name}" class="w-full h-full object-contain" />
            </div>

            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-blue-300 border border-slate-700">
              ${company.tier}
            </span>
          </div>

          <!-- Title & Salary -->
          <div class="mt-4">
            <h3 class="text-xl font-bold text-white group-hover:text-blue-300 transition">${company.name}</h3>
            <div class="text-xs font-semibold text-emerald-400 mt-1">
              CTC: ${company.ctcBreakdown.fresher}
            </div>
          </div>

          <!-- Eligibility Quick Check -->
          <div class="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1 text-xs text-slate-300">
            <div class="flex items-center gap-1.5 text-slate-400">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span><strong>CGPA:</strong> ${company.eligibility.cgpa}</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-400">
              <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-amber-400"></i>
              <span><strong>Backlogs:</strong> ${company.eligibility.backlogs}</span>
            </div>
          </div>

          <!-- Key Focus Topics -->
          <div class="mt-4">
            <div class="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Key Exam Topics:</div>
            <div class="flex flex-wrap gap-1">
              ${company.examPattern.keyTopics.slice(0, 3).map(topic => `
                <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 truncate max-w-[200px]">
                  ${topic}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-6 pt-4 border-t border-slate-800">
          <button 
            class="btn-view-company-guide w-full py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition flex items-center justify-center gap-2"
            data-company-id="${company.id}"
          >
            <span>View Complete Hiring Blueprint</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }

  function attachEventListeners() {
    // Category tabs
    container.querySelectorAll('.btn-company-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    // Search input
    const search = container.querySelector('#company-search-input');
    if (search) {
      search.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
      });
    }

    // View Guide Modal
    container.querySelectorAll('.btn-view-company-guide').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-company-id');
        openCompanyGuideModal(id);
      });
    });
  }

  function openCompanyGuideModal(companyId) {
    const company = companiesData.find(c => c.id === companyId);
    if (!company) return;

    const modal = document.getElementById('global-modal-container');

    modal.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
        <div class="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
          
          <!-- Header -->
          <div class="p-6 border-b border-slate-800 bg-slate-950 flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
                <img src="${company.logo}" alt="${company.name}" class="w-full h-full object-contain" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl font-extrabold text-white">${company.name}</h2>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    ${company.tier}
                  </span>
                </div>
                <div class="text-xs text-slate-400 mt-1">
                  Comprehensive Hiring Process, Exam Pattern & Placement Roadmap
                </div>
              </div>
            </div>

            <button id="close-guide-modal" class="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
            <!-- Compensation & Eligibility Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Compensation Card -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <i data-lucide="dollar-sign" class="w-4 h-4"></i>
                  <span>Compensation Structure</span>
                </div>
                <div class="text-slate-200"><strong>Fresher CTC:</strong> ${company.ctcBreakdown.fresher}</div>
                <div class="text-slate-400"><strong>Internship:</strong> ${company.ctcBreakdown.intern}</div>
              </div>

              <!-- Eligibility Card -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div class="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                  <span>Eligibility Criteria</span>
                </div>
                <div><strong>Degree:</strong> ${company.eligibility.degree}</div>
                <div><strong>Cutoff:</strong> ${company.eligibility.cgpa}</div>
                <div><strong>Backlog Rule:</strong> ${company.eligibility.backlogs}</div>
              </div>
            </div>

            <!-- Rounds & Timeline -->
            <div class="space-y-3">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="git-commit" class="w-4 h-4 text-indigo-400"></i>
                <span>Selection Rounds & Evaluation Stages</span>
              </h3>

              <div class="space-y-3">
                ${company.hiringRounds.map((round, idx) => `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative pl-10">
                    <span class="absolute left-3 top-4 w-5 h-5 rounded-full bg-blue-600/20 text-blue-300 font-bold font-mono text-[11px] flex items-center justify-center border border-blue-500/40">
                      ${idx + 1}
                    </span>
                    <div class="flex items-center justify-between flex-wrap gap-2">
                      <h4 class="font-bold text-slate-100 text-xs sm:text-sm">${round.round}</h4>
                      <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        ${round.duration}
                      </span>
                    </div>
                    <div class="text-indigo-300 font-medium">${round.format}</div>
                    <p class="text-slate-400 leading-relaxed">${round.details}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Exam Pattern & Topics -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="code" class="w-4 h-4 text-purple-400"></i>
                <span>Assessment Pattern & Priority Syllabus</span>
              </h3>
              <div>
                <span class="font-bold text-slate-300">Platforms Used: </span>
                ${company.examPattern.platforms.join(', ')}
              </div>
              <div>
                <span class="font-bold text-slate-300">Allowed Languages: </span>
                ${company.examPattern.allowedLanguages.join(', ')}
              </div>
              <div class="pt-2">
                <div class="font-bold text-slate-300 mb-1.5">High-Yield Priority Topics:</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  ${company.examPattern.keyTopics.map(t => `
                    <div class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                      <i data-lucide="check" class="w-3 h-3 text-blue-400 shrink-0"></i>
                      <span>${t}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Candidate Preparation Strategy -->
            <div class="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
              <h3 class="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i>
                <span>Insider Candidate Preparation Strategy</span>
              </h3>
              <ul class="space-y-1.5 text-slate-300">
                ${company.prepStrategy.map(strat => `
                  <li class="flex items-start gap-2">
                    <span class="text-indigo-400 font-bold">•</span>
                    <span>${strat}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
            <button id="close-guide-footer-btn" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
              Close Guide
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    modal.querySelector('#close-guide-modal').addEventListener('click', () => modal.innerHTML = '');
    modal.querySelector('#close-guide-footer-btn').addEventListener('click', () => modal.innerHTML = '');
  }

  // Initial render
  render();
}
