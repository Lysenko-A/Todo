import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeft from '@material-ui/icons/RotateLeft';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


class TodoList extends Component {
  render() {

    const {
      listTodo,
      deleteTodo,
      inProgressTodo,
      inProgressTodoFunc,
      inTodo,
      doneTodo,
      doneTodoFunc
    } = this.props;

    if (listTodo.length > 0) {
      return (
        <List>
          {listTodo.map(( item ) => (
            <ListItem key={item.id} divider>
              <ListItemText primary={item.title}/>
              <ListItemSecondaryAction>
                {inProgressTodo ?
                  <Tooltip title="In progress" placement="top">
                    <IconButton
                      aria-label="In progress"
                      onClick={() => inProgressTodoFunc(item, item.id)}
                    >
                      <PlayArrow/>
                    </IconButton>
                  </Tooltip>
                  :
                  (doneTodo ?
                    <React.Fragment>
                      <Tooltip title="In to do" placement="top">
                        <IconButton
                          aria-label="In to do"
                          onClick={() => inTodo(item, item.id)}
                        >
                          <RotateLeft/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Done" placement="top">
                        <IconButton
                          aria-label="Done"
                          onClick={() => doneTodoFunc(item, item.id)}
                        >
                          <PlaylistAddCheck/>
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                    : false)}
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => deleteTodo(item, item.id)}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )
    } else {
      return (
        <Typography style={{marginTop: '1rem'}} component="p">
          {inProgressTodo ? 'Nothing to do' : 'Nothing in progress'}
        </Typography>
      )
    }
  }
}

export default TodoList;