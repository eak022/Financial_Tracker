import React from 'react';
import { Link } from 'react-router-dom';

function SidebarMenu() {
    return (
        <div className="drawer lg:drawer-open w-80">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="AddRecord">Add Record</Link></li>
                
                </ul>
            </div>
        </div>
    );
}

export default SidebarMenu;
