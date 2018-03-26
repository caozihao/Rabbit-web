import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Table, Row, Col, Select, DatePicker, Input, Form, Button } from 'antd';
import { Link } from 'dva/router';
import "./Page.scss";

const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) { }

  handleChangeSelect = (e) => {

  }

  handleChangeRangePicker = (e) => {

  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <div className="goods-detail-page">
        <Card hoverable>
          <h1 className="title">丢失了一个皮夹子</h1>
          <ul className="title-brief clearfix">
            <li><b>发布时间&nbsp;&nbsp;:&nbsp;&nbsp;</b>2018年03月25日 15:07:15</li>
            <li><b>浏览量&nbsp;&nbsp;:&nbsp;&nbsp;</b>1024</li>
            <li><b>状态&nbsp;&nbsp;:&nbsp;&nbsp;</b>发布中1</li>
          </ul>
          <Form className="goods-form">
            <FormItem
              {...formItemLayout}
              label={<b>发布者 </b>}
            >
              张梦雪
          </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>联系电话  </b>}
            >
              13564412364
          </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>物品种类  </b>}
            >
              证件
          </FormItem>
            <FormItem
              {...formItemLayout}
              label={<b>物品图片  </b>}
            >
              <img className="goods-picture" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521975520113&di=54650084008448d6f6ab887a0674d383&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D8f51dc693fa85edfee81f663202c6c4f%2Fc8177f3e6709c93d43afbbce943df8dcd10054ad.jpg" />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<b>拾取地点  </b>}
            >
              食堂
          </FormItem>
            <FormItem
              {...formItemLayout}

              label={<b>详细内容  </b>}
            >
              东西放在了门卫处，请自己捡拾
          </FormItem>
          </Form>

          <div className="form-bottom">
            <Button type="primary">我要领取</Button>
          </div>

        </Card>
      </div>)
  }
}

MainPage.PropTypes = {};
MainPage.defaultProps = {};
export default connect()(MainPage);
