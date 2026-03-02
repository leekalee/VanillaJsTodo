const mainTitle = document.querySelector('#main-title');
const themeBtn = document.querySelector('#theme-toggle');
const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#user-input');
const list = document.querySelector('#list');
const clearBtn = document.querySelector('#clear-btn');

const taskCounter = document.createElement('p');
taskCounter.innerHTML = 'Количество задач: <span id="task-count">0</span>';
list.before(taskCounter);

const taskCount = document.querySelector('#task-count');

mainTitle.textContent = 'Привет студенты! Я теперь живой!';
mainTitle.style.color = 'royalblue';
mainTitle.style.fontSize = '40px';

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.style.cursor = 'pointer';

    const date = document.createElement('small');
    date.textContent = ` (${new Date().toLocaleDateString()})`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'редактировать';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'удалить';

    li.append(span, date, editBtn, deleteBtn);
    list.append(li);

    input.value = '';
    updateCount();
}

addBtn.addEventListener('click', addTask);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');
    }

    if (e.target.textContent === 'редактировать') {
        const span = li.querySelector('span');
        const newText = prompt('Редактировать задачу:', span.textContent);
        if (newText && newText.trim()) span.textContent = newText;
    }

    if (e.target.textContent === 'удалить') {
        li.remove();
        updateCount();
    }
});

function updateCount() {
    taskCount.textContent = list.children.length;
}

clearBtn.addEventListener('click', () => {
    if (confirm('Удалить все задачи?')) {
        list.innerHTML = '';
        updateCount();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        alert('Вы нажали Escape!');
    }
});