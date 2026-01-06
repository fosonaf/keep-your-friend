import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <FontAwesomeIcon icon={faPaw} className="sidebar-logo" />
                <span className="sidebar-app-name">Keep Your Friend</span>
            </div>
            <nav>
                <ul className="sidebar-menu">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
                            }
                            end
                        >
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/map"
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
                            }
                        >
                            Carte
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register-animal"
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
                            }
                        >
                            Déclarer un animal perdu
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
