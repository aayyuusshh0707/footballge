import './App.css'
import Approuter from './routes/Approuter'
import { PinnedLeaguesProvider } from './hook/PinnedLeaguesContext'
function App() {

  return (
    <>

      <PinnedLeaguesProvider>
        <Approuter />
      </PinnedLeaguesProvider>

    </>


  )
}

export default App
