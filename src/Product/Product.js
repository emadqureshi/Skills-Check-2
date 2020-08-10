import React from 'react'
import { Link } from 'react-router-dom'

import './Product.css'

function Product(props) {
    return(
        <div className='product'>
            <div className='product-content'>
                <div className='product-flex'>
                    <img src={props.inventory.img} alt={`${props.inventory.name}-img`}/>
                    <div className='product-info'>
                        <p>
                            {props.inventory.name}
                        </p>
                        <p>
                            ${props.inventory.price}
                        </p>
                        <div className='product-buttons'>
                            <Link to='/'>
                                <button onClick={() => props.deleteFn(props.inventory.id)}>Delete</button>
                            </Link>
                            <Link to={`/edit/${props.inventory.id}`}>
                                <button onClick={() => {}}>Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Product