// Preparation Hub Component for CareerForge (Aptitude, Core Technical, HR & Behavioral)
import { store } from '../store.js';
import { aptitudeData, technicalCoreData, hrBehavioralData } from '../data/prepData.js';

export function renderPrepView(container) {
  let activeSubTab = "aptitude"; // "aptitude", "technical", "hr", "quiz"
  let activeAptitudeCat = "All"; // "All", "Quantitative", "Logical Reasoning", "Verbal Ability"
  let activeTechSubject = "os"; // "os", "dbms", "cn", "oops-design"

  // Quiz Arena State
  let currentQuizIndex = 0;
  let userSelectedAnswers = {}; // questionId -> optionIndex
  let quizSubmitted = false;

  function render() {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Prep Hub Header -->
        <div class="glass-panel rounded-2xl p-6 sm:p-8 border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              <span>All-In-One Placement Study Hub</span>
            </div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Interview Preparation Hub</h1>
            <p class="mt-2 text-slate-300 text-sm leading-relaxed">
              Master everything from aptitude shortcuts and core CS fundamentals to the STAR behavioral method and practice mock quizzes.
            </p>
          </div>

          <!-- Sub-Tab Navigation Bar -->
          <div class="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
            <button class="prep-subtab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${activeSubTab === 'aptitude' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-tab="aptitude">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Aptitude & Reasoning</span>
            </button>

            <button class="prep-subtab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${activeSubTab === 'technical' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-tab="technical">
              <i data-lucide="cpu" class="w-4 h-4"></i>
              <span>Technical Core CS</span>
            </button>

            <button class="prep-subtab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${activeSubTab === 'hr' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-tab="hr">
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>HR & STAR Method</span>
            </button>

            <button class="prep-subtab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${activeSubTab === 'quiz' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-tab="quiz">
              <i data-lucide="target" class="w-4 h-4"></i>
              <span>Interactive Practice Quiz</span>
            </button>
          </div>
        </div>

        <!-- Dynamic Subtab Content -->
        <div id="prep-tab-content">
          ${renderActiveContent()}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    attachEventListeners();
  }

  function renderActiveContent() {
    switch (activeSubTab) {
      case 'aptitude':
        return renderAptitudeSection();
      case 'technical':
        return renderTechnicalSection();
      case 'hr':
        return renderHrSection();
      case 'quiz':
        return renderQuizSection();
      default:
        return renderAptitudeSection();
    }
  }

  // 1. Aptitude Section
  function renderAptitudeSection() {
    const categories = ["All", "Quantitative", "Logical Reasoning", "Verbal Ability"];
    const filtered = aptitudeData.topics.filter(t => activeAptitudeCat === "All" || t.category === activeAptitudeCat);

    return `
      <div class="space-y-6">
        <!-- Category Pill Filters -->
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2">
            ${categories.map(cat => `
              <button class="btn-apt-filter px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${activeAptitudeCat === cat ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <button id="jump-to-quiz-btn" class="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/30 transition flex items-center gap-1.5">
            <i data-lucide="play-circle" class="w-3.5 h-3.5"></i>
            <span>Test Your Aptitude (Mock Quiz)</span>
          </button>
        </div>

        <!-- Topic Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${filtered.map(t => `
            <div class="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <h3 class="font-bold text-slate-100 text-base">${t.title}</h3>
                  <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-indigo-400 border border-slate-700">
                    ${t.category}
                  </span>
                </div>

                <div class="mt-3">
                  <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Essential Formulas & Theorems:</h4>
                  <ul class="space-y-1.5 text-xs text-slate-300">
                    ${t.formulas.map(f => `
                      <li class="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono text-indigo-300">
                        ${f}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span class="font-bold text-slate-300">Speed Shortcut: </span>
                ${t.quickTips.join(' ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 2. Technical Core CS Section
  function renderTechnicalSection() {
    const activeData = technicalCoreData.find(s => s.id === activeTechSubject) || technicalCoreData[0];

    return `
      <div class="space-y-6">
        <!-- Subject Selector -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${technicalCoreData.map(subject => `
            <button class="btn-tech-subject p-3 rounded-xl border text-left transition flex items-center gap-3 ${activeTechSubject === subject.id ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}" data-subject="${subject.id}">
              <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                <i data-lucide="${subject.icon}" class="w-4 h-4 text-indigo-400"></i>
              </div>
              <div class="truncate">
                <div class="text-xs font-bold truncate">${subject.subject}</div>
                <div class="text-[10px] text-slate-500">${subject.topics.length} Key Concepts</div>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Subject Topics Detail -->
        <div class="space-y-4">
          <div class="glass-panel rounded-xl p-4 border border-slate-800 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-white">${activeData.subject}</h2>
              <p class="text-xs text-slate-400 mt-0.5">${activeData.description}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4">
            ${activeData.topics.map(topic => `
              <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
                <div>
                  <h3 class="text-base font-bold text-indigo-300 flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
                    <span>${topic.title}</span>
                  </h3>
                  <p class="text-xs text-slate-300 mt-1 leading-relaxed">${topic.summary}</p>
                </div>

                <!-- Key Points -->
                <div class="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
                  <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Interview Takeaways</h4>
                  <ul class="space-y-1.5 text-xs text-slate-300">
                    ${topic.keyPoints.map(kp => `
                      <li class="flex items-start gap-2">
                        <span class="text-indigo-400 font-bold">•</span>
                        <span>${kp}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Code / Syntax Example -->
                ${topic.codeSnippet ? `
                  <div class="space-y-1">
                    <div class="text-[10px] uppercase font-bold text-slate-500 font-mono">Code / Query / Diagram Reference:</div>
                    <pre class="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-indigo-200 overflow-x-auto"><code>${topic.codeSnippet}</code></pre>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 3. HR & Behavioral Section
  function renderHrSection() {
    const { starMethod, topQuestions, questionsToAskInterviewer } = hrBehavioralData;

    return `
      <div class="space-y-6">
        <!-- The STAR Framework Card -->
        <div class="glass-panel rounded-xl p-6 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950">
          <div class="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
            <span>${starMethod.title}</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${starMethod.description}</p>

          <!-- 4 Pillars Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            ${starMethod.steps.map(step => `
              <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center justify-center font-mono">
                    ${step.letter}
                  </span>
                  <span class="font-bold text-slate-200 text-sm">${step.name}</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">${step.detail}</p>
                <div class="pt-2 border-t border-slate-800 text-[11px] text-amber-300/90 italic">
                  ${step.example}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Top Frequently Asked HR Questions -->
        <div class="space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <i data-lucide="help-circle" class="w-5 h-5 text-indigo-400"></i>
            <span>Top Behavioral & HR Questions with Model Responses</span>
          </h2>

          <div class="space-y-3">
            ${topQuestions.map(q => `
              <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="font-bold text-slate-100 text-sm sm:text-base">${q.question}</h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase">
                    High Frequency
                  </span>
                </div>

                <div class="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div><span class="font-bold text-slate-300">Interviewer Intent:</span> ${q.intent}</div>
                  <div><span class="font-bold text-slate-300">Recommended Structure:</span> ${q.structure}</div>
                </div>

                <div class="p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                  <span class="font-bold text-indigo-400 block mb-1">Sample Script / Model Response:</span>
                  "${q.modelAnswer}"
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Questions to Ask the Interviewer -->
        <div class="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
          <h3 class="font-bold text-white text-sm flex items-center gap-2">
            <i data-lucide="message-square" class="w-4 h-4 text-emerald-400"></i>
            <span>Winning Questions to Ask at the End of the Interview</span>
          </h3>
          <p class="text-xs text-slate-400">Never say "No, I don't have questions". Use these questions to demonstrate high curiosity and cultural readiness:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            ${questionsToAskInterviewer.map(ask => `
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
                <span>${ask}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 4. Interactive Practice Quiz Arena
  function renderQuizSection() {
    const questions = aptitudeData.quizQuestions;
    const currentQ = questions[currentQuizIndex];
    const totalQ = questions.length;
    const selectedOption = userSelectedAnswers[currentQ.id];

    // Calculate score if submitted
    let score = 0;
    if (quizSubmitted) {
      questions.forEach(q => {
        if (userSelectedAnswers[q.id] === q.correctIndex) {
          score++;
        }
      });
    }

    return `
      <div class="space-y-6 max-w-3xl mx-auto">
        <!-- Quiz Control & Progress Bar -->
        <div class="glass-panel rounded-xl p-4 border border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30">
              Question ${currentQuizIndex + 1} of ${totalQ}
            </span>
            <span class="text-xs text-slate-400 font-medium">${currentQ.topic}</span>
          </div>

          ${quizSubmitted ? `
            <div class="text-xs font-bold text-emerald-400 font-mono">
              Final Score: ${score} / ${totalQ} (${Math.round((score / totalQ) * 100)}%)
            </div>
          ` : `
            <div class="text-xs text-slate-400 font-mono">
              Answered: ${Object.keys(userSelectedAnswers).length} / ${totalQ}
            </div>
          `}
        </div>

        <!-- Question Box -->
        <div class="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 class="text-base sm:text-lg font-bold text-slate-100 leading-snug">
            ${currentQ.question}
          </h3>

          <!-- Options -->
          <div class="space-y-3">
            ${currentQ.options.map((opt, idx) => {
              let btnClass = "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800/80";
              let badge = `${String.fromCharCode(65 + idx)}`;

              if (selectedOption === idx) {
                btnClass = "bg-indigo-600/20 border-indigo-500 text-indigo-200";
              }

              if (quizSubmitted) {
                if (idx === currentQ.correctIndex) {
                  btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                } else if (selectedOption === idx && idx !== currentQ.correctIndex) {
                  btnClass = "bg-rose-500/20 border-rose-500 text-rose-200";
                }
              }

              return `
                <button 
                  class="btn-quiz-option w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnClass}"
                  data-option-idx="${idx}"
                  ${quizSubmitted ? 'disabled' : ''}
                >
                  <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400 shrink-0">
                      ${badge}
                    </span>
                    <span>${opt}</span>
                  </div>

                  ${quizSubmitted && idx === currentQ.correctIndex ? `
                    <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
                  ` : ''}

                  ${quizSubmitted && selectedOption === idx && idx !== currentQ.correctIndex ? `
                    <i data-lucide="x" class="w-4 h-4 text-rose-400"></i>
                  ` : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Explanation Box (shown after selecting or submitting) -->
          ${(selectedOption !== undefined || quizSubmitted) ? `
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1 animate-fade-in">
              <div class="font-bold flex items-center gap-1.5 text-indigo-300">
                <i data-lucide="info" class="w-4 h-4 text-indigo-400"></i>
                <span>Step-by-Step Solution & Rationale:</span>
              </div>
              <p class="leading-relaxed text-slate-300">${currentQ.explanation}</p>
            </div>
          ` : ''}

          <!-- Footer Navigation Buttons -->
          <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button 
              id="quiz-prev-btn" 
              class="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition disabled:opacity-40"
              ${currentQuizIndex === 0 ? 'disabled' : ''}
            >
              Previous
            </button>

            <div class="flex items-center gap-2">
              ${quizSubmitted ? `
                <button id="quiz-retry-btn" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition">
                  Retake Quiz
                </button>
              ` : `
                <button id="quiz-submit-all-btn" class="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition">
                  Finish & Score
                </button>
              `}

              <button 
                id="quiz-next-btn" 
                class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition disabled:opacity-40"
                ${currentQuizIndex === totalQ - 1 ? 'disabled' : ''}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachEventListeners() {
    // Subtab switcher
    container.querySelectorAll('.prep-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubTab = btn.getAttribute('data-tab');
        render();
      });
    });

    // Jump to quiz button inside aptitude
    const jumpQuiz = container.querySelector('#jump-to-quiz-btn');
    if (jumpQuiz) {
      jumpQuiz.addEventListener('click', () => {
        activeSubTab = 'quiz';
        render();
      });
    }

    // Aptitude category filter
    container.querySelectorAll('.btn-apt-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeAptitudeCat = btn.getAttribute('data-cat');
        render();
      });
    });

    // Technical subject selector
    container.querySelectorAll('.btn-tech-subject').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTechSubject = btn.getAttribute('data-subject');
        render();
      });
    });

    // Quiz options click
    container.querySelectorAll('.btn-quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizSubmitted) return;
        const optIdx = parseInt(btn.getAttribute('data-option-idx'), 10);
        const qId = aptitudeData.quizQuestions[currentQuizIndex].id;
        userSelectedAnswers[qId] = optIdx;
        render();
      });
    });

    // Quiz prev / next
    const prevBtn = container.querySelector('#quiz-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentQuizIndex > 0) {
          currentQuizIndex--;
          render();
        }
      });
    }

    const nextBtn = container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentQuizIndex < aptitudeData.quizQuestions.length - 1) {
          currentQuizIndex++;
          render();
        }
      });
    }

    // Submit quiz
    const submitBtn = container.querySelector('#quiz-submit-all-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        quizSubmitted = true;
        let score = 0;
        aptitudeData.quizQuestions.forEach(q => {
          if (userSelectedAnswers[q.id] === q.correctIndex) score++;
        });
        store.recordQuizScore(score, aptitudeData.quizQuestions.length, "Aptitude General");
        render();
        if (window.showToast) {
          window.showToast(`Quiz completed! You scored ${score} out of ${aptitudeData.quizQuestions.length}.`, 'success');
        }
      });
    }

    // Retake quiz
    const retryBtn = container.querySelector('#quiz-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        quizSubmitted = false;
        userSelectedAnswers = {};
        currentQuizIndex = 0;
        render();
      });
    }
  }

  // Initial render
  render();
}
