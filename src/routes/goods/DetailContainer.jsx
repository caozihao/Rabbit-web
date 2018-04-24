import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Page from './detail/Page';
import utils from '../../utils/QueenAnt/utils/utils';
import MainLayout from '../../components/layout/MainLayout.jsx';
// import  './MainContainer.scss';


class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const id = utils.getIdFromLocation(this.props.location, '/detail/:id');
    this.getById(id);
  }

  componentWillReceiveProps(nextProps) { }

  getById = (id) => {
    this.props.dispatch({
      type: "goods/getById",
      payload: {
        id
      }
    })
  }


  render() {
    const { goods } = this.props;
    const { detail } = goods;

    return (
      <MainLayout
        location={this.props.location}
        needLogin={false}
      // footer={<MainFooter />}
      >
        <Page detail={detail} />
      </MainLayout>
    );
  }
}
MainContainer.PropTypes = {};
MainContainer.defaultProps = {};
const mapStateToProps = (state) => {
  const goods = state.goods;
  return {
    goods,
  };
};
export default connect(mapStateToProps)(MainContainer);
