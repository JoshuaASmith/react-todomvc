const React = require('react')

const TodoItem = React.createClass({
    render() {
        return (
            <li className={this.props.todo.completed
                ? 'completed'
                : ''}>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={this.props.todo.completed} onChange={this.props.onToggle}/>
                    <label htmlFor="">{this.props.todo.title}</label>
                    <button className="destroy"></button>
                </div>
                <input type="text" className="edit"/>
            </li>
        )
    }
})

module.exports = TodoItem
