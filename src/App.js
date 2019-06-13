/**
 * Principles of Programming Graphical User Interfaces 2018-2019, TIEVA31
 * Exercise 6.3
 * laineme
 */

import React, {Component} from 'react'
// npm install @material-ui/core
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(),
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
    color: 'grey',
    letterSpacing: 2,
  },
  paper: {
    padding: theme.spacing(),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 100,
    height: 100,
    margin: theme.spacing(),
    lineHeight: theme.spacing()-2,
  },
  gridHeader: {
    padding: theme.spacing(),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 365,
    height: 50,
    margin: theme.spacing(),
    lineHeight: theme.spacing()-5,
  },
  numberAvailable: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing()-5,
    //lineHeight: theme.spacing()-14,
  },
  infoButtons: {
    margin: theme.spacing(),
  }
})

class MagicSquare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null, // selected box
      grid: [], // numbers in the grid
      boxColors: Array(9).fill('white'),
      numberAvailable: Array(9).fill(true),
      magicSquare: false,
      showInfo: true,
      showResult: false,
    }
  }
  /**
   * User clicks a box
   */
  updateBox = (id) => {
    let { grid, numberAvailable } = this.state
    let number = grid[id]
    // when user clicks a box and if box is already
    // selected and has number in it, remove a number
    if (id === this.state.id && number) {
      numberAvailable[number-1] = true
      grid[id] = undefined

      this.setState({
        magicSquare: false,
      })
    }
    let boxColors = this.state.boxColors
    // selected box will have a different color, other
    // boxes are white
    boxColors = Array(9).fill('white')
    boxColors[id] = 'lightGrey'
    
    this.setState({
      id: id,
      boxColors: boxColors,
      grid: grid,
      numberAvailable: numberAvailable,
      showResult: false,
    })
  }

  /**
   * User clicks a number
   */
  pickNumber = (number) => {
    let id = this.state.id
    let grid = this.state.grid
    let numberAvailable = this.state.numberAvailable

    // if none of the boxes is selected
    if (this.state.id === null) {
      return
    }
    // if selected box already has a number
    else if (grid[id]) {
      numberAvailable[grid[id]-1] = true
    }
    numberAvailable[number-1] = false
    grid[id] = number
    this.setState({
      grid: grid,
    })
    // if all boxes have a number, check magic square
    if (this.state.grid.length === 9 && !this.state.grid.includes(undefined))
      this.checkMagicSquare()
  }

  checkMagicSquare = () => {
    const box1 = this.state.grid[0]
    const box2 = this.state.grid[1]
    const box3 = this.state.grid[2]
    const box4 = this.state.grid[3]
    const box5 = this.state.grid[4]
    const box6 = this.state.grid[5]
    const box7 = this.state.grid[6]
    const box8 = this.state.grid[7]
    const box9 = this.state.grid[8]

    const sum1 = box1 + box2 + box3
    const sum2 = box4 + box5 + box6
    const sum3 = box7 + box8 + box9
    const sum4 = box1 + box4 + box7
    const sum5 = box2 + box5 + box8
    const sum6 = box3 + box6 + box9
    const sum7 = box1 + box5 + box9
    const sum8 = box3 + box5 + box7

    const sums = [sum1, sum2, sum3, sum4, sum5, sum6, sum7, sum8]

    let MagicSquare = true

    for (let sum of sums) {
      if (sum !== sum1) {
        MagicSquare = false
      }
    }

    if (MagicSquare) {
      let boxColors = this.state.boxColors
      boxColors = Array(9).fill('#fab1a0')
      this.setState({
        magicSquare: true,
        boxColors: boxColors,
        showResult: true
      })
    } else {
      this.setState({
        showResult: true
      })
    }
  }

  showInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
      showResult: false,
    })
  }

  /*
  check = () => {
    this.setState({
      showInfo: false,
      showResult: !this.state.showResult,
    })
  }*/

  render() {
    const { classes } = this.props
    const { showInfo, showResult, magicSquare } = this.state

    return (  
      <div>

        <div className={classes.header}>
          <Toolbar className={classes.toolbarMain}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Exercise 6.3: magic square
            </Typography>
          </Toolbar>
        </div>
        
        <Grid container className={classes.root}>

          {/*<Grid container className={classes.root}>

            <Grid item xs={12}>

              <Grid container justify="center">
                <Grid key='infoButton' item className={classes.infoButtons}>
                  <button onClick={this.showInfo}>info</button>
                </Grid>
                <Grid key='check' item className={classes.infoButtons}>
                  <button onClick={this.check}>Check magic square</button>
                </Grid>
              </Grid>

            </Grid>

          </Grid>*/}

          <Grid container className={classes.root}>

            <Grid item xs={12} style={{display:(showResult ? '' : 'none')}}>
              <Grid container justify="center" style={{display:(magicSquare ? '' : 'none')}}>
                <Grid key='info1' item>
                  <div>Magic square!</div>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{display:(magicSquare ? 'none' : '')}}>
                <Grid key='info2' item>
                  <div>Try again</div>
                </Grid>
              </Grid>
            </Grid>
          
          </Grid>

          <Grid container className={classes.root}>

            <Grid item xs={12}>
              
              <Grid container justify="center">
                {[0,1,2].map(value => (
                  <Grid key={value} item>
                    <Paper 
                      className={classes.paper} 
                      onClick={() => {this.updateBox(value)}}
                      style={{background: this.state.boxColors[value]}}
                    >
                      {this.state.grid[value]}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Grid container justify="center">
                {[3,4,5].map(value => (
                  <Grid key={value} item>
                    <Paper 
                      className={classes.paper} 
                      onClick={() => {this.updateBox(value)}}
                      style={{background: this.state.boxColors[value]}}
                    >
                      {this.state.grid[value]}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Grid container justify="center">
                {[6,7,8].map(value => (
                  <Grid key={value} item>
                    <Paper 
                      className={classes.paper} 
                      onClick={() => {this.updateBox(value)}}
                      style={{background: this.state.boxColors[value]}}
                    >
                      {this.state.grid[value]}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

            </Grid>
          </Grid>

          <Grid container className={classes.root}>
            <Grid item xs={12}>

              <Grid container justify="center">
                {[1, 2, 3].map(value => (
                  <Paper key={value} className={classes.numberAvailable}>
                    <Grid item>
                      <Button
                        onClick={() => {this.pickNumber(value)}}
                        disabled={!this.state.numberAvailable[value-1]}
                      >{value}
                      </Button>
                    </Grid>
                  </Paper>
                ))}
              </Grid>

              <Grid container justify="center">
                {[4, 5, 6].map(value => (
                  <Paper key={value} className={classes.numberAvailable}>
                    <Grid item>
                      <Button
                        onClick={() => {this.pickNumber(value)}}
                        disabled={!this.state.numberAvailable[value-1]}
                      >{value}
                      </Button>
                    </Grid>
                  </Paper>
                ))}
              </Grid>

              <Grid container justify="center">
                {[7, 8, 9].map(value => (
                  <Paper key={value} className={classes.numberAvailable}>
                    <Grid item>
                      <Button
                        onClick={() => {this.pickNumber(value)}}
                        disabled={!this.state.numberAvailable[value-1]}
                      >{value}
                      </Button>
                    </Grid>
                  </Paper>
                ))}
              </Grid>

            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.root}>
          <Grid item xs={12} style={{display:(showInfo ? '' : 'none')}}>
          <Grid container justify="center">
              <Grid key='info1' item>
                <div><br /></div>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid key='info1' item>
                <div>Select a box and pick a number.</div>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid key='info2' item>
                <div>Click selected box again to deselect a number.</div>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid key='info3' item>
                <div>Fill all boxes with numbers.</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
 
MagicSquare.propTypes = {
  classes: PropTypes.object.isRequired,
}
 
export default withStyles(styles)(MagicSquare)