import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content-area">
                <div className="content-wrapper animate-enter">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
