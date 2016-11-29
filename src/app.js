const React = require('react')
const {BrowserRouter, Link} = require('react-router')
const {map, filter} = require('fun-fp')
const TodoItem = require('./todo-item')

const App = React.createClass({
    getInitialState() {
        return {
            viewState: 'all',
            editing: null,
            newTodo: {
                title: '',
                completed: false
            },
            todos: []
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
    removeTodo(todo) {
        return (e) => {
            const todos = filter(item => {
                if (item.id !== todo.id) {
                    return true
                }
            }, this.state.todos)
            this.setState({todos})
        }
    },
    setViewState(view) {
        return (e) => {
            e.preventDefault()
            this.setState({viewState: view})
        }
    },
    removeTodos(e) {
        const todos = filter(todo => !todo.completed, this.state.todos)
        this.setState({todos})
    },
    render() {
        return (
            <BrowserRouter>
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
                            {map(todo => <TodoItem key={todo.id} todo={todo} onEdit={this.editTodo(todo)} editing={this.state.editing} onSave={this.saveTodo(todo)} onDestroy={this.removeTodo(todo)} onToggle={this.handleToggle(todo)}/>, this.state.todos.filter(todo => {
                                if (this.state.viewState === 'active') {
                                    return !todo.completed
                                }
                                if (this.state.viewState === 'completed') {
                                    return todo.completed
                                }
                                if (this.state.viewState === 'all') {
                                    return true
                                }
                            }))}
                        </ul>
                    </section>
                    <footer className="footer">
                        <span className="todo-count">
                            <strong>{this.state.todos.reduce((acc, todo) => !todo.completed
                                    ? ++acc
                                    : acc, 0)}
                            </strong>{' '}
                            item(s) left</span>
                        <ul className="filters">
                            <li>
                                <Link to="/" onClick={this.setViewState('all')}>All</Link>
                            </li>
                            <li>
                                <Link to="/active" onClick={this.setViewState('active')}>Active</Link>
                            </li>
                            <li>
                                <Link to="/completed" onClick={this.setViewState('completed')}>Completed</Link>
                            </li>
                        </ul>
                        <button className="clear-completed" onClick={this.removeTodos}>Clear completed</button>
                    </footer>
                </section>
            </BrowserRouter>
        )
    }
})

module.exports = App
