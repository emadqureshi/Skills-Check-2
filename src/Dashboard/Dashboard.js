import React, { Component } from 'react'
import axios from 'axios'

import Product from '../Product/Product'

import './Dashboard.css'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            inventorys: []
        }

        this.deleteInventory = this.deleteInventory.bind(this)
    }

    componentDidUpdate(_, prevState) {
        if(this.state !== prevState) {
            this.getInventory()
        }
    }

    componentDidMount() {
        this.getInventory()
    }
    
    getInventory() {
        axios.get('/api/inventory').then(response => {
        this.setState({
            inventorys: response.data
        })
        }).catch(err => console.log(err))
    }

    deleteInventory(id) {
        axios.delete(`/api/inventory/${id}`).then(response => {
        this.setState({
            inventory: response.data
        })
        this.getInventory()
        }).catch(err => console.log(err))
    }

    render() {
        const inventoryList = this.state.inventorys.map(inventory => {
            return (
                <Product 
                    key={inventory.id} 
                    inventory={inventory}
                    deleteFn={this.deleteInventory}
                /> 
        )})

        return (
            <section className='dashboard'>
                {inventoryList}
            </section>
        )
    }
}

export default Dashboard