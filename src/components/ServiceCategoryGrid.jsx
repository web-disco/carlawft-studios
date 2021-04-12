import React from "react"
import GridCard from "./GridCard"

const ServiceCategoryGrid = ({ title, definition, services, category }) => {
  return (
    <div className="mb-16" id={category}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-8">{definition}</p>
      <div className="grid gap-8 sm:grid-cols-2 ">
        {services.map((service, index) => (
          <GridCard
            title={service.customFields.title}
            image={service.customFields.image}
            subtitle="+"
            key={index}
            path={service.sitemapNode.path}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceCategoryGrid
