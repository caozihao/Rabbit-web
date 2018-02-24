import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

/* const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
}; */

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => this.props.onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    }];
  }

  componentDidMount() { }

  render() {


    return (
      <Table
        dataSource={this.props.products}
        columns={this.columns}
      />
    )
  }

}


ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
