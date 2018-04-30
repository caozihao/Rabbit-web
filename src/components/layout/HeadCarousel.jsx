import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import './HeadCarousel.scss';
// import carousel_1_img from '../../assets/carousel_1.jpg';
import carousel_2_img from '../../assets/carousel_2.png';
import carousel_3_img from '../../assets/carousel_3.png';
import carousel_4_img from '../../assets/carousel_4.png';


class HeadCarousel extends Component {
  constructor(props) {
    super(props);
    this.carouselImgData = this.getCarouselImgData();
  }

  getCarouselImgData = () => {
    let imgArr = [
      // carousel_1_img,
      carousel_2_img,
      carousel_3_img,
      carousel_4_img,
    ];
    let carouselImgData = imgArr.map((v, i) => {
      return <div key={i}><img src={v} alt={i} /></div>
    })

    return carouselImgData;
  }

  componentDidMount() {

  }

  render() {
    return (
      <Carousel
        className="HeadCarousel"
        autoplay={true} >
        {this.carouselImgData}
      </ Carousel>
    );
  }
}

HeadCarousel.PropTypes = {
  location: PropTypes.string,
};

HeadCarousel.defaultProps = {

};

export default HeadCarousel;
