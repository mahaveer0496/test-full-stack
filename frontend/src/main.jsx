import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import ViewArtists from './ViewArtists'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom'
import CreateArtist from './CreateArtist'

const queryClient = new QueryClient()

console.log('this is from CD!')

const Link = (props) => (
  <RouterLink
    className='active:bg-pink-600 hover:shadow-md focus:outline-none px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-blue-500 rounded shadow outline-none'
    {...props}
  />
)
ReactDOM.render(
  <React.StrictMode>
    <div className='container mx-auto'>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='py-4'>
            <Link to='/'>View Artists</Link>{' '}
            <Link to='/new'>Create Artist</Link>
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
