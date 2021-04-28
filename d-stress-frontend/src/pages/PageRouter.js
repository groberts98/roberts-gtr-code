// handles the routing between pages of the app
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group' //add short fade between page changes

import Past from './past/Past'
import Home from './home/Home'
import Future from './future/Future'
import Calendar from './calendar/Calendar'
import Insights from './insights/Insights'
import AddStressor from './add-stressor/AddStressor'

const PageRouter = () => (
  <Route render={({location}) => (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames='fade'
      >
        <Switch location={location}>
          <Route exact path='/' component={Home}/>
          <Route path='/future' component={Future}/>
          <Route path='/past' component={Past}/>
          <Route path='/add-stressor' component={AddStressor}/>
          <Route path='/insights' component={Insights}/> 
          <Route path='/Calendar' component={Calendar}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )} />
)

export default PageRouter
