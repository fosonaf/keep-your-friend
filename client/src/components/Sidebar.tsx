import { Link } from 'react-router-dom'
import '../styles/sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar-container">
            <h2>Menu</h2>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Link to="/" style={{ color: 'orange' }}>Home</Link></li>
                    <li><Link to="/map" style={{color: 'orange'}}>Map</Link></li>
                    <li><Link to="/register-animal" style={{color: 'orange'}}>Add an animal</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
