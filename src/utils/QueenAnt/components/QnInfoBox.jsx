import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './QnInfoBox.less';

class QnInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: (<span className="infoBoxTitleColumn">key</span>),
          dataIndex: 'title',
          key: 'title',
          className: 'infoBoxTitleColumn',
          width: '150px',
          // render: (text) => {
          //   const style = {
          //     fontWeight: 'bold',
          //     textAlign: 'right',
          //   };
          //   return (<span style={style} >{text}</span>);
          // },
        },
        {
          title: '内容',
          dataIndex: 'value',
          key: 'value',
          width: '200px',
        },
      ],
      dataSource: this.getDataSourceFromRecord(this.props.record, this.props.dict),
    };
  }

  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if ((this.props.record !== nextProps.record) || (this.props.dict !== nextProps.dict)) {
      this.setState({
        dataSource: this.getDataSourceFromRecord(nextProps.record, nextProps.dict),
      });
    }
  }
  getDataSourceFromRecord = (record, dict) => {
    if (record && dict) {
      const dataSource = [];
      for (const itemKey in record) {
        if (Object.prototype.hasOwnProperty.call(record, itemKey)) {
          const itemValue = record[itemKey];
          dataSource.push({
            title: dict[itemKey].title || itemKey,
            key: dict[itemKey].title || itemKey,
            value: dict[itemKey].render ? dict[itemKey].render(itemValue) : itemValue,
          });
        }
      }
      return dataSource;
    }
  }
  render() {
    return (
      <div className="QnInfoBox">
        <Table
          loading={this.props.loading}
          showHeader={false}
          size="small"
          // bordered
          columns={this.state.columns}
          pagination={false}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}
QnInfoBox.PropTypes = {};
QnInfoBox.defaultProps = {
  record: null,
  dict: null,
  loading: false,
};
export default QnInfoBox;
