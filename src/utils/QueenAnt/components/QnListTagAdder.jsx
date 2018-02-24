import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';
// import './QnListTagAdder.less';
import QnSelect from './QnSelect';

const log = console.log.bind(console);

class QnListTagAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      selectValues: this.getSelectValues(this.props.value),
    };
  }

  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    const isChanged = (name) => {
      return this.props[name] !== nextProps[name];
    };
    if (isChanged('value') && nextProps.value) {
      this.setState({
        selectValues: this.getSelectValues(nextProps.value),
      });
    }
  }


  getSelectValues = (jsonStr) => {
    // value的格式
    // [{"id":1,"name":"钱玖玖服务协议","type":"serviceProtocol","url":"http://jenkins.local.mo9.commonAction/cockApi/contract/service_contract.html"}]"
    if (!jsonStr) {
      return [];
    }

    try {
      const arr = JSON.parse(jsonStr);
      if (Array.isArray(arr) && arr.length > 0) {
        const ids = arr.map(item => `${item.id}`);
        return ids;
      }
    } catch (e) {
      console.log('json.parse错误', e);
      return [];
    }
  }

  // 根据id获取整条数据
  getById = (id, list) => {
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      if (`${item.id}` === id) {
        return item;
      }
    }
    return false;
  }

  // 根据values来生产用于预览的标签
  handleChange = (values) => {
    // console.log('values------->', values);
    const tags = [];
    const dataToSubmit = [];
    for (let i = 0; i < values.length; i += 1) {
      const id = values[i];
      const data = this.getById(id, this.props.list);
      // 注意, 这里把整个数据都发送, 如果可以只发id,可以改这里
      dataToSubmit.push(data);
      if (data) {
        const tag = (
          <Tag
            color="blue"
            key={data.id}
            style={{ marginBottom: '0.5rem' }}
          >
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`点击查看 <${data.name}>`}
            </a>
          </Tag>);
        tags.push(tag);
      }
    }
    this.setState({ tags });
    // TODO 注意, 这里把整个数据都发送, 如果可以只发id,可以改这里
    this.props.onChange(JSON.stringify(dataToSubmit));
  }

  render() {
    return (
      <div className="QnListTagAdder" >
        <QnSelect
          options={this.props.list}
          nameKey={this.props.nameKey}
          valueKey={this.props.valueKey}
          onChange={this.handleChange}
          mode="multiple"
          value={this.state.selectValues}
        />
        <div> {this.state.tags}</div>
      </div>
    );
  }
}
QnListTagAdder.PropTypes = {
  value: PropTypes.str,
};
QnListTagAdder.defaultProps = {
  // 下拉选项相关
  list: [],
  nameKey: 'name',
  valueKey: 'id',
  // 数值相关
  onChange: () => { },
};
export default QnListTagAdder;
