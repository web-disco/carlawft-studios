import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ProductCard = ({ image, productType, subtitle, handle, title }) => {
  return (
    <div className="group cursor-pointer mb-4 sm:mb-0">
      <Link to={`/${productType}/${handle}`}>
        {image ? (
          <GatsbyImage image={image} alt={title} layout="fullWidth" />
        ) : (
          <p>no img available</p>
        )}
        <div className="flex shadow-sm font-medium justify-between items-center p-2 border-2 border-black group-hover:bg-black group-hover:text-white transition ease-in-out duration-300">
          <p className="text-xs">{title}</p>
          <p className="text-xs">{subtitle}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
