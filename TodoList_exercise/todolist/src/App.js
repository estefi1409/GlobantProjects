import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <div>
            <Navigation />
            <Route exact path="/" component={Home} />
            <Route exact path="/todolist" component={TodolistSection}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const Navigation = (props) => {
  return (
    <nav>
      <ul>
        <li><Link to={`/`}> HOME </Link></li>
        <li><Link to={`/todolist`}> TODO-LIST </Link></li>       
      </ul>
    </nav>
  );
}

const Home = (props) => {
  return (
    <div className="Home">
    </div>
  );
}

class TodolistSection extends Component {
  inputElement = React.createRef()
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem:   {
        text: '',
        key: '',
      },
    }
  }
  deleteTask = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }
  
  addTask = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }
  render() {
    return (
      <div className="AppList">
        <TodoList
          addTask={this.addTask}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems entries={this.state.items} deleteTask={this.deleteTask} />
      </div>
    )
  }
}

class TodoItems extends Component {
  createTasks = item => {
    return (
      <div className="taskItems">
        <li key={item.key} >{item.text}</li>
        <button type="submit" onClick={() => this.props.deleteTask(item.key)}> <i class="fa fa-trash"></i> </button>
      </div>
    )
  }
  render() {
    const todoEntries = this.props.entries
    const listItems = todoEntries.map(this.createTasks)

    return <ul className="theList">{listItems}</ul>
  }
}

class TodoList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus()
  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.props.addTask}>
            <input
              placeholder="Add your Task here..."
              ref={this.props.inputElement}
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />
            <button type="submit"> <i class="fa fa-plus-circle"></i> </button>
          </form>
        </div>
      </div>
    )
  }
}

export default App

