import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import TodoPanel from "./Components/TodoPanel";
import Loges from './Components/Loges';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';

class Todo extends Component {
  state = {
    nameTodo: '',
    listTodo: [],
    listTodoInProgress: [],
    listTodoDone: [],
    logTodo: []
  };

  nameTodoChange = ( val ) => {
    this.setState({
      nameTodo: val,
    }, () => {
      console.log(this.state)
    });
  };

  addTodo = () => {
    const {nameTodo, listTodo, logTodo} = this.state;

    let todoObj = {
      id: Math.floor(10000 + Math.random() * 90000),
      title: nameTodo,
      time: moment().format('LTS'),
      status: 'add task'
    };
    if(nameTodo) {
      this.setState({
        listTodo: listTodo.concat(todoObj),
        logTodo: logTodo.concat(todoObj),
        nameTodo: '',
      });
    }
  };

  inProgressTodo = ( todo, id ) => {
    const {listTodo, listTodoInProgress, logTodo} = this.state;
    let newLog = Object.assign({}, todo);
    newLog.id = Math.floor(10000 + Math.random() * 90000);
    newLog.status = 'change status to in progress';
    newLog.time = moment().format('LTS');
    this.setState({
      listTodoInProgress: listTodoInProgress.concat(todo),
      listTodo: listTodo.filter(item => item.id !== id),
      logTodo: logTodo.concat(newLog)
    });
  };

  inTodo = ( todo, id ) => {
    const {listTodo, listTodoInProgress, logTodo} = this.state;
    let newLog = Object.assign({}, todo);
    newLog.id = Math.floor(10000 + Math.random() * 90000);
    newLog.status = 'change status to in to do';
    newLog.time = moment().format('LTS');
    this.setState({
      listTodo: listTodo.concat(todo),
      listTodoInProgress: listTodoInProgress.filter(item => item.id !== id),
      logTodo: logTodo.concat(newLog)
    });
  };

  doneTodoFunc = ( todo, id ) => {
    const {listTodoInProgress, listTodoDone, logTodo} = this.state;
    let newLog = Object.assign({}, todo);
    newLog.id = Math.floor(10000 + Math.random() * 90000);
    newLog.status = 'change status to done';
    newLog.time = moment().format('LTS');
    this.setState({
      listTodoDone: listTodoDone.concat(todo),
      listTodoInProgress: listTodoInProgress.filter(item => item.id !== id),
      logTodo: logTodo.concat(newLog)
    });

  };

  deleteTodo = ( todo, id ) => {
    const {logTodo} = this.state;
    let newLog = Object.assign({}, todo);
    newLog.id = Math.floor(10000 + Math.random() * 90000);
    newLog.status = 'change status to done';
    newLog.time = moment().format('LTS');
    this.setState({
      listTodo: this.state.listTodo.filter(item => item.id !== id),
      listTodoInProgress: this.state.listTodoInProgress.filter(item => item.id !== id),
      listTodoDone: this.state.listTodoDone.filter(item => item.id !== id),
      logTodo: logTodo.concat(newLog)
    });
  };

  clearTodo = todoList => {
    const {logTodo} = this.state;
    let newLog = [{
      id: Math.floor(10000 + Math.random() * 90000),
      title: 'Clear list',
      status: todoList,
      time: moment().format('LTS'),
    }];
    if (todoList === 'logTodo') {
      this.setState({
        [todoList]: [],
      });
    } else {
      this.setState({
        [todoList]: [],
        logTodo: logTodo.concat(newLog)
      });
    }
  };


  render() {
    const {listTodo, listTodoInProgress, listTodoDone, logTodo, nameTodo} = this.state;
    return (
      <div style={{padding: '0 20px'}}>
        <Typography
          component="h1"
          variant="display4"
          align={'center'}
          gutterBottom
        >
          Todo
        </Typography>
        <Grid container justify="flex-start" spacing={24}
        >
          <Grid item xs={4}>
            <TodoPanel
              valChange={this.nameTodoChange}
              val={nameTodo}
              addTodo={this.addTodo}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="space-between">
              <Typography variant="h4" component="h4" gutterBottom>Log</Typography>
              {logTodo.length ?
                <Button onClick={() => this.clearTodo('logTodo')}>
                  Clear log
                  <Close fontSize={'small'}/>
                </Button> :
                null
              }
            </Grid>
            <Loges
              logs={logTodo}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={24} wrap="nowrap">
          <Grid item xs={8}>
            <Grid
              container
              justify="space-between"
              spacing={0}
            >
              <Typography variant="h4" component="h4">List to do</Typography>
              {listTodo.length ?
                <Button onClick={() => this.clearTodo('listTodo')}>
                  Clear list
                  <Close fontSize={'small'}/>
                </Button> :
                null
              }
            </Grid>
            <TodoList
              listTodo={listTodo}
              deleteTodo={this.deleteTodo}
              inProgressTodo={true}
              inProgressTodoFunc={this.inProgressTodo}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="space-between" spacing={0}>
              <Typography variant="h4" component="h4">List in progress</Typography>
              {listTodoInProgress.length ?
                <Button onClick={() => this.clearTodo('listTodoInProgress')}>
                  Clear list
                  <Close fontSize={'small'}/>
                </Button> :
                null
              }
            </Grid>
            <TodoList
              listTodo={listTodoInProgress}
              inTodo={this.inTodo}
              deleteTodo={this.deleteTodo}
              doneTodo={true}
              doneTodoFunc={this.doneTodoFunc}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="space-between" spacing={0}>
              <Typography variant="h4" component="h4">
                List done
              </Typography>
              {listTodoDone.length ?
                <Button onClick={() => this.clearTodo('listTodoDone')}>
                  Clear list
                  <Close fontSize={'small'}/>
                </Button> :
                null
              }
            </Grid>
            <TodoList
              listTodo={listTodoDone}
              deleteTodo={this.deleteTodo}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Todo;