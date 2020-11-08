import React from 'react';
import './styles.css';
import Dice from '../Dice/index.js';
import Dicelog from '../Dicelog/index.js';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

// export default function TemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     right: false
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//         <React.Fragment key={'right'}>
//           <Button onClick={toggleDrawer('right', true)}>{'right'}</Button>
//           <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
//             {list('right')}
//           </Drawer>
//         </React.Fragment>
//     </div>
//   );
// }

class Diceroller extends React.Component {
  
  state = {
    d20: 0,
    d12: 0,
    d10: 0,
    d8: 0,
    d6: 0,
    d4: 0,
    clickedDice: false,
    rolled : false,
    rollResult : [],
    anchor: false
  }

  handleDicePress = (event) => {
    const diceType = event.target.className;
    const previouslyClicked = this.state.clickedDice;

    if (!previouslyClicked) {
      this.setState({
        [diceType] : 1,
        clickedDice: true,
        rolled: false,
        rollResult : []
      });
    } else if (previouslyClicked && this.state[diceType] !== 0) {
      const newValue = this.state[diceType] + 1;
      this.setState({
        [diceType] : newValue
      });
    } else {
      this.setState({
        d20: 0,
        d12: 0,
        d10: 0,
        d8: 0,
        d6: 0,
        d4: 0
      });
      this.setState({
        [diceType] : 1
      });
    }
  }

  rolling = () => {
    const die = ["d20", "d12", "d10", "d8", "d6", "d4"]
    var dice
    for (dice of die) {
      if (this.state[dice] !== 0) {
        return { numberOfRolls : this.state[dice], diceToRoll : dice }
      }
    }
    return { numberOfRolls : undefined, diceToRoll: undefined }
  }

  rollResult = () => {
    const { numberOfRolls, diceToRoll } = this.rolling();
    if (numberOfRolls === undefined) {
      return []
    } else {
      var results = []
      var i = 0;
      while (i < numberOfRolls) {
        results.push(Math.floor(Math.random() * parseInt(diceToRoll.slice(1))) + 1)
        i = i + 1;
      }
      return results
    }
  }

  rollResultText = () => {
    var result;
    var output = '';
    if (this.state.rollResult === []) {
      return "Please select a dice to roll"
    } else {
      this.state.rollResult.forEach( result => output = output.concat('You rolled a ' + result + '!\n'))
      return output
    }
  }

  handleRoll = () => {
    const rollResult = this.rollResult();
    this.setState({
      rolled: true,
      d20: 0,
      d12: 0,
      d10: 0,
      d8: 0,
      d6: 0,
      d4: 0,
      clickedDice: false,
      rollResult : rollResult
    });
  }

  outputText = () => {
    if(!this.state.rolled) {
      const { numberOfRolls, diceToRoll } = this.rolling();
      if (numberOfRolls !== undefined){
        return `Rolling ${numberOfRolls} ${diceToRoll} dice.`
      } else {
        return "Please select a dice to roll"
      }
    } else {
      return this.rollResultText();
    }
  }

  toggleDrawer = (bool) => {
    this.setState({
      anchor: bool
    })
  }

  render() {
    return (
      <div className="test1">
      <Button className="DicerollerButton" variant="contained" onClick={() => this.toggleDrawer(true)}>Open dice roller</Button>
      <Drawer
        anchor={'right'}
        open={this.state.anchor}
        onClose={() => this.toggleDrawer(false)}
        className="Drawer"
        PaperProps={{
            style: {
                top: "64px",
                backgroundColor: "var(--backgroundColour)"
            }
        }}
      >
        <div className="Diceroller">
          <div className="container">
            <Dice
              gridClass="d20"
              onClick={this.handleDicePress}
            />
            <Dice
              gridClass="d12"
              onClick={this.handleDicePress}
            />
            <Dice
              gridClass="d10"
              onClick={this.handleDicePress}
            />
            <Dice
              gridClass="d8"
              onClick={this.handleDicePress}
            />
            <Dice
              gridClass="d6"
              onClick={this.handleDicePress}
            />
            <Dice
              gridClass="d4"
              onClick={this.handleDicePress}
            />
            <Button
              onClick={this.handleRoll}
              className="roll"
            >
              Roll
            </Button>
          </div>
        </div>
        <Dicelog
            outputText={this.outputText()}
          />
      </Drawer>
      </div>
    );
  }
}

export default Diceroller;