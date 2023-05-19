import React from "react";
import AutoCarousel from "./carousel";

const Carousel = () => {

    const carouselItems = [
        { image: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/HA1RQCRQJ7.jpg' },
        { image: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EVHXF4MUT6.jpg' },
        { image: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/D7VE3SK3RD.jpg' },
        { image: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/0XRFUE80AZ.jpg' },
        { image: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/2DQJJ9RLVD.jpg' }
    ]

    return <div>
        Carousel
        <AutoCarousel carouselItems={carouselItems} />
    </div>
}

export default Carousel