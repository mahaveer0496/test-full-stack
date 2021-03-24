import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import ViewArtists from './ViewArtists'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom'
import CreateArtist from './CreateArtist'

const queryClient = new QueryClient()

const Link = (props) => <RouterLink className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1" {...props}/>
ReactDOM.render(
  <React.StrictMode>
    <div className='container mx-auto'>
      <QueryClientProvider client={queryClient}>        
        <Router>
          <div className="py-4">
          <Link to='/'>View Artists</Link> <Link to='/new'>Create Artist</Link>
          </div>
          
          <Switch>
            <Route exact path='/'>
              <ViewArtists />
            </Route>
            <Route path='/new'>
              <CreateArtist />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
