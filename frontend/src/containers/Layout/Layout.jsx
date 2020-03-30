import React from 'react'
import Grid from '@material-ui/core/Grid'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import useDataApi from '../../utils/hooks/useDataApi'
import Menu from '../Menu/Menu'
import Spinner from '../../components/Spinner/Spinner'
import Category from '../Category/Category'
import Error from '../../components/Error/Error'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import useStyles from './styles'

const Layout = () => {
  const classes = useStyles()

  const { rawData, isLoading, isError } = useDataApi({ url: '/categories?filter={"limit": 100}', method: 'GET' })
  const categories = rawData && !isError ? rawData.results : []

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Grid container className={classes.app}>
          <Grid container direction="row">
            <Grid className={classes.menu}>{isLoading ? <Spinner /> : <Menu categories={categories} />}</Grid>
            <Grid className={classes.mainSection}>
              <Switch>
                <Route exact path="/">
                  Main page
                </Route>
                <Route path="/category">
                  <Category categories={categories} />
                </Route>
                <Route>
                  <Error />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default Layout
