import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Label from '@material-ui/icons/Label';
import Typography from '@material-ui/core/Typography';

class Loges extends Component {
  render() {
    const {logs} = this.props;

    return (
      <React.Fragment>
        {!logs.length &&
        <Typography variant="h6" component="p">
          Empty log
        </Typography>}
        <List style={{height: '200px', overflow: 'auto'}}>
          {logs.map(( item ) => (
            <ListItem key={item.id} divider>
              <ListItemIcon>
                <Label/>
              </ListItemIcon>
              <ListItemText
                primary={`${item.time} - ${item.title} - ${item.status}`}
              />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }
}

export default Loges;