import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import noCamera from '../../assest/no-camera.png'

import './Form.css'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0,
            img: '',
            isLoaded: false,
            isEdit: false
        }
        this.addInventory = this.addInventory.bind(this)
        this.handleChangeImgURL = this.handleChangeImgURL.bind(this)
        this.onError = this.onError.bind(this)
    }

    componentDidUpdate(_, prevState) {
        if(this.state === prevState) {
            this.resetInput()
        }
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.getInventory(this.props.match.params.id)
        }
    }

    getInventory(id) {
        axios.get(`/api/inventory/${id}`).then(response => {
            const data = response.data[0]
            this.setState({
                name: data.name,
                price: data.price,
                img: data.img,
                isEdit: true
            })
        }).catch(err => console.log(err))
    }

    addInventory() {
        const { name, price, img } = this.state

        axios.post('/api/inventory',{name, price, img}).then(() => {}).catch(err => console.log(err))
    }

    handleChangeImgURL(imgURL) {
        this.setState({
            img: imgURL,
            isLoaded: false
        })
    }

    handleChangeName(name) {
        this.setState({
            name: name
        })
    }

    handleChangePrice(price) {
        this.setState({
            price: price
        })
    }

    submitSave() {
        const { id } = this.props.match.params
        const { name, price, img } = this.state

        axios.put(`/api/inventory/${id}`, {name, price, img}).then(() => {}).catch(err => console.log(err))
    }

    cancelClick() {
        this.resetInput()
    }

    resetInput() {
        this.setState({
            name: '',
            price: 0,
            img: '',
            isLoaded: false,
            idEdit: false
        })
    }

    onError(event) {
        event.target.onerror = null
        event.target.src = noCamera
    }

    render() {
        const { name, price, img, isLoaded, isEdit: idEdit } = this.state

        return(
            <div className='form'>
                <div className='form-content'>
                    <div className='form-flex'>
                        <div className='form-image'>
                            {isLoaded ? null : <div className="form-image-nothing"></div>}
                            <img src={img} alt=''onLoad={()=> this.setState({isLoaded: true})} onError={e => this.onError(e)} style={isLoaded ? {} : {display: 'none'}}/>
                        </div>
                        <div className='form-inputs'>
                            <label>Image URL:</label>
                            <input type='textarea' value={img} onChange={e => this.handleChangeImgURL(e.target.value)}/>
                            <label>Product Name:</label>
                            <input type='textarea' value={name} onChange={e => this.handleChangeName(e.target.value)}/>
                            <label>Price:</label>
                            <input type='number' value={price} onChange={e => this.handleChangePrice(e.target.value)}/>
                        </div>
                        <div className='form-buttons'>
                            <Link to='/'>
                                <button className='form-button' onClick={() => this.cancelClick()}>Cancel</button>
                            </Link>
                                {idEdit ? (
                                    <Link to='/'>
                                        <button className='form-button' onClick={() => this.submitSave()}>Save Change</button>
                                    </Link>
                                ):(
                                    <Link to='/'>
                                        <button className='form-button' onClick={() => this.addInventory()}>Add to Inventory</button>
                                    </Link>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form