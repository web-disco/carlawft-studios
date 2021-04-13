import React from "react"
import { Link } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"

const GridCard = ({ image, title, subtitle, path }) => {
  return (
    <div className="group cursor-pointer text-xs font-medium mb-4 sm:mb-0">
      <Link to={path}>
        <AgilityImage image={image} layout="fullWidth" />
        <div className="shadow-sm flex justify-between items-center p-2 border-2 border-black group-hover:bg-black group-hover:text-white transition ease-in-out duration-300">
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
      </Link>
    </div>
  )
}

export default GridCard
