import './scss/App.scss'
import Logo from './assets/svg/logo.svg'

function App() {
  return (
    <div className='App'>
      <div className='App__container'>
        <img className='logo' src={Logo} alt='' />
      </div>
    </div>
  )
}

export default App
