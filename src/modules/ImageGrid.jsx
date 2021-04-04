import React from "react"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"

const ImageGrid = ({ item }) => {
  const { customFields } = item
  return (
    <div className="grid grid-rows-1 grid-cols-2 gap-4">
      <AgilityImage
        image={customFields.image1}
        layout="fullWidth"
        className="row-span-1 col-span-1"
      />
      <AgilityImage
        image={customFields.image3}
        layout="fullWidth"
        className="row-span-3 col-span-1"
      />
      <AgilityImage
        image={customFields.image2}
        layout="fullWidth"
        className="row-span-2 col-span-1"
      />
    </div>
  )
}

export default ImageGrid
