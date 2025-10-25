import Sidebar from './Sidebar'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main className="main-container">
                {children}
            </main>
        </div>
    )
}

export default Layout
