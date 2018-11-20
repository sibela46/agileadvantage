import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Services from './Services'
import SingleService from './SingleService'
import Community from './Community'
import Contact from './Contact'
import Team from './Team'
import TeamSingle from './TeamSingle'
import Insights from './Insights'
import SingleArticle from './SingleArticle'

const Router = () => (
  <HashRouter>
  <div>
    <Route path='/' component={Home}/>
    <Route path='/about' component={About}/>
    <Route path='/services' component={Services}/>
    <Route path='/services/:id' component={SingleService}/>
    <Route path='/community' component={Community}/>
    <Route path='/contact' component={Contact}/>
    <Route exact path='/team' component={Team}/>
    <Route path='/team/:id' component={TeamSingle}/>
    <Route exact path='/blog' component={Insights}/>
    <Route path='/blog/:id' component={SingleArticle}/>
  </div>
  </HashRouter>
)

export default Router;
