// Application Tracker Kanban View Component for CareerForge
import { store } from '../store.js';

export function renderTrackerView(container) {
  const stages = [
    { id: 'wishlist', label: 'Bookmarked', color: 'border-slate-500', badge: 'bg-slate-800 text-slate-300' },
    { id: 'applied', label: 'Applied', color: 'border-blue-500', badge: 'bg-blue-500/10 text-blue-300' },
    { id: 'screening', label: 'Online Assessment', color: 'border-purple-500', badge: 'bg-purple-500/10 text-purple-300' },
    { id: 'interview', label: 'Technical Rounds', color: 'border-amber-500', badge: 'bg-amber-500/10 text-amber-300' },
    { id: 'offer', label: 'Offer Received 🎉', color: 'border-emerald-500', badge: 'bg-emerald-500/10 text-emerald-300 font-bold' },
    { id: 'rejected', label: 'Archived', color: 'border-rose-900', badge: 'bg-rose-500/10 text-rose-400' }
  ];

  function render() {
    const apps = store.applications;

    // Synchronize wishlisted/saved jobs that aren't yet in applications
    store.savedJobs.forEach(jobId => {
      const existing = apps.find(a => a.jobId === jobId);
      if (!existing) {
        const job = store.jobs.find(j => j.id === jobId);
        if (job) {
          apps.push({
            id: `app-wishlist-${job.id}`,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            appliedDate: 'Saved',
            stage: 'wishlist',
            notes: 'Saved for later application review.'
          });
        }
      }
    });

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Tracker Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-700/50">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <i data-lucide="trello" class="w-3.5 h-3.5"></i>
              <span>Pipeline Workflow</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Application Tracker</h1>
            <p class="text-slate-400 text-xs sm:text-sm mt-1">Manage your active interview pipelines, follow-ups, and offers in one organized dashboard.</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-center">
              <div class="text-xs text-slate-400">Total Active</div>
              <div class="text-lg font-bold text-indigo-400">${apps.filter(a => a.stage !== 'rejected').length}</div>
            </div>
            <div class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-center">
              <div class="text-xs text-slate-400">Offers</div>
              <div class="text-lg font-bold text-emerald-400">${apps.filter(a => a.stage === 'offer').length}</div>
            </div>
          </div>
        </div>

        <!-- Kanban Board Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          ${stages.map(stage => {
            const stageApps = apps.filter(a => a.stage === stage.id);
            return `
              <div class="flex flex-col rounded-xl bg-slate-950/60 border border-slate-800 p-3 kanban-col shadow-inner">
                <!-- Column Header -->
                <div class="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full ${stage.color.replace('border-', 'bg-')}"></div>
                    <span class="text-xs font-bold text-slate-200">${stage.label}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${stage.badge}">
                    ${stageApps.length}
                  </span>
                </div>

                <!-- Cards Container -->
                <div class="flex-1 space-y-3 overflow-y-auto max-h-[700px] pr-1">
                  ${stageApps.length === 0 ? `
                    <div class="h-32 flex flex-col items-center justify-center text-center p-3 rounded-lg border border-dashed border-slate-800 text-slate-500 text-xs">
                      <span>No jobs in this phase</span>
                    </div>
                  ` : stageApps.map(app => renderKanbanCard(app, stages)).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    attachEventListeners();
  }

  function renderKanbanCard(app, allStages) {
    return `
      <div class="glass-panel rounded-xl p-3.5 border border-slate-800 hover:border-slate-600 transition shadow-sm group relative" data-app-id="${app.id}">
        <!-- Top bar: company & action menu -->
        <div class="flex items-start justify-between gap-2">
          <div>
            <h4 class="font-bold text-slate-100 text-sm leading-snug">${app.company}</h4>
            <p class="text-xs text-indigo-300 line-clamp-1 mt-0.5">${app.jobTitle}</p>
          </div>
          <button class="btn-delete-app text-slate-500 hover:text-rose-400 p-1 rounded transition opacity-0 group-hover:opacity-100" data-app-id="${app.id}" title="Delete Application">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- Location & Compensation -->
        <div class="mt-2 text-[11px] text-slate-400 space-y-0.5">
          <div class="flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3 h-3 text-slate-500 shrink-0"></i>
            <span class="truncate">${app.location || 'India'}</span>
          </div>
          <div class="text-emerald-400 font-semibold text-xs">${app.salary || 'Market Rate'}</div>
        </div>

        <!-- Notes Snippet -->
        ${app.notes ? `
          <div class="mt-2.5 p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 line-clamp-2 leading-relaxed italic">
            "${app.notes}"
          </div>
        ` : ''}

        <!-- Stage Selector Dropdown -->
        <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
          <span class="text-[10px] text-slate-500 uppercase font-semibold">Move To:</span>
          <select class="app-stage-select bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-slate-200 text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500" data-app-id="${app.id}">
            ${allStages.map(s => `
              <option value="${s.id}" ${app.stage === s.id ? 'selected' : ''}>${s.label}</option>
            `).join('')}
          </select>
        </div>

        <!-- Edit Notes Button -->
        <button class="btn-edit-notes mt-2 w-full py-1 text-[11px] text-slate-400 hover:text-indigo-300 flex items-center justify-center gap-1 border border-slate-800 hover:border-indigo-500/40 rounded transition" data-app-id="${app.id}">
          <i data-lucide="edit-3" class="w-3 h-3"></i>
          <span>${app.notes ? 'Update Notes' : 'Add Note / Interview Prep'}</span>
        </button>
      </div>
    `;
  }

  function attachEventListeners() {
    // Stage select change
    container.querySelectorAll('.app-stage-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const appId = sel.getAttribute('data-app-id');
        const newStage = e.target.value;
        store.updateApplicationStage(appId, newStage);
        render();
        if (window.showToast) {
          window.showToast("Application stage updated!", "info");
        }
      });
    });

    // Delete application
    container.querySelectorAll('.btn-delete-app').forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-app-id');
        if (confirm("Remove this application from your tracker?")) {
          store.deleteApplication(appId);
          render();
        }
      });
    });

    // Edit notes modal
    container.querySelectorAll('.btn-edit-notes').forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-app-id');
        const app = store.applications.find(a => a.id === appId);
        if (!app) return;

        const modal = document.getElementById('global-modal-container');
        modal.innerHTML = `
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
            <div class="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 class="text-sm font-bold text-white">Application Notes - ${app.company}</h3>
                <button id="close-notes-modal" class="text-slate-400 hover:text-white">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="mt-4 space-y-3">
                <label class="text-xs text-slate-300 font-medium">Interview Dates, HR Contacts, or Prep Notes:</label>
                <textarea id="app-notes-input" rows="4" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">${app.notes || ''}</textarea>
              </div>

              <div class="mt-4 flex justify-end gap-2">
                <button id="cancel-notes" class="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200">Cancel</button>
                <button id="save-notes" class="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">Save Notes</button>
              </div>
            </div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();

        modal.querySelector('#close-notes-modal').addEventListener('click', () => modal.innerHTML = '');
        modal.querySelector('#cancel-notes').addEventListener('click', () => modal.innerHTML = '');

        modal.querySelector('#save-notes').addEventListener('click', () => {
          const val = modal.querySelector('#app-notes-input').value;
          store.updateApplicationNotes(app.id, val);
          modal.innerHTML = '';
          render();
        });
      });
    });
  }

  // Initial render
  render();
}
