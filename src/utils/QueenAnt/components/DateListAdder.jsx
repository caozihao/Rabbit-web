import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Tag } from 'antd';
// import './DateListAdder.less';

class DateListAdder extends Component {
  constructor(props) {
    super(props);
    if (typeof this.props.value !== 'undefined') {
      this.state = {
        tags: this.listToTag(this.props.value),
      };
      this.dateDict = this.listToDict(this.props.value);
    } else {
      this.state = { tags: [] };
      this.dateDict = {};
    }
    this.currentDate = null;
  }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value !== 'undefined') {
      this.dateDict = this.listToDict(nextProps.value);
      this.setState({
        tags: this.listToTag(nextProps.value),
      });
    }
  }

  disabledDate = (currentMoment) => {
    if (currentMoment) {
      const dateStr = currentMoment.format('YYYY-MM-DD');
      return this.hasKey(this.dateDict, dateStr);
    }
  }

  listToDict = (list) => {
    if (!Array.isArray(list)) {
      return null;
    }
    const dict = {};
    for (let i = 0; i < list.length; i += 1) {
      const key = list[i];
      if (!this.hasKey(dict, key)) {
        dict[key] = 1;
      }
    }
    return dict;
  }

  listToTag = (list) => {
    if (typeof list === 'undefined') {
      return null;
    }
    const dateList = [...list].sort();
    // 生成tags
    const tags = [];
    for (let i = 0; i < dateList.length; i += 1) {
      const date = dateList[i];
      tags.push(
        <Tag
          closable
          key={date}
          onClose={() => {
            this.handleTagClose(date);
          }}
        >
          {date}
        </Tag>,
      );
    }
    return tags;
  }

  dictToList = (dict) => {
    if (dict) {
      return Object.keys(dict).sort();
    }
  }


  hasKey = (obj, key) => {
    if (obj && key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    } else {
      return false;
    }
  }
  handleTagClose = (date) => {
    if (this.hasKey(this.dateDict, date)) {
      delete this.dateDict[date];
      // console.log('this.dateDict------->', this.dateDict);
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.dictToList(this.dateDict));
      }
      this.updateTags(this.dateDict);
    }
  }
  updateTags = (dateDict) => {
    const dateList = Object.keys(dateDict).sort();
    // 生成tags
    const tags = [];
    for (let i = 0; i < dateList.length; i += 1) {
      const date = dateList[i];
      tags.push(
        <Tag
          closable
          key={date}
          onClose={() => {
            this.handleTagClose(date);
          }}
        >
          {date}
        </Tag>,
      );
    }
    this.setState(() => {
      return { tags };
    });
  }
  handelDateClick = (moment, dateStr) => {
    if (dateStr) {
      // 去重复, 更新dict
      if (!this.hasKey(this.dateDict, dateStr)) {
        this.dateDict[dateStr] = 1;
      }
      this.updateTags(this.dateDict);
      this.currentDate = null;
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.dictToList(this.dateDict));
      }
    }
  }

  handlePickerOk = () => {
    // this.currentDate = null;
  }


  render() {
    const inputLayout = {
      style: { width: '100%', maxWidth: '220px' },
    };
    return (
      <div className="DateListAdder">
        <DatePicker
          {...inputLayout}
          value={this.currentDate}
          onChange={this.handelDateClick}
          onOk={this.handlePickerOk}
          disabledDate={this.disabledDate}
          placeholder="选择计息日"
          format="YYYY-MM-DD"
          showTime
        />
        <div>{this.state.tags}</div>
      </div>
    );
  }
}

DateListAdder.PropTypes = {};
DateListAdder.defaultProps = {
  // onChange: (list) => {
  //   console.log('dateList------->', list);
  // },
  // initValue: ['2010-11-11', '2017-03-03', '2012-11-11'],
  // initValue: [],
};
export default DateListAdder;
