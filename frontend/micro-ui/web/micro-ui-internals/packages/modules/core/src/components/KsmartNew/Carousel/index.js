import React from "react";
import { Carousel, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarouselHome = () => <Carousel>
  <Carousel.Item>
    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/login-img.png" />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <Image src="https://s3.ap-south-1.amazonaws.com/ikm-egov-assets/citizenlogin.png" />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

export default CarouselHome