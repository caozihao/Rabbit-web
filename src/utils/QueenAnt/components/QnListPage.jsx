import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button } from 'antd';
import './QnListPage.less';
import QnTable from './QnTable';
import QnFilter from './QnFilter';
import QnFormModal from './QnFormModal';
import QnTableWithSummary from './QnTableWithSummary';
import { Link } from 'dva/router';


const TabPane = Tabs.TabPane;

class QnListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  genAdder = () => {
    if (!this.props.hasAdder) {
      return false;
    }
    if (this.props.adderType === 'link') {
      return (<Link to={this.props.adderRoute}>
        <Button
          className="adderBtn"
          icon="plus"
          type="primary"
        >
          {`新增${this.props.title}`}
        </Button>
      </Link>);
    } else if (this.props.adderType === 'modal') {
      return (<QnFormModal
        title={`新增${this.props.title}`}
        buttonProps={{
          type: 'primary',
          icon: 'plus',
          title: `新增${this.props.title}`,
          className: 'listPageBtn',
          style: { marginBottom: '0.5rem' },
        }}
        formItems={this.props.formItems}
        formDict={this.props.formDict}
        formInitValueObj={this.props.formInitValueObj}
        handleOk={this.props.handleAdd}
      />);
    }
  }
  render() {
    const { loading, columns, dataSource, total, handlePageChange, rowKey, defaultColumnValues } = this.props;
    const tabContent = (
      <div className="QnListPage">
        {this.genAdder()}
        {
          this.props.hasFilter ?
            <QnFilter
              rules={this.props.filterRules}
              handleChange={this.props.handleFilterChange}
            />
            : null
        }
        {
          this.props.hasSummary ?
            <QnTableWithSummary
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              total={total}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageChange}
              rowKey={rowKey}
              defaultColumnValues={defaultColumnValues}
              otherProps={this.props.otherTableProps}
              {...this.props.otherQnTableProps}

              //-------------------
              summaryColumnValues={this.props.summaryColumnValues}
            />
            :
            <QnTable
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              total={total}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageChange}
              rowKey={rowKey}
              defaultColumnValues={defaultColumnValues}
              pageSize={this.props.pageSize}
              otherProps={this.props.otherTableProps}
              {...this.props.otherQnTableProps}
            />

        }

      </div>
    );
    let result;
    if (this.props.hasTab) {
      result = (<Tabs>
        <TabPane
          tab={this.props.title}
          key="main"
        >
          {tabContent}
        </TabPane>
      </Tabs>);
    } else {
      result = tabContent;
    }
    return result;
  }
}
QnListPage.PropTypes = {};
QnListPage.defaultProps = {
  // 通用
  loading: false,
  title: 'foo',
  hasTab: true,

  // 表格相关
  columns: [],
  dataSource: [],
  total: -1,
  rowKey: item => item.id,
  handlePageChange: () => { },
  pageSize: 10,
  // defaultColumnValues: [],

  // 表格汇总列相关
  hasSummary: false,
  summaryColumnValues: [],

  // 表格过滤器相关
  hasFilter: true,
  filterRules: [],
  handleFilterChange: () => { },

  // 其他表格参数
  otherTableProps: {},
  otherQnTableProps: {},

  // 新增记录相关
  hasAdder: true,
  // adderType :modal | link 默认为modal
  adderType: 'modal',
  // 如果是modal, 需要以下参数
  formItems: [],
  formDict: null,
  formInitValueObj: null,
  handleAdd: null,
  // 如果是link, 需要以下参数
  adderRoute: '',


};
export default QnListPage;
