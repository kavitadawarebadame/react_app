import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Products extends Component{
    constructor(props) {
        super(props);
       
        this.deleteProducts = this.deleteProducts.bind(this);

   this.state={
        products:[],
        checkedBoxes: [],	
        loading:true,
    }
}
    async componentDidMount(){
        const res= await axios.get('http://127.0.0.1:8000/api/products');
        console.log(res);
        if(res.data.status === 200){
            this.setState({
               products:res.data.products,
               loading:false,
            })

        }
    }
    deleteProducts = async (e, id) => {
        e.preventDefault();
        const theidclick =e.currentTarget;
        theidclick.innerText= 'Deleteing';
        const res = await axios.delete(`http://127.0.0.1:8000/api/deleteproducts/${id}`);
        if(res.data.status === 200){
            theidclick.closest('tr').remove();
            swal("Success!",res.data.message,"success");
            //console.log(res.data.message);

        }
        }
        
       
    render(){
        var products_table = "";
        if(this.state.loading){
            products_table = <tr><td colSpan='6'><h2>Loading....</h2></td></tr>
        }
        else{
            products_table = this.state.products.map((item) =>{
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>{item.product_description}</td>
                    <td>{item.product_image}</td>

            
                    <td>
                        <Link to={`editproduct/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => this.deleteProducts(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                    </tr> 
                );
            });
        }
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">

                        <h2>Basic Products App</h2>
                            <div className="card">
                                <div className="card-header">Products Data
                                
                                <Link to={'addproduct'} className="btn btn-primary btn-sm float-end">Add Product </Link>
                                    
                                 </div>
                            
                            <div className="card-body">
                                <table className='table table-borderd table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Product Name</th>
                                            <th>Product Price</th>
                                            <th>Product Description</th>
                                            <th>Product Image</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            { products_table }
                                    </tbody>
                                </table>

                            </div>
                            </div>
                     </div>
                </div>
            </div>
        );
    }
}
export default Products;