document.addEventListener('DOMContentLoaded', () => {

    // get elements
    const userInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));

    // process add btn
    addTaskBtn.addEventListener('click', () => {
        const inputValue = userInput.value.trim();
        if (inputValue === "") return;

        const newTask = {
            id: Date.now(),
            name: inputValue,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        userInput.value = "";
        renderTask(newTask);
        console.log(tasks)
    });

    // render task
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('task-id', task.id);
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
        <span>${task.name}</span>
        <button>Delete</button>`;
        taskList.appendChild(li);
        completeTask(task, li);
        delTask(task, li);
    }

    // complete task
    function completeTask(task, li) {
        li.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });
    }

    // delete task
    function delTask(task, li) {
        li.querySelector('button').addEventListener('click', (event) => {
            event.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })
    }

    // save task
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})