'use strict'

const form = document.querySelector('.task-form')
const task = document.querySelector('#task')
const filter = document.querySelector('#filter')
const tasks = document.querySelector('.task-items')
const clearBtn = document.querySelector('.clear-tasks')

// Check local storage for task list
const checkStorage = () => {
	let taskList;
	if(localStorage.getItem('tasks') === null) {
		taskList = []
	} else {
		taskList = JSON.parse(localStorage.getItem('tasks'))
	}
	return taskList
}

// Create task
const createTask = (task) => {
	const li = document.createElement('li')
	li.innerText = task

	const link = document.createElement('a')
	link.classList.add('delete-task')
	link.innerHTML = '<i class="fas fa-times"></i>'
	li.appendChild(link)

	tasks.appendChild(li)
}

// Get task from storage
const getTasks = () => {
	let taskList = checkStorage()
	taskList.forEach(item => {
		createTask(item)
	})
}

// Store task in storage
const storeTask = (task) => {
	let taskList = checkStorage()
	
	taskList.push(task)
	localStorage.setItem('tasks', JSON.stringify(taskList))
}
 
// Remove task from local storage
const removeStoredTask = (task) => {
	let taskList = checkStorage()
	
	taskList.forEach((item, index) =>{
		if(task.textContent === item) {
			taskList.splice(index, 1)
		}
	})
	localStorage.setItem('tasks', JSON.stringify(taskList))
}

// Add task to list
const addTask = (e) => {
	e.preventDefault()

	if(task.value === '') {
		alert(`What's the task?`)
	} else {
		createTask(task.value)
		storeTask(task.value)
	}

	task.value = ''
}

// Delete task from list - event delegation
const deleteTask = (e) => {
	e.preventDefault()

	const li = e.target.parentElement.parentElement
	const isDelete = e.target.parentElement.classList.contains('delete-task')

	if(isDelete && confirm('Are you sure?')) {
		li.remove()
		removeStoredTask(li)
	}
}

// Filter tasks
const filterTasks = (e) => {
	e.preventDefault()

	const text = e.target.value.toLowerCase()

	document.querySelectorAll('.task-items li').forEach(task => {
		const item = task.textContent.toLowerCase()
		
		if(item.indexOf(text) > -1) {
			task.style.display = 'flex'
		} else {
			task.style.display = 'none'
		}
	})
}

// Clear tasks
const clearTasks = (e) => {
	e.preventDefault()
	tasks.innerHTML = ''
	localStorage.clear()
}

// Event listeners
document.addEventListener('DOMContentLoaded', getTasks)
form.addEventListener('submit', addTask)
tasks.addEventListener('click', deleteTask)
clearBtn.addEventListener('click', clearTasks)
filter.addEventListener('keyup', filterTasks)
