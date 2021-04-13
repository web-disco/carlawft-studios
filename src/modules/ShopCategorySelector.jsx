import React from "react"
import GridCard from "../components/GridCard"

const ShopCategorySelector = ({ item }) => {
  const { customFields } = item
  console.log(customFields)
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <GridCard
        image={customFields.accessoriesFeaturedImage}
        title={customFields.shopArtButton.text}
        subtitle="+"
        path={customFields.shopArtButton.href}
      />
      <GridCard
        image={customFields.artFeaturedImage}
        title={customFields.shopAccessoriesButton.text}
        subtitle="+"
        path={customFields.shopAccessoriesButton.href}
      />
    </div>
  )
}

export default ShopCategorySelector
