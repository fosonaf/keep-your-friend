import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapPage from './pages/Map'
import Layout from './components/Layout'
import RegisterAnimal from "./pages/RegisterAnimal";
import './index.css';
import './styles.css';
import './App.css'
import './styles/layout.css'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/register-animal' element={<RegisterAnimal />} />
            </Routes>
        </Layout>
    )
}

export default App
