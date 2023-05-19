import React, { useEffect, Fragment, useState } from "react";

const btnStyle = {
    padding: "4px 10px",
    borderRadius: "7px",
    border: "1px solid #6e98e5d9",
    margin: "5px",
    cursor: "pointer"
}

const indexStyle = {
    borderRadius: "7px",
    border: "1px solid #6e98e5d9",
    margin: "5px",
    cursor: "pointer",
    textAlign: "center",
    height: "24px",
    width: "22px"
}

const AutoCarousel = ({ containerStyle = {}, imageHeight = "auto", auto = false, interval = 1000 }) => {


    let slideIndex = 1;
    const [count, setCount] = useState(0)
    const [sliding, setSliding] = useState(auto)
    const [timer, setTimer] = useState(interval)

    useEffect(() => {
        showSlides(slideIndex);
    }, [])

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("carousel-dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        if (slides.length > 0) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
        }
        slides[slideIndex - 1].style.display = "block";
        if (dots.length > 0) {
            for (let j = 0; j < dots.length; j++) {
                dots[j].className = dots[j].className.replace("carousel-active", "");
            }
            dots[slideIndex - 1].className = dots[slideIndex - 1].className + " carousel-active";
        }
    }

    return (
        <Fragment>
            {carouselItems.length > 0 && <>
                <div className="carousel-container" style={containerStyle} >
                    {carouselItems.map(item => (
                        <div className="carousel-slide carousel-fade" key={item.image}>
                            {/* <div className="carousel-numbertext">{`${count} of ${carouselItems.length}`}</div> */}
                            <img className="carousel-img" src={item.image} height={imageHeight} />
                            <div className="carousel-text">{item?.caption}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {carouselItems.map((item, idx) => (
                        <span key={item.image} className="carousel-dot" style={indexStyle} onClick={() => currentSlide(idx + 1)}>{idx + 1}</span>
                    ))}
                    {/* <div style={btnStyle} onClick={() => plusSlides(-1)}>❮</div> 
                     <div style={btnStyle} onClick={() => plusSlides(1)}>❯</div> */}
                </div>
            </>}
        </Fragment>)
}
export default AutoCarousel;