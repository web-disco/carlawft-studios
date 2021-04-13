import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { GatsbyImage } from "gatsby-plugin-image"

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
}

const ProductImageSlider = ({ images, alt }) => {
  return (
    <div>
      <Slider>
        {images.map((image, index) => (
          <GatsbyImage key={index} image={image.gatsbyImageData} alt={alt} />
        ))}
      </Slider>
    </div>
  )
}

export default ProductImageSlider
