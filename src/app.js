const React = require('react')

const {map} = require('fun-fp')
const TodoItem = require('./todo-item')

const App = React.createClass({
    getInitialState() {
        return {
            editing: null,
            newTodo: {
                title: '',
                completed: false
            },
            todos: [
                {
                    id: 1,
                    title: 'Pick Final Project',
                    completed: false
                }, {
                    id: 2,
                    title: 'Plan Final Project',
                    completed: false
                }
            ]
        }
    },
    handleChange(e) {
        this.setState({
            newTodo: {
                title: e.target.value
            }
        })
    },
    handleSubmit(e) {
        e.preventDefault()
        const newTodo = {
            ...this.state.newTodo
        }
        newTodo.id = new Date().toISOString()
        const todos = [
            ...this.state.todos,
            newTodo
        ]
        this.setState({
            todos,
            newTodo: {
                title: '',
                completed: false
            }
        })
    },
    handleToggle(todo) {
        return (e) => {
            const todos = map(td => {
                if (td.id === todo.id) {
                    td.completed = !td.completed
                }
                return td
            }, [...this.state.todos])
            this.setState({todos})
        }
    },
    editTodo(todo) {
        return (e) => {
            this.setState({editing: todo.id})
        }
    },
    saveTodo(todo) {
        return (title) => {
            const todos = this.state.todos.map(item => {
                if (item.id === todo.id) {
                    item.title = title
                }
                return item
            })
            this.setState({editing: null, todos})
        }
    },
    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input className="new-todo" type="text" placeholder="What needs to be done?" autoFocus onChange={this.handleChange} value={this.state.newTodo.title}/>
                    </form>
                </header>
                <section id="main">
                    <input type="checkbox" className="toggle-all"/>
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {map(todo => <TodoItem key={todo.id} todo={todo} onEdit={this.editTodo(todo)} editing={this.state.editing} onSave={this.saveTodo(todo)} onToggle={this.handleToggle(todo)}/>, this.state.todos)}
                    </ul>
                </section>
                <footer className="footer">
                    <span className="todo-count">
                        <strong>0</strong>
                        item(s) left</span>
                    <ul className="filters">
                        <li>
                            <a href="/">All</a>
                        </li>
                        <li>
                            <a href="/active">Active</a>
                        </li>
                        <li>
                            <a href="/completed">Completed</a>
                        </li>
                    </ul>
                    <button className="clear-completed">Clear completed</button>
                </footer>
            </section>
        )
    }
})

module.exports = App
