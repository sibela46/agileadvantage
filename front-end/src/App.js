import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './app/Header'
import Footer from './app/Footer'
import Home from './app/Home'
import About from './app/About'
import Services from './app/Services'
import SingleService from './app/SingleService'
import Community from './app/Community'
import Contact from './app/Contact'
import Team from './app/Team'
import TeamSingle from './app/TeamSingle'
import Insights from './app/Insights'
import SingleArticle from './app/SingleArticle'
import Terms from './app/Terms'

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div className="body-hero">
            <Route component={Header}/>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route exact path='/services' component={Services}/>
            <Route path='/services/:id' component={SingleService}/>
            <Route exact path='/team' component={Team}/>
            <Route path='/team/:id' component={TeamSingle}/>
            <Route path='/community' component={Community}/>
            <Route path='/contact' component={Contact}/>
            <Route exact path='/insights' component={Insights}/>
            <Route path='/insights/:id' component={SingleArticle}/>
            <Route exact path='/terms-and-conditions' component={Terms}/>
            <Route component={Footer}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App
