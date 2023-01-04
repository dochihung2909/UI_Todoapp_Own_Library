import storage from './util/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null,
}

const actions = {
    add({todos}, title) { 
        todos.push({title,completed: false})
        storage.set(todos)
        setTimeout(() => {
            document.querySelector('.new-todo').focus()
        },100) 
    },
    del({todos}, index) {
        todos.splice(index,1) 
        storage.set(todos) 
    },
    toggle({todos}, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)  
    },
    toggleAll({todos}, checked) { 
        todos.map(todo => {
            if (checked) { 
                !todo.completed && (todo.completed = !todo.completed) 
            } else {
                todo.completed && (todo.completed = !todo.completed) 
            }

        })
        storage.set(todos)   
    },
    switchFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    startEdit(state, index) {
        state.editIndex = index 
        setTimeout(() => {
            let input = document.querySelector(`input[data-id="${index}"]`)
            let end = input.value.length
            input.setSelectionRange(end, end)  
            input.focus() 
        },0)
    },
    endEdit(state, updateTitle) { 
        if (state.editIndex !== null) { 
            if(updateTitle == '') {
                state.todos.splice(state.editIndex,1)
            } else {
                state.todos[state.editIndex].title = updateTitle  
            }
            state.editIndex = null
            storage.set(state.todos)    
        }   
    },
    cancelEdit(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] &&  actions[action](state,...args) 
    return state
}