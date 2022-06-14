import React, {Component } from 'react';
import {Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Editproduct extends Component{
    
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
    async componentDidMount(){
        
        const product_id = this.props.match.params.id;//id is from route page/editproduct/:id
        console.log(product_id);
        const res = await axios.get(`http://127.0.0.1:8000/api/edit_products/${product_id}`);
        if(res.data.status === 200){
            this.setState({
                product_name:res.data.products.product_name,//products is response name from laravel
                product_price:res.data.products.product_price,
                product_description:res.data.products.product_description,
            })
        }
        


    }
    
    updateProduct = async (e)=> {
        e.preventDefault();
        const product_id = this.props.match.params.id;//id is from route page/editbook/:id
        const res = await axios.put(`http://127.0.0.1:8000/api/update_products/${product_id}`,this.state);
        if(res.data.status === 200){
            //console.log(res.data.message);
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
                                <div className="card-header">Edit Products
                                <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                
                                   </div>
                            
                            <div className="card-body">
                            <form onSubmit={this.updateProduct}>
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
                                    <input type="file" name="product_image" onChange={this.handleInput} value={this.state.product_image} className='form-control' multiple/>           
                                </div>
                                <div className='form-group mb-3'>
                                    
                                    <button type="submit" className='btn btn-primary'>Update</button>
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
//export default Editproduct;
export default withRouter(Editproduct);