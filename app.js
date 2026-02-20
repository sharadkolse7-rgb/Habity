// ===== Karma Currency - App Logic =====
(function () {
  'use strict';

  // --- Default Data ---
  const DEFAULT_HABITS = [
    { id: 'h1', name: 'Junk Food', icon: 'fa-burger', type: 'bad', coins: -30 },
    { id: 'h2', name: 'Mindless Scrolling', icon: 'fa-mobile-screen', type: 'bad', coins: -20 },
    { id: 'h3', name: 'Procrastination', icon: 'fa-bed', type: 'bad', coins: -40 },
    { id: 'h4', name: 'Smoking', icon: 'fa-smoking', type: 'bad', coins: -50 },
    { id: 'h5', name: 'Skipping Meals', icon: 'fa-plate-wheat', type: 'bad', coins: -25 },
    { id: 'h6', name: '2L Water', icon: 'fa-glass-water', type: 'good', coins: 10 },
    { id: 'h7', name: '15m Meditation', icon: 'fa-spa', type: 'good', coins: 20 },
    { id: 'h8', name: 'Exercise', icon: 'fa-dumbbell', type: 'good', coins: 50 },
    { id: 'h9', name: 'Reading 30m', icon: 'fa-book-open', type: 'good', coins: 25 },
    { id: 'h10', name: 'Early Wake Up', icon: 'fa-sun', type: 'good', coins: 30 },
    { id: 'h11', name: 'Healthy Meal', icon: 'fa-apple-whole', type: 'good', coins: 15 },
    { id: 'h12', name: 'Journal Entry', icon: 'fa-pen-nib', type: 'neutral', coins: 0 },
    { id: 'h13', name: 'Mood Check-in', icon: 'fa-heart-pulse', type: 'neutral', coins: 0 },
  ];

  const DEFAULT_REWARDS = [
    { id: 'r1', name: '1 Hour Gaming', icon: 'fa-gamepad', cost: 200 },
    { id: 'r2', name: 'Movie Night', icon: 'fa-film', cost: 150 },
    { id: 'r3', name: 'Cheat Meal', icon: 'fa-pizza-slice', cost: 100 },
    { id: 'r4', name: 'Sleep In', icon: 'fa-moon', cost: 80 },
    { id: 'r5', name: 'Online Shopping', icon: 'fa-cart-shopping', cost: 300 },
  ];

  // --- Profile Presets ---
  const PROFILE_PRESETS = [
    {
      id: 'profile-smoker', name: 'Quit Smoking', emoji: '🚬', color: '#ff5252',
      desc: 'Built for people quitting cigarettes — tracks cravings, replacements, and smoke-free streaks.',
      habits: [
        { id: 'ps1', name: 'No Cigarette Today', icon: 'fa-ban', type: 'good', coins: 50 },
        { id: 'ps2', name: 'Nicotine Gum Instead', icon: 'fa-candy-cane', type: 'good', coins: 10 },
        { id: 'ps3', name: 'Deep Breathing 5m', icon: 'fa-wind', type: 'good', coins: 15 },
        { id: 'ps4', name: 'Avoided Smoke Trigger', icon: 'fa-shield-halved', type: 'good', coins: 20 },
        { id: 'ps5', name: 'Drank Water on Craving', icon: 'fa-glass-water', type: 'good', coins: 10 },
        { id: 'ps6', name: 'Went for a Walk', icon: 'fa-person-walking', type: 'good', coins: 15 },
        { id: 'ps7', name: 'Smoked a Cigarette', icon: 'fa-smoking', type: 'bad', coins: -50 },
        { id: 'ps8', name: 'Bummed a Smoke', icon: 'fa-fire', type: 'bad', coins: -40 },
        { id: 'ps9', name: 'Craving Journaled', icon: 'fa-pen-nib', type: 'neutral', coins: 0 },
      ]
    },
    {
      id: 'profile-scroller', name: 'Digital Detox', emoji: '📱', color: '#448aff',
      desc: 'For compulsive scrollers — reduce screen time and build phone-free routines.',
      habits: [
        { id: 'pd1', name: 'Phone-Free Morning', icon: 'fa-sun', type: 'good', coins: 30 },
        { id: 'pd2', name: 'No Social Media 1hr', icon: 'fa-clock', type: 'good', coins: 20 },
        { id: 'pd3', name: 'Screen Time <2hrs', icon: 'fa-hourglass-half', type: 'good', coins: 40 },
        { id: 'pd4', name: 'Read Instead of Scroll', icon: 'fa-book-open', type: 'good', coins: 25 },
        { id: 'pd5', name: 'Phone in Other Room', icon: 'fa-door-open', type: 'good', coins: 20 },
        { id: 'pd6', name: 'Mindless Scrolling', icon: 'fa-mobile-screen', type: 'bad', coins: -20 },
        { id: 'pd7', name: 'Doom-scrolled 30m+', icon: 'fa-skull', type: 'bad', coins: -35 },
        { id: 'pd8', name: 'Checked Phone in Bed', icon: 'fa-bed', type: 'bad', coins: -15 },
        { id: 'pd9', name: 'Screen Time Logged', icon: 'fa-pen-nib', type: 'neutral', coins: 0 },
      ]
    },
    {
      id: 'profile-eater', name: 'Healthy Eater', emoji: '🥗', color: '#00e676',
      desc: 'For people fixing their diet — track meals, hydration, and junk food avoidance.',
      habits: [
        { id: 'pe1', name: 'Ate Home-Cooked Meal', icon: 'fa-utensils', type: 'good', coins: 20 },
        { id: 'pe2', name: '5 Servings Veggies', icon: 'fa-carrot', type: 'good', coins: 25 },
        { id: 'pe3', name: 'Meal Prepped', icon: 'fa-jar', type: 'good', coins: 35 },
        { id: 'pe4', name: 'Drank 2L Water', icon: 'fa-glass-water', type: 'good', coins: 10 },
        { id: 'pe5', name: 'No Sugar Today', icon: 'fa-candy-cane', type: 'good', coins: 30 },
        { id: 'pe6', name: 'Healthy Snack', icon: 'fa-apple-whole', type: 'good', coins: 15 },
        { id: 'pe7', name: 'Junk Food', icon: 'fa-burger', type: 'bad', coins: -30 },
        { id: 'pe8', name: 'Skipped Meals', icon: 'fa-plate-wheat', type: 'bad', coins: -25 },
        { id: 'pe9', name: 'Late Night Snack', icon: 'fa-moon', type: 'bad', coins: -20 },
        { id: 'pe10', name: 'Calorie Logged', icon: 'fa-pen-nib', type: 'neutral', coins: 0 },
      ]
    },
    {
      id: 'profile-fitness', name: 'Fitness Starter', emoji: '🏃', color: '#ffd740',
      desc: 'For beginners building a workout routine — tracks exercise, rest, and consistency.',
      habits: [
        { id: 'pf1', name: '30min Workout', icon: 'fa-dumbbell', type: 'good', coins: 50 },
        { id: 'pf2', name: '10K Steps', icon: 'fa-shoe-prints', type: 'good', coins: 25 },
        { id: 'pf3', name: 'Stretched 10min', icon: 'fa-child-reaching', type: 'good', coins: 15 },
        { id: 'pf4', name: 'Early Wake Up', icon: 'fa-sun', type: 'good', coins: 30 },
        { id: 'pf5', name: 'Protein-Rich Meal', icon: 'fa-egg', type: 'good', coins: 15 },
        { id: 'pf6', name: 'Slept 7-8 Hours', icon: 'fa-bed', type: 'good', coins: 20 },
        { id: 'pf7', name: 'Skipped Workout', icon: 'fa-couch', type: 'bad', coins: -30 },
        { id: 'pf8', name: 'Ate Junk After Gym', icon: 'fa-burger', type: 'bad', coins: -20 },
        { id: 'pf9', name: 'Stayed Up Late', icon: 'fa-moon', type: 'bad', coins: -25 },
        { id: 'pf10', name: 'Body Measurement', icon: 'fa-ruler', type: 'neutral', coins: 0 },
      ]
    }
  ];

  // --- Tips Data ---
  const TIPS_DATA = [
    {
      title: 'The 2-Minute Rule',
      category: 'build',
      icon: 'fa-stopwatch',
      body: 'Make any new habit stupidly easy. Shrink it to 2 minutes. Your brain won\'t resist something tiny.',
      example: 'Want to exercise daily? Don\'t commit to 1 hour. Just say "I\'ll put on my running shoes and step outside." Most days, you\'ll keep going. The days you don\'t — you still built the cue.'
    },
    {
      title: 'Habit Stacking',
      category: 'build',
      icon: 'fa-layer-group',
      body: 'Attach a new habit to something you already do. The old habit becomes the trigger for the new one.',
      example: 'You already brew coffee every morning. Stack: "After I pour my coffee, I\'ll write 3 things I\'m grateful for." You never forget because coffee is the trigger.'
    },
    {
      title: 'The Replacement Ritual',
      category: 'quit',
      icon: 'fa-repeat',
      body: 'You can\'t just delete a bad habit — you need to replace the reward. Find what the bad habit gives you (stress relief, boredom fix) and get it differently.',
      example: 'Smoking gives you a 5-minute break + stress relief. Replace with: grab a mint, step outside, do 10 deep breaths. Same break, same stress relief, zero nicotine.'
    },
    {
      title: 'Phone Parking',
      category: 'quit',
      icon: 'fa-mobile-screen',
      body: 'Your phone is designed to hijack your attention. The only reliable fix is physical distance, not willpower.',
      example: 'Working from home? Put your phone in a drawer in another room from 9 AM–12 PM. First week is brutal. By week 3, you\'ll finish your morning work in half the time.'
    },
    {
      title: 'Meal Prep Sunday',
      category: 'build',
      icon: 'fa-utensils',
      body: 'Healthy eating fails because of decisions, not desire. When you\'re hungry and tired, you pick junk. Remove the decision.',
      example: 'Every Sunday, cook 5 portions of chicken + rice + veggies. Put them in containers. Mon-Fri lunch is decided. You saved 5 junk-food decisions per week.'
    },
    {
      title: 'Temptation Bundling',
      category: 'build',
      icon: 'fa-gift',
      body: 'Pair something you NEED to do with something you WANT to do. The treat makes the task irresistible.',
      example: 'Love podcasts but hate running? Rule: "I can ONLY listen to my favorite podcast while running." Suddenly you look forward to runs because it\'s podcast time.'
    },
    {
      title: 'The Craving Delay',
      category: 'quit',
      icon: 'fa-hourglass-half',
      body: 'Cravings peak and fade in ~10 minutes. You don\'t need to resist forever — just surf the wave until it passes.',
      example: 'Craving a cigarette at 3 PM? Set a 10-minute timer. Drink water, take a short walk. By the time the timer rings, 80% of the time the craving has faded. Log it as a win.'
    },
    {
      title: 'Environment Design',
      category: 'build',
      icon: 'fa-couch',
      body: 'Redesign your space so the good habit is the easiest path and the bad habit requires effort.',
      example: 'Want to read more, scroll less? Charge your phone in the kitchen. Put a book on your pillow. When you get into bed, the book is there, the phone isn\'t. Problem solved.'
    },
    {
      title: 'The Streak Effect',
      category: 'build',
      icon: 'fa-fire',
      body: 'Once you have 5+ days of a streak, breaking it feels like losing. Use this psychological trick deliberately.',
      example: 'Use this app to log "Drank 2L Water" daily. After 7 days, you\'ll see a streak forming. On day 8 when you don\'t feel like it, you\'ll think "I can\'t break my streak." That\'s the magic.'
    },
    {
      title: 'Friction Engineering',
      category: 'quit',
      icon: 'fa-road-barrier',
      body: 'Add steps between you and the bad habit. Each extra step gives your rational brain time to intervene.',
      example: 'Can\'t stop ordering junk food? Delete the app. Now you\'d need to: open browser → search restaurant → log in → enter address → order. It\'s 6 steps instead of 2 taps. You\'ll order 70% less.'
    },
    {
      title: 'Identity Shift',
      category: 'build',
      icon: 'fa-id-card',
      body: 'Stop saying "I\'m trying to exercise." Start saying "I\'m a person who works out." Your actions follow your identity, not your goals.',
      example: 'Every time you log a workout in this app, tell yourself: "This is what athletes do." Over time, you stop debating whether to work out — athletes don\'t debate, they train.'
    },
    {
      title: 'Social Accountability',
      category: 'quit',
      icon: 'fa-users',
      body: 'Tell someone specific about your goal and set a check-in schedule. Vague "I\'ll try" fails. Concrete reporting works.',
      example: 'Tell a friend: "I\'m quitting scrolling past 10 PM. I\'ll text you every night at 10:05 PM with my screen time screenshot." The embarrassment of a bad screenshot is more powerful than willpower.'
    },
  ];

  // --- State ---
  let isFirstRun = false;
  let state = loadState();
  let isFirstRun = false;

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem('karma_currency_state'));
      if (s && s.habits) return s;
    } catch (e) { }
    isFirstRun = true;
    return { balance: 0, habits: [...DEFAULT_HABITS], rewards: [...DEFAULT_REWARDS], history: [], lastCarryforward: null };
  }
  function saveState() { localStorage.setItem('karma_currency_state', JSON.stringify(state)); }

  // --- Theme ---
  function initTheme() {
    const saved = localStorage.getItem('karma_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('karma_theme', next);
    updateThemeIcon(next);
  }
  function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // --- DOM Refs ---
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const balanceEl = $('#balance-display');
  const walletEl = $('#wallet');
  const toastContainer = $('#toast-container');
  const coinLayer = $('#coin-animation-layer');
  const modalOverlay = $('#modal-overlay');
  const modalTitle = $('#modal-title');
  const modalBody = $('#modal-body');

  // --- Render Balance ---
  function renderBalance() {
    balanceEl.textContent = state.balance.toLocaleString();
    balanceEl.className = 'wallet-balance ' + (state.balance > 0 ? 'positive' : state.balance < 0 ? 'negative' : 'zero');
  }

  // --- Toast ---
  function showToast(text, type = 'positive') {
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = text;
    toastContainer.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  // --- Coin Animation ---
  function spawnCoins(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'coin-fly';
      c.textContent = '🪙';
      c.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
      c.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
      coinLayer.appendChild(c);
      setTimeout(() => c.remove(), 1100);
    }
  }

  // --- Log Habit ---
  function logHabit(habit, e) {
    state.balance += habit.coins;
    state.history.unshift({ name: habit.name, coins: habit.coins, type: habit.type, time: Date.now() });
    if (state.history.length > 200) state.history.length = 200;
    saveState();
    renderBalance();
    renderHistory();
    renderCalendar();

    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) spawnCoins(rect.left + rect.width / 2, rect.top);

    if (habit.coins > 0) showToast(`+${habit.coins} 🪙  ${habit.name}`, 'positive');
    else if (habit.coins < 0) showToast(`${habit.coins} 🪙  ${habit.name}`, 'negative');
    else showToast(`📝 ${habit.name} logged`, 'neutral');
  }

  // --- Spend Reward ---
  function spendReward(reward, e) {
    if (state.balance < reward.cost) {
      showToast(`Not enough coins! Need ${reward.cost}`, 'negative');
      return;
    }
    state.balance -= reward.cost;
    state.history.unshift({ name: reward.name, coins: -reward.cost, type: 'spend', time: Date.now() });
    saveState();
    renderBalance();
    renderHistory();
    renderCalendar();
    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) spawnCoins(rect.left + rect.width / 2, rect.top);
    showToast(`-${reward.cost} 🪙  ${reward.name}`, 'spend');
  }

  // --- Render Habits Tab ---
  function renderHabits() {
    const good = state.habits.filter(h => h.type === 'good');
    const bad = state.habits.filter(h => h.type === 'bad');
    const neutral = state.habits.filter(h => h.type === 'neutral');

    $('#good-habits-list').innerHTML = good.map(h => habitCard(h, 'good')).join('');
    $('#bad-habits-list').innerHTML = bad.map(h => habitCard(h, 'bad')).join('');
    $('#neutral-habits-list').innerHTML = neutral.map(h => habitCard(h, 'neutral')).join('');

    // Attach events
    $$('.habit-card[data-hid]').forEach(card => {
      card.addEventListener('click', e => {
        const h = state.habits.find(x => x.id === card.dataset.hid);
        if (h) logHabit(h, e);
      });
    });
  }

  function habitCard(h, type) {
    const sign = h.coins > 0 ? '+' : '';
    return `<div class="habit-card ${type}" data-hid="${h.id}">
    <div class="habit-icon"><i class="fa-solid ${h.icon}"></i></div>
    <div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-detail">Tap to log</div></div>
    <div class="habit-coins">${sign}${h.coins}</div></div>`;
  }

  // --- Render Shop ---
  function renderShop() {
    $('#rewards-list').innerHTML = state.rewards.map(r =>
      `<div class="habit-card reward" data-rid="${r.id}">
      <div class="habit-icon"><i class="fa-solid ${r.icon}"></i></div>
      <div class="habit-info"><div class="habit-name">${r.name}</div><div class="habit-detail">Tap to redeem</div></div>
      <div class="habit-coins">${r.cost} 🪙</div></div>`
    ).join('');

    $$('.habit-card[data-rid]').forEach(card => {
      card.addEventListener('click', e => {
        const r = state.rewards.find(x => x.id === card.dataset.rid);
        if (r) spendReward(r, e);
      });
    });
  }

  // --- Render Manage ---
  function renderManage() {
    const items = state.habits.map(h => {
      const sign = h.coins > 0 ? '+' : '';
      const typeLabel = h.type === 'good' ? '🟢' : h.type === 'bad' ? '🔴' : '⚪';
      return `<div class="manage-item">
      <div class="habit-info">
        <div class="habit-name">${typeLabel} ${h.name}</div>
        <div class="habit-detail">${sign}${h.coins} coins</div>
      </div>
      <div class="manage-actions">
        <button class="btn-edit" data-eid="${h.id}"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-delete" data-did="${h.id}"><i class="fa-solid fa-trash"></i></button>
      </div></div>`;
    }).join('');
    $('#manage-list').innerHTML = items;

    $$('.btn-edit[data-eid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const h = state.habits.find(x => x.id === btn.dataset.eid);
        if (h) openEditModal(h);
      });
    });
    $$('.btn-delete[data-did]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.habits = state.habits.filter(x => x.id !== btn.dataset.did);
        saveState(); renderAll();
        showToast('Habit deleted', 'negative');
      });
    });
  }

  // --- Render History ---
  function renderHistory() {
    if (!state.history.length) {
      $('#history-list').innerHTML = '<div style="text-align:center;padding:40px 0;color:var(--text-dim);font-size:.85rem">No transactions yet</div>';
      return;
    }
    $('#history-list').innerHTML = state.history.slice(0, 50).map(h => {
      const sign = h.coins > 0 ? '+' : '';
      const cls = h.type === 'spend' ? 'spend' : h.type === 'carryforward' ? 'carryforward' : h.type;
      const icon = h.type === 'good' ? 'fa-arrow-up' : h.type === 'bad' ? 'fa-arrow-down' : h.type === 'spend' ? 'fa-bag-shopping' : h.type === 'carryforward' ? 'fa-rotate-right' : 'fa-minus';
      const ago = timeAgo(h.time);
      return `<div class="history-item ${cls}">
      <div class="hi-icon"><i class="fa-solid ${icon}"></i></div>
      <div class="hi-info"><div class="hi-name">${h.name}</div><div class="hi-time">${ago}</div></div>
      <div class="hi-coins">${sign}${h.coins}</div></div>`;
    }).join('');
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  // --- Render Tips ---
  function renderTips() {
    const filterBtns = `<div class="tips-filter">
    <button class="tip-filter-btn active" data-filter="all">All</button>
    <button class="tip-filter-btn" data-filter="build">🔨 Build</button>
    <button class="tip-filter-btn" data-filter="quit">🚫 Quit</button>
  </div>`;

    const cards = TIPS_DATA.map((tip, i) => `
    <div class="tip-card" data-category="${tip.category}" style="animation-delay:${i * 0.05}s">
      <div class="tip-header">
        <div class="tip-icon-wrap ${tip.category}"><i class="fa-solid ${tip.icon}"></i></div>
        <div class="tip-meta">
          <div class="tip-title">${tip.title}</div>
          <span class="tip-badge ${tip.category}">${tip.category === 'build' ? '🔨 Build Habit' : '🚫 Quit Habit'}</span>
        </div>
      </div>
      <div class="tip-body">${tip.body}</div>
      <div class="tip-example">
        <div class="tip-example-label"><i class="fa-solid fa-lightbulb"></i> Real Example</div>
        <div class="tip-example-text">${tip.example}</div>
      </div>
    </div>
  `).join('');

    $('#tab-tips').innerHTML = `
    <div class="section-title tips"><i class="fa-solid fa-lightbulb"></i> Practical Tips</div>
    ${filterBtns}
    <div class="tips-grid">${cards}</div>
  `;

    // Filter logic
    $$('.tip-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tip-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        $$('.tip-card').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Calendar ---
  let calendarMonth = new Date().getMonth();
  let calendarYear = new Date().getFullYear();

  function renderCalendar() {
    const container = $('#tab-calendar');
    if (!container) return;

    const now = new Date();
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay(); // 0=Sun
    const daysInMonth = lastDay.getDate();

    // Group history by date for this month
    const dayMap = {};
    state.history.forEach(h => {
      const d = new Date(h.time);
      if (d.getMonth() === calendarMonth && d.getFullYear() === calendarYear) {
        const key = d.getDate();
        if (!dayMap[key]) dayMap[key] = { total: 0, entries: [] };
        dayMap[key].total += h.coins;
        dayMap[key].entries.push(h);
      }
    });

    // Month summary
    let monthPositive = 0, monthNegative = 0;
    state.history.forEach(h => {
      const d = new Date(h.time);
      if (d.getMonth() === calendarMonth && d.getFullYear() === calendarYear) {
        if (h.coins > 0) monthPositive += h.coins;
        else monthNegative += h.coins;
      }
    });

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const isCurrentMonth = calendarMonth === now.getMonth() && calendarYear === now.getFullYear();
    const today = now.getDate();

    let calHTML = `
    <div class="section-title calendar-title"><i class="fa-solid fa-calendar-days"></i> Calendar</div>
    <div class="cal-nav">
      <button class="cal-nav-btn" id="cal-prev"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="cal-month-label">${monthNames[calendarMonth]} ${calendarYear}</div>
      <button class="cal-nav-btn" id="cal-next"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <div class="cal-summary">
      <div class="cal-stat positive"><i class="fa-solid fa-arrow-up"></i> +${monthPositive}</div>
      <div class="cal-stat negative"><i class="fa-solid fa-arrow-down"></i> ${monthNegative}</div>
      <div class="cal-stat net ${(monthPositive + monthNegative) >= 0 ? 'positive' : 'negative'}"><i class="fa-solid fa-equals"></i> ${monthPositive + monthNegative >= 0 ? '+' : ''}${monthPositive + monthNegative}</div>
    </div>
    <div class="cal-grid">
      <div class="cal-weekday">S</div><div class="cal-weekday">M</div><div class="cal-weekday">T</div>
      <div class="cal-weekday">W</div><div class="cal-weekday">T</div><div class="cal-weekday">F</div><div class="cal-weekday">S</div>
  `;

    // Empty cells before month starts
    for (let i = 0; i < startDayOfWeek; i++) calHTML += '<div class="cal-day empty"></div>';

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const data = dayMap[d];
      let cls = 'cal-day';
      if (isCurrentMonth && d === today) cls += ' today';
      if (data) {
        if (data.total > 0) cls += ' positive';
        else if (data.total < 0) cls += ' negative';
        else cls += ' neutral-day';
      }
      const dotCount = data ? Math.min(data.entries.length, 5) : 0;
      const dots = dotCount > 0 ? `<div class="cal-dots">${'<span class="cal-dot"></span>'.repeat(dotCount)}</div>` : '';
      calHTML += `<div class="${cls}" data-day="${d}"><span class="cal-day-num">${d}</span>${dots}</div>`;
    }

    calHTML += '</div><div class="cal-day-detail" id="cal-day-detail"></div>';

    // Carryforward info
    if (!isCurrentMonth) {
      const prevCarry = getCarryforwardInfo(calendarMonth, calendarYear);
      if (prevCarry) {
        calHTML += `<div class="carryforward-info">
        <div class="cf-label"><i class="fa-solid fa-rotate-right"></i> Month-End Carryforward</div>
        <div class="cf-detail">Positive coins (50%): <strong>${prevCarry.positiveCarry}</strong> · Negative coins (100%): <strong>${prevCarry.negativeCarry}</strong></div>
        <div class="cf-detail">Net carried: <strong>${prevCarry.positiveCarry + prevCarry.negativeCarry >= 0 ? '+' : ''}${prevCarry.positiveCarry + prevCarry.negativeCarry}</strong></div>
      </div>`;
      }
    }

    container.innerHTML = calHTML;

    // Events
    $('#cal-prev')?.addEventListener('click', () => {
      calendarMonth--;
      if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
      renderCalendar();
    });
    $('#cal-next')?.addEventListener('click', () => {
      calendarMonth++;
      if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
      renderCalendar();
    });

    // Day click
    $$('.cal-day[data-day]').forEach(dayEl => {
      dayEl.addEventListener('click', () => {
        const day = parseInt(dayEl.dataset.day);
        const data = dayMap[day];
        const detail = $('#cal-day-detail');
        if (!data) {
          detail.innerHTML = `<div class="cdd-empty">${monthNames[calendarMonth]} ${day} — No activity logged</div>`;
          return;
        }
        const dateStr = `${monthNames[calendarMonth]} ${day}, ${calendarYear}`;
        detail.innerHTML = `
        <div class="cdd-header">${dateStr} <span class="cdd-total ${data.total >= 0 ? 'positive' : 'negative'}">${data.total >= 0 ? '+' : ''}${data.total} coins</span></div>
        ${data.entries.map(e => {
          const sign = e.coins > 0 ? '+' : '';
          const cls = e.type === 'spend' ? 'spend' : e.type;
          return `<div class="cdd-entry ${cls}"><span class="cdd-name">${e.name}</span><span class="cdd-coins">${sign}${e.coins}</span></div>`;
        }).join('')}
      `;
      });
    });
  }

  function getCarryforwardInfo(month, year) {
    let pos = 0, neg = 0;
    state.history.forEach(h => {
      const d = new Date(h.time);
      if (d.getMonth() === month && d.getFullYear() === year && h.type !== 'carryforward') {
        if (h.coins > 0) pos += h.coins;
        else neg += h.coins;
      }
    });
    if (pos === 0 && neg === 0) return null;
    return { positiveCarry: Math.floor(pos * 0.5), negativeCarry: neg };
  }

  // --- Carryforward Logic ---
  function processCarryforward() {
    const now = new Date();
    const currentKey = `${now.getFullYear()}-${now.getMonth()}`;

    if (state.lastCarryforward === currentKey) return; // Already processed this month

    // Find the previous month with activity
    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    let totalPos = 0, totalNeg = 0;
    state.history.forEach(h => {
      const d = new Date(h.time);
      if (d.getMonth() === prevMonth && d.getFullYear() === prevYear && h.type !== 'carryforward') {
        if (h.coins > 0) totalPos += h.coins;
        else totalNeg += h.coins;
      }
    });

    if (totalPos === 0 && totalNeg === 0) {
      state.lastCarryforward = currentKey;
      saveState();
      return;
    }

    const posCarry = Math.floor(totalPos * 0.5);
    const negCarry = totalNeg; // 100% carry
    const netCarry = posCarry + negCarry;

    if (netCarry !== 0) {
      state.history.unshift({
        name: `Carryforward from ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][prevMonth]}`,
        coins: netCarry,
        type: 'carryforward',
        time: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0).getTime()
      });
      state.balance += netCarry;
    }

    state.lastCarryforward = currentKey;
    saveState();

    if (netCarry !== 0) {
      showToast(`📅 Carryforward: ${netCarry >= 0 ? '+' : ''}${netCarry} coins`, netCarry >= 0 ? 'positive' : 'negative');
    }
  }

  // --- Render All ---
  function renderAll() { renderBalance(); renderHabits(); renderShop(); renderManage(); renderHistory(); renderTips(); renderCalendar(); }

  // --- Tabs ---
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.tab-content').forEach(tc => tc.classList.remove('active'));
      $(`#tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // --- Modal ---
  function openModal(title, bodyHTML) {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHTML;
    modalOverlay.classList.add('open');
  }
  function closeModal() { modalOverlay.classList.remove('open'); }
  $('#modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  // Icon picker list
  const ICONS = ['fa-dumbbell', 'fa-book-open', 'fa-spa', 'fa-glass-water', 'fa-apple-whole', 'fa-sun',
    'fa-pen-nib', 'fa-heart-pulse', 'fa-burger', 'fa-smoking', 'fa-mobile-screen', 'fa-bed',
    'fa-plate-wheat', 'fa-pizza-slice', 'fa-gamepad', 'fa-film', 'fa-moon', 'fa-cart-shopping',
    'fa-music', 'fa-bicycle', 'fa-mug-hot', 'fa-brain', 'fa-graduation-cap', 'fa-laptop-code',
    'fa-dog', 'fa-seedling', 'fa-fire', 'fa-leaf', 'fa-face-smile', 'fa-trophy'];

  function iconPickerHTML(selected) {
    return `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${ICONS.map(ic => `<div class="icon-opt${ic === selected ? ' sel' : ''}" data-icon="${ic}" style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid ${ic === selected ? 'var(--blue)' : 'var(--border)'};background:${ic === selected ? 'rgba(68,138,255,.2)' : 'var(--surface)'};font-size:.9rem;color:var(--text)"><i class="fa-solid ${ic}"></i></div>`).join('')
      }</div>`;
  }

  function attachIconPicker(formEl, inputName) {
    formEl.querySelectorAll('.icon-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        formEl.querySelectorAll('.icon-opt').forEach(o => { o.style.borderColor = 'var(--border)'; o.style.background = 'var(--surface)'; o.classList.remove('sel'); });
        opt.style.borderColor = 'var(--blue)'; opt.style.background = 'rgba(68,138,255,.2)'; opt.classList.add('sel');
        formEl.querySelector(`[name="${inputName}"]`).value = opt.dataset.icon;
      });
    });
  }

  // --- Add Habit Modal ---
  function openAddHabitModal() {
    const defaultIcon = 'fa-fire';
    openModal('Add Habit', `
    <form id="add-habit-form">
      <div class="form-group"><label>Name</label><input name="name" required placeholder="e.g. Cold Shower"></div>
      <div class="form-group"><label>Type</label>
        <select name="type"><option value="good">Good (+coins)</option><option value="bad">Bad (-coins)</option><option value="neutral">Neutral (0)</option></select></div>
      <div class="form-group"><label>Coins</label><input name="coins" type="number" required placeholder="e.g. 25"></div>
      <div class="form-group"><label>Icon</label><input type="hidden" name="icon" value="${defaultIcon}">${iconPickerHTML(defaultIcon)}</div>
      <button type="submit" class="btn-submit">Add Habit</button>
    </form>`);
    const form = $('#add-habit-form');
    attachIconPicker(form, 'icon');
    form.querySelector('[name="type"]').addEventListener('change', e => {
      const ci = form.querySelector('[name="coins"]');
      if (e.target.value === 'neutral') ci.value = 0;
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      let coins = parseInt(fd.get('coins')) || 0;
      const type = fd.get('type');
      if (type === 'bad' && coins > 0) coins = -coins;
      if (type === 'neutral') coins = 0;
      state.habits.push({ id: 'h' + Date.now(), name: fd.get('name'), icon: fd.get('icon'), type, coins });
      saveState(); renderAll(); closeModal();
      showToast('Habit added!', 'positive');
    });
  }

  // --- Edit Habit Modal ---
  function openEditModal(h) {
    openModal('Edit Habit', `
    <form id="edit-habit-form">
      <div class="form-group"><label>Name</label><input name="name" required value="${h.name}"></div>
      <div class="form-group"><label>Type</label>
        <select name="type"><option value="good"${h.type === 'good' ? ' selected' : ''}>Good</option><option value="bad"${h.type === 'bad' ? ' selected' : ''}>Bad</option><option value="neutral"${h.type === 'neutral' ? ' selected' : ''}>Neutral</option></select></div>
      <div class="form-group"><label>Coins</label><input name="coins" type="number" required value="${Math.abs(h.coins)}"></div>
      <div class="form-group"><label>Icon</label><input type="hidden" name="icon" value="${h.icon}">${iconPickerHTML(h.icon)}</div>
      <button type="submit" class="btn-submit">Save Changes</button>
    </form>`);
    const form = $('#edit-habit-form');
    attachIconPicker(form, 'icon');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      let coins = parseInt(fd.get('coins')) || 0;
      const type = fd.get('type');
      if (type === 'bad' && coins > 0) coins = -coins;
      if (type === 'neutral') coins = 0;
      h.name = fd.get('name'); h.icon = fd.get('icon'); h.type = type; h.coins = coins;
      saveState(); renderAll(); closeModal();
      showToast('Habit updated!', 'positive');
    });
  }

  // --- Add Reward Modal ---
  function openAddRewardModal() {
    const defaultIcon = 'fa-trophy';
    openModal('Add Reward', `
    <form id="add-reward-form">
      <div class="form-group"><label>Name</label><input name="name" required placeholder="e.g. Bubble Tea"></div>
      <div class="form-group"><label>Cost (Coins)</label><input name="cost" type="number" required placeholder="e.g. 100" min="1"></div>
      <div class="form-group"><label>Icon</label><input type="hidden" name="icon" value="${defaultIcon}">${iconPickerHTML(defaultIcon)}</div>
      <button type="submit" class="btn-submit">Add Reward</button>
    </form>`);
    const form = $('#add-reward-form');
    attachIconPicker(form, 'icon');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      state.rewards.push({ id: 'r' + Date.now(), name: fd.get('name'), icon: fd.get('icon'), cost: parseInt(fd.get('cost')) || 0 });
      saveState(); renderShop(); closeModal();
      showToast('Reward added!', 'positive');
    });
  }

  // --- Profile Picker Modal ---
  function openProfilePickerModal(isFirstRun = false) {
    const profiles = PROFILE_PRESETS.map(p => `
    <div class="profile-card" data-pid="${p.id}" style="border-color:${p.color}33">
      <div class="profile-emoji">${p.emoji}</div>
      <div class="profile-info">
        <div class="profile-name">${p.name}</div>
        <div class="profile-desc">${p.desc}</div>
        <div class="profile-count">${p.habits.length} habits pre-loaded</div>
      </div>
    </div>
  `).join('');

    const skipBtn = isFirstRun ? `<button class="btn-submit" style="background:var(--surface);color:var(--text-dim);margin-top:8px" id="profile-skip">Skip — Use Default</button>` : '';

    openModal(isFirstRun ? 'Choose Your Profile' : 'Load Profile', `
    <div style="font-size:.82rem;color:var(--text-dim);margin-bottom:12px">${isFirstRun ? 'Pick a profile to get started with habits tailored to your goal.' : '⚠️ This will replace your current habits.'}</div>
    <div class="profile-grid">${profiles}</div>
    ${skipBtn}
  `);

    $$('.profile-card[data-pid]').forEach(card => {
      card.addEventListener('click', () => {
        const p = PROFILE_PRESETS.find(x => x.id === card.dataset.pid);
        if (!p) return;

        if (!isFirstRun && !confirm(`Replace all current habits with "${p.name}" profile?`)) return;

        state.habits = p.habits.map(h => ({ ...h }));
        saveState(); renderAll(); closeModal();
        showToast(`${p.emoji} ${p.name} profile loaded!`, 'positive');
      });
    });

    if (isFirstRun) {
      $('#profile-skip')?.addEventListener('click', () => { closeModal(); });
    }
  }

  // --- Quick Add Modal ---
  function openQuickAdd() {
    const items = state.habits.map(h => {
      const sign = h.coins > 0 ? '+' : '';
      return `<div class="quick-item ${h.type}" data-qid="${h.id}">
      <div class="qi-icon"><i class="fa-solid ${h.icon}"></i></div>
      <div class="qi-name">${h.name}</div>
      <div class="qi-coins">${sign}${h.coins}</div></div>`;
    }).join('');
    openModal('Quick Log', `<div class="quick-grid">${items}</div>`);
    $$('.quick-item[data-qid]').forEach(qi => {
      qi.addEventListener('click', e => {
        const h = state.habits.find(x => x.id === qi.dataset.qid);
        if (h) { logHabit(h, e); closeModal(); }
      });
    });
  }

  // --- Event Bindings ---
  $('#fab-quick').addEventListener('click', openQuickAdd);
  $('#btn-add-habit').addEventListener('click', openAddHabitModal);
  $('#btn-add-reward').addEventListener('click', openAddRewardModal);
  $('#btn-load-profile').addEventListener('click', () => openProfilePickerModal(false));
  $('#theme-toggle').addEventListener('click', toggleTheme);
  $('#btn-clear-history').addEventListener('click', () => {
    if (confirm('Clear all history?')) {
      state.history = []; saveState(); renderHistory(); renderCalendar();
      showToast('History cleared', 'neutral');
    }
  });

  // --- Init ---
  initTheme();
  processCarryforward();
  renderAll();

  // Show profile picker on first run
  if (isFirstRun) {
    setTimeout(() => openProfilePickerModal(true), 500);
  }

})();
