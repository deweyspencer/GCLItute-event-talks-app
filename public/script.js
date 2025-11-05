
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.category.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2025-11-04T10:00:00');

    talksToRender.forEach((talk, index) => {
      if (index === 2) {
        // Lunch Break after the second talk
        const breakElement = createBreakElement('Lunch Break', currentTime, 60);
        scheduleContainer.appendChild(breakElement);
        currentTime.setMinutes(currentTime.getMinutes() + 60);

        const transitionElement = createBreakElement('Transition', currentTime, 10);
        scheduleContainer.appendChild(transitionElement);
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }

      const talkElement = createTalkElement(talk, currentTime);
      scheduleContainer.appendChild(talkElement);
      currentTime.setMinutes(currentTime.getMinutes() + talk.duration);

      if (index < talks.length - 1 && index !== 1) {
        const transitionElement = createBreakElement('Transition', currentTime, 10);
        scheduleContainer.appendChild(transitionElement);
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }
    });
  }

  function createTalkElement(talk, time) {
    const div = document.createElement('div');
    div.classList.add('schedule-item');

    const timeString = formatTime(time) + ' - ' + formatTime(new Date(time.getTime() + talk.duration * 60000));

    div.innerHTML = `
      <div class="time">${timeString}</div>
      <div class="title">${talk.title}</div>
      <div class="speakers">${talk.speakers.join(', ')}</div>
      <div class="description">${talk.description}</div>
      <div class="category">${talk.category.map(cat => `<span>${cat}</span>`).join('')}</div>
    `;
    return div;
  }

  function createBreakElement(title, time, duration) {
    const div = document.createElement('div');
    div.classList.add('schedule-item', 'break');

    const timeString = formatTime(time) + ' - ' + formatTime(new Date(time.getTime() + duration * 60000));

    div.innerHTML = `
      <div class="time">${timeString}</div>
      <div class="title">${title}</div>
    `;
    return div;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
