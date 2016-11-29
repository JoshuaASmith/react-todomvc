const React = require('react')

const TodoItem = React.createClass({
    getInitialState() {
        return {editText: this.props.todo.title}
    },
    handleEdit() {
        this.props.onEdit()
    },
    handleDestroy() {
        this.props.onDestroy()
    },
    handleChange(e) {
        this.setState({editText: e.target.value})
    },
    handleSubmit() {
        this.props.onSave(this.state.editText)
    },
    render() {
        const itemState = e => {
            if (this.props.todo.completed) {
                return 'completed'
            }
            if (this.props.editing === this.props.todo.id) {
                return 'editing'
            }
            return ''
        }
        return (
            <li className={itemState()}>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={this.props.todo.completed} onChange={this.props.onToggle}/>
                    <label onDoubleClick={this.handleEdit} htmlFor="">{this.props.todo.title}</label>
                    <button onClick={this.handleDestroy} className="destroy"></button>
                </div>
                <input onChange={this.handleChange} onBlur={this.handleSubmit} value={this.state.editText} type="text" className="edit"/>
            </li>
        )
    }
})

module.exports = TodoItem
