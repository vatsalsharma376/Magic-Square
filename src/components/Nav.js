import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Nav = ({ activeTab, onChangeTab, onShowGame, onReset, onShowSolution }) => {
  return (
    <Paper style={styles.paper}>
      <Tabs
        value={activeTab}
        onChange={onChangeTab}
        centered
      >
        <Tab label="Info" value="info" onClick={onShowGame} />
        <Tab label="Game" value="game" onClick={onShowGame} />
        <Tab 
          label="Reset" value="reset" 
          onClick={onReset} 
          disabled={activeTab === 'info' ? true : false} 
        />
        <Tab 
          label="Show solution" value="solution" 
          onClick={onShowSolution} 
          disabled={activeTab === 'info' ? true : false} 
        />
      </Tabs>
    </Paper>
  )
}

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    marginBottom: '20px',
  },
  infoButtons: {
    margin: 10,
  }
}

export default Nav