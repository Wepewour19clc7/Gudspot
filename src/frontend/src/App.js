import HeaderApp from './components/HeaderApp'
import LayoutApp from './components/Layout'
import Main from './pages/Main'

export default function App () {
  return (
    <LayoutApp>
      <HeaderApp />
      <Main/>
    </LayoutApp>
  )
}