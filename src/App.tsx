
import './App.css'
import CurrencyConverte from './components/CurrencyConverte/CurrencyConverte.module'
import { StateContextProvider } from './context/states'

function App() {

  return (
    <StateContextProvider>
      <CurrencyConverte />
    </StateContextProvider>
  )
}

export default App
