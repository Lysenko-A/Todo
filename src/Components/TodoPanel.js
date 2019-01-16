import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class TodoPanel extends Component {
  handleChange = e => {
    const {valChange} = this.props;
    const val = e.target.value;
    valChange(val);
  };

  render() {
    const {val, addTodo} = this.props;

    return (
      <FormControl fullWidth>
        <TextField
          label="Todo"
          name="addTodo"
          value={val}
          onChange={this.handleChange}
          variant="outlined"
          style={{marginBottom: '1rem'}}
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => addTodo()}
        >
          Add todo
        </Button>
      </FormControl>
    )
  }
}

export default TodoPanel;