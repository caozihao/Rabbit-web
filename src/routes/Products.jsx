import React, { Component } from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

class Products extends Component {

  // constructor(props) {
  //   super(props);
  // }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    this.doSomething();
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  doSomething = () => {
    console.log('something');
  }

  render() {
    return (
      <div>
        <h2>List of Products</h2>
        <ProductList onDelete={this.handleDelete} products={this.props.products} />
      </div>
    )
  }

}

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
