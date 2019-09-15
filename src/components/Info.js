import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const Info = ({ showInfo }) => {

  const [showHint, setShowHint] = useState(false)

  return (
    <Grid container style={styles.root}>
      <Paper style={styles.paper}>
        <Grid container justify="center" style={{...styles.header, ...styles.container1}}>
          Let's play magic square!
        </Grid>
        <Grid container justify="center" style={styles.container2}>
          A magic square is an arrangement of numbers in a 3 x 3 square 
          in such a way that the sum of each row, column, and diagonal 
          is one constant number, the so-called "magic constant".
        </Grid>
        <Grid container justify="center" style={{...styles.header, ...styles.container1}}>
          How to play
        </Grid>
        <Grid container justify="center" style={styles.container1}>
          Select a box and pick a number.
        </Grid>
        <Grid container justify="center" style={styles.container1}>
          Click selected box again to deselect a number.
        </Grid>
        <Grid container justify="center" style={styles.container2}>
          Fill all boxes with numbers and you will see if the square
          is a magic square.
        </Grid>
        <Grid container justify="center" style={styles.container2}>
          <button onClick={() => setShowHint(!showHint)}>{showHint ? 'Hide hint' : 'Show hint'}</button>
        </Grid>
        <Grid container justify="center" style={{display: showHint ? '' : 'none', ...styles.container1, }}>
          The magic constant for a 3x3 square is 15.
        </Grid>
        <Grid container justify="center" style={{display: showHint ? '' : 'none', ...styles.container2, }}>
          All rows, columns, and diagonals must add up to this number.
        </Grid>
        <Grid container justify="center" style={{...styles.header, ...styles.container1}}>
          source
        </Grid>
        <Grid container justify="center" style={styles.container1}>
          <a 
            href='https://www.wikihow.com/Solve-a-Magic-Square' 
            target='_blank'
            rel="noopener noreferrer"
            style={styles.link}
          > 
            https://www.wikihow.com/Solve-a-Magic-Square
          </a>
        </Grid>
      </Paper>
    </Grid>

  )
}

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 10,
    textAlign: 'center',
    width: '50%',
    margin: 'auto',
  },
  paper: {
    padding: 10,
  },
  header: {
    color: '#f50057',
  },
  container1: {
    marginBottom: 10,
  },
  container2: {
    marginBottom: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  }
}

export default Info