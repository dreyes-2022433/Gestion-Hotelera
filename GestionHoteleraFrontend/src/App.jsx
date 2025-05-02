import { Toaster } from 'react-hot-toast'
import { routes } from './routes.jsx'
import {  useRoutes } from 'react-router-dom'
import './App.css'


function App() {
 
 const elements = useRoutes(routes)

  return (
    <>
    {elements}
    <Toaster position='bottom-right' reverserOrder={false}/>
    </>
  )
}

export default App
