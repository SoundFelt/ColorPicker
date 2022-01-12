import Palette from './Palette'
import SinglePalette from './SinglePalette'
import Home from './Home'
import NewPaletteForm from './NewPaletteForm'
import seedColors from './seedColors'
import {generatePalette} from './colorhelpers'
import {Route, Switch, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page.js'

function App() {
  const location = useLocation()

  const savedPalettes = JSON.parse(window.localStorage.getItem('allPalettes'))
  const [allPalettes, setPalettes] = useState(savedPalettes || seedColors )

  useEffect(() => {
    window.localStorage.setItem('allPalettes', JSON.stringify(allPalettes))
  }, [allPalettes])

  const findPalette = (id) => {
    return allPalettes.find(palette => palette.id === id)
    }

  const savePalette = (newPalette) => {
    setPalettes([...allPalettes, newPalette])
  }

  const deletePalette = (id) => {
    setPalettes(allPalettes.filter(palette => palette.id !== id))
  }

  return (
    <div className="App">
    <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={500}>

    <Switch location={location}>
    <Route exact path="/palette/new"
    render={routeProps => <Page><NewPaletteForm savePalette={savePalette} palettes={allPalettes} {...routeProps} /></Page>}/>

    <Route exact path="/" 
    render={routeProps => <Page><Home palettes={allPalettes} deletePalette={deletePalette} {...routeProps} /></Page>}/>

    <Route exact path="/palette/:id" 
    render={routeProps => <Page><Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/></Page>}/>

    <Route exact path="/palette/:id/:colorId"
    render={routeProps => <Page><SinglePalette palette={generatePalette(findPalette(routeProps.match.params.id))} {...routeProps} /></Page>}/>
    </Switch>

    </CSSTransition>
    </TransitionGroup>
    </div>
  );
}

export default App;
