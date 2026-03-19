let currentTab = 'focus'; // Default view

function setTab(tab) {
    currentTab = tab;
    document.getElementById('focusTab').className = (tab === 'focus' ? 'active' : '');
    document.getElementById('allTab').className = (tab === 'all' ? 'active' : '');
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = "";
    
    const today = new Date();
    today.setHours(0,0,0,0);

    let visibleCount = 0;

    // Sort tasks by date so the nearest one is always on top
    tasks.sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate));

    tasks.forEach(task => {
        const delivery = new Date(task.deliveryDate);
        const alertDate = new Date(delivery);
        alertDate.setDate(delivery.getDate() - 2);
        alertDate.setHours(0,0,0,0);

        // LOGIC: Show if in "All" tab, OR if "Focus" rule matches
        if (currentTab === 'all' || today >= alertDate) {
            visibleCount++;
            list.innerHTML += `
                <div class="task-card" style="border-left-color: ${today >= alertDate ? 'var(--primary)' : '#ccc'}">
                    <div class="task-info">
                        <h2>${task.name}</h2>
                        <p>${task.item}</p>
                        <span class="delivery-tag">Deliver: ${task.deliveryDate}</span>
                    </div>
                    <button class="done-btn" onclick="deleteTask(${task.id})">✓</button>
                </div>
            `;
        }
    });

    if(visibleCount === 0) {
        list.innerHTML = '<div class="empty-state"><p>No tasks found here!</p></div>';
    }
}