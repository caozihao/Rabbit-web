import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import QnTable from './QnTable';
import './QnTableWithSummary.less';

const Panel = Collapse.Panel;

class QnTableWithSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.summaryColumns = this.updateSummaryColumns(this.props.summaryColumnValues, this.props.columns);
    this.summaryDataSource = this.updateSummaryDataSource(this.props.summaryColumnValues, this.props.dataSource);
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    const isChanged = (field) => {
      return this.props[field] !== nextProps[field];
    };
    const { columns, dataSource, summaryColumnValues } = nextProps;

    if (isChanged('summaryColumnValues')) {
      this.summaryColumns = this.updateSummaryColumns(summaryColumnValues, columns);
      this.summaryDataSource = this.updateSummaryDataSource(summaryColumnValues, dataSource);
    } else if (isChanged('columns')) {
      this.summaryColumns = this.updateSummaryColumns(summaryColumnValues, columns);
    } else if (isChanged('dataSource')) {
      this.summaryDataSource = this.updateSummaryDataSource(summaryColumnValues, dataSource);
    }
  }
  isValidArray = (arr) => {
    return (Array.isArray(arr) && arr.length > 0);
  }


  updateSummaryColumns = (summaryFields, columns) => {
    if (this.isValidArray(columns) && this.isValidArray(summaryFields)) {
      const results = [];
      for (let i = 0; i < summaryFields.length; i += 1) {
        const fieldName = summaryFields[i];
        for (let j = 0; j < columns.length; j += 1) {
          const column = columns[j];
          if (column.dataIndex === fieldName) {
            results.push(column);
            break;
          }
        }
      }
      return results;
    }
  }

  isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  }
  // 浮点计算会出现0.0000000001或者0.9999999999这样的错误, 本函数解决这个问题
  fixFloatError = (num) => {
    return this.isFloat(num) ? num.toFixed(2) : num;
  }
  fixFloatErrorOfObj = (obj) => {
    if (obj) {
      const result = {};
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        result[key] = this.fixFloatError(obj[key]);
      }
      return result;
    }
  }
  updateSummaryDataSource = (summaryFields, dataSource) => {
    if (this.isValidArray(dataSource) && this.isValidArray(summaryFields)) {
      const sumObj = {};
      for (let i = 0; i < dataSource.length; i += 1) {
        const rowData = dataSource[i];
        for (let j = 0; j < summaryFields.length; j += 1) {
          const fieldName = summaryFields[j];
          if (sumObj[fieldName]) {
            sumObj[fieldName] += rowData[fieldName];
          } else {
            sumObj[fieldName] = rowData[fieldName];
          }
        }
      }
      const result = this.fixFloatErrorOfObj(sumObj);
      result.key = 'only_one';
      // 结果要转成只有一个元素的数组
      return [result];
    }
  }
  // getSummaryRowKey = (item) => {
  //   const fields = this.props.summaryColumnValues;
  //   if (this.isValidArray(fields)) {

  //   }else{

  //   }
  // }
  render() {
    // const { } = this.props;
    // const commonProps = {

    // };
    return (
      <div className="QnTableWithSummary" >

        <Collapse
          defaultActiveKey={['summary']}
          className="summaryCollapse"
        // bordered={false}
        >
          <Panel
            header={<div className="summaryTableTitle">本页数据汇总</div>}
            key="summary"
          >
            <QnTable
              hasPagination={false}
              hasColumnSwitch={false}
              columns={this.summaryColumns}
              dataSource={this.summaryDataSource}
              rowKey={() => 1}
              bordered
              otherProps={{
                rowClassName: () => 'summaryRow',
                // size: 'large',
                // title: () => (<div className="summaryTableTitle">本页数据汇总</div>),
              }}
            />
          </Panel>
        </Collapse>
        <QnTable
          {...this.props}
        />
      </div>
    );
  }
}
QnTableWithSummary.PropTypes = {
  columns: PropTypes.array,
  defaultColumnValues: PropTypes.array, // 默认显示的列字段
  dataSource: PropTypes.array,
  // total: PropTypes.number, // 数据条数
  loading: PropTypes.bool,
  handlePageChange: PropTypes.func,
  handlePageSizeChange: PropTypes.func,
  hasPagination: PropTypes.bool,
  hasColumnSwitch: PropTypes.bool,
  rowKey: PropTypes.func,
};
QnTableWithSummary.defaultProps = {
  columns: [],
  dataSource: [],
  total: 0, // 数据条数
  loading: false,

  handlePageChange: (pageNo, pageSize) => { },
  handlePageSizeChange: (pageNo, pageSize) => { },

  hasPagination: true,
  hasColumnSwitch: true,
  hasRowSelection: false,

  handleRowSelect: (selectedRows) => { },

  rowKey: item => item.id,
  bordered: true,
  otherProps: {},
  disableSummary: false,
  // 汇总列用到的数据
  summaryColumnValues: [],
};
export default QnTableWithSummary;
