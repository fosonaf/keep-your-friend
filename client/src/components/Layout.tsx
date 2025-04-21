import Sidebar from './Sidebar'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '1rem', marginLeft: '15%' }}>
                {children}
            </main>
        </div>
    )
}

export default Layout
