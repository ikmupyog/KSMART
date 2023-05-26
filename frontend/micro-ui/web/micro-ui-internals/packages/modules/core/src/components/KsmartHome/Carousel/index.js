import React from "react";
import { Carousel } from 'react-bootstrap';

const data = [{
  url: "https://ulb-logos.s3.ap-south-1.amazonaws.com/bannaer.png",
  title: "",
  desc: ""
},
{
  url: "https://ulb-logos.s3.ap-south-1.amazonaws.com/bannaer.png",
  title: "",
  desc: ""
}];

const createCarouselItem = (data) => {
  let response = [];
  data.map(item => {
    const { url, title, desc } = item;
    response.push(<Carousel.Item>
      <img src={url} alt="" style={{ borderRadius: 20 }} />
      <Carousel.Caption>
        <h3>{title}</h3>
        <p>{desc}</p>
      </Carousel.Caption>
    </Carousel.Item>)
  });
  return response;
}

const CarouselHome = () => <Carousel>
  {createCarouselItem(data)}
</Carousel>

export default CarouselHome