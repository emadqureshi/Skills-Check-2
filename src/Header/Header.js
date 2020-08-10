import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import shelfie_icon from '../../assest/shelfie_icon.png'

import './Header.css'

class Header extends Component {
    render() {
        return(
            <header className='header'>
                <div className='header-content'>
                    <div className='header-icon'>
                        <img src={shelfie_icon} alt='shelfie-icon' />
                        <h1>Shelfie</h1>
                    </div>
                    <div className='header-buttons'>
                        <Link to='/'>
                            <button>Dashboard</button>
                        </Link>
                        <Link to='/add'>
                            <button>Add Inventory</button>
                        </Link>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header