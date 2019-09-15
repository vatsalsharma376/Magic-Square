/**
 * Magic Square Game
 * laineme
 */

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import Header from './components/Header'
import Result from './components/Result'
import BoxArea from './components/BoxArea'
import NumberArea from './components/NumberArea'
import Nav from './components/Nav'
import Info from './components/Info'

class MagicSquare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null, // selected box
      grid: [], // numbers in the grid
      boxColors: Array(9).fill('white'), // colors in the grid
      numberAvailable: Array(9).fill(true),
      magicSquare: false,
      showInfo: false, // show info tab
      showGame: true, // show game tab
      activeTab: "game",
    }
  }

  /** Changes active tab in the navigation */
  changeTab = (event, value) => {
    if (value === 'reset' || value === 'solution')
      return
		this.setState({
			activeTab: value,
		})
	}

  /** User clicks a box */
  updateBox = (id) => {
    let { grid, numberAvailable } = this.state
    let number = grid[id]
    // when user clicks a box and if box is already
    // selected and has number in it, remove a number
    if (id === this.state.id && number) {
      numberAvailable[number - 1] = true
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

  /** User clicks a number */
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
      numberAvailable[grid[id] - 1] = true
    }
    numberAvailable[number - 1] = false
    grid[id] = number
    this.setState({
      grid: grid,
    })
    // if all boxes have a number, check magic square
    if (this.state.grid.length === 9 && !this.state.grid.includes(undefined))
      this.checkMagicSquare()
  }

  /* Resets the game */
  reset = () => {
    this.setState({
      grid: [],
      boxColors: Array(9).fill('white'),
      numberAvailable: Array(9).fill(true),
      showResult: false,
    })
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

  /* for navigation */
  showGame = () => {
    this.setState({
      showGame: !this.state.showGame,
      showInfo: !this.state.showInfo,
    })
  }

  showSolution = () => {
    this.setState({
      grid: [2, 7, 6, 9, 5, 1, 4, 3, 8],
      boxColors: Array(9).fill('#fab1a0'),
      numberAvailable: Array(9).fill(false),
      magicSquare: true,
      showResult: true,
    })
  }

  render() {

    if (this.state.activeTab === 'game') {

      return (
        <div style={styles.root}>

          <Header title="Magic square" />

          <Nav 
            activeTab={this.state.activeTab} 
            onChangeTab={this.changeTab}
            onShowGame={this.showGame}
            onReset={this.reset}
            onShowSolution={this.showSolution}
          />

          <Grid container style={styles.container}>

            <Result 
              showResult={this.state.showResult} 
              magicSquare={this.state.magicSquare} 
            />

            <BoxArea 
              boxColors={this.state.boxColors} 
              updateBox={this.updateBox} 
              grid={this.state.grid} 
            />

            <NumberArea
              numberAvailable={this.state.numberAvailable}
              pickNumber={this.pickNumber}
            />

          </Grid>

        </div>
      )
    }

    else {
      return (
        <div>
          <Header title="Magic square" />
          <Nav 
            activeTab={this.state.activeTab} 
            onChangeTab={this.changeTab}
            onShowGame={this.showGame}
            onReset={this.reset}
            onShowSolution={this.showSolution}
          />
          <Info showInfo={this.state.showInfo} />
        </div>
      )
    }
  }
}

const styles = {
  root: {
    maxWidth: 900,
    margin: 'auto',
  },
  container: {
    flexGrow: 1,
    marginTop: 10,
  },
}

export default MagicSquare