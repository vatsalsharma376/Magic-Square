import React from 'react'
import Grid from '@material-ui/core/Grid'

const Result = ({magicSquare, showResult}) => {
  return (
    <Grid container style={styles.root}>

      <Grid item xs={12} style={{ display: (showResult ? '' : 'none') }}>
        <Grid container justify="center" style={{ display: (magicSquare ? '' : 'none') }}>
          <Grid key='info1' item>
            <div>Magic square!</div>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ display: (magicSquare ? 'none' : '') }}>
          <Grid key='info2' item>
            <div>Try again</div>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 1,
  },
}

export default Result