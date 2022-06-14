import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Addproduct extends Component{
    state={
        product_name:'',
        product_price:'',
        product_description:'',
        product_image:'',

    }
    handleInput = (e)=> {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    saveProduct = async (e)=> {
        console.log(e);
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/add_products',this.state);
        if(res.data.status === 200){
           // console.log(res.data.message);
            swal("Success!",res.data.message,"success");
            this.setState({
                product_name:'',
                product_price:'',
                product_description:'',
                product_image:'',
            })

        }
    }
    render(){ 
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Products Data
                                <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                
                                   </div>
                           
                            <div className="card-body">
                            <form onSubmit={this.saveProduct} enctype="multipart/form-data" method="post">
                                <div className='form-group mb-3'>
                                    <label>Product Name</label>
                                    <input type="text" name="product_name" onChange={this.handleInput} value={this.state.product_name} className='form-control'/>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Product Price</label>
                                    <input type="text" name="product_price" onChange={this.handleInput} value={this.state.product_price} className='form-control'/>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Product Description</label>
                                    <input type="text" name="product_description" onChange={this.handleInput} value={this.state.product_description} className='form-control'/>           
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Product Image</label>
                                    <input type="file" name="product_image" onChange={this.handleInput} value={this.state.product_image} className='form-control'/>           
                                </div>
                                <div className='form-group mb-3'>
                                    
                                    <button type="submit" className='btn btn-primary'>Submit</button>
                                </div>
                            </form>
                            </div>
                            </div>
                     </div>
                </div>
            </div>
        );
    }
}
export default Addproduct;