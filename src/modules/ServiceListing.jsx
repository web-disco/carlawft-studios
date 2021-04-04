import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ServiceCategoryGrid from "../components/ServiceCategoryGrid"

const ServiceListing = () => {
  // query for services & service categories
  const data = useStaticQuery(graphql`
    query {
      services: allAgilityService(sort: {fields: properties___itemOrder}) {
        nodes {
          customFields {
            category_TextField
            description
            title
            image {
              url
              label
            }
          }
          sitemapNode {
            path
          }
        }
      }
      categories: allAgilityServiceCategory(
        sort: { fields: properties___itemOrder }
      ) {
        nodes {
          customFields {
            category
            definition
            title
          }
        }
      }
    }
  `)

  // grab categories
  const categories = data.categories.nodes

  return (
    <>
      {categories.map((category, index) => {
        // find the services that belong in each category
        const services = data.services.nodes.filter(
          service =>
            service.customFields.category_TextField ===
            category.customFields.category
        )
        return (
          <ServiceCategoryGrid
            category={category.customFields.category}
            title={category.customFields.title}
            definition={category.customFields.definition}
            services={services}
            key={index}
          />
        )
      })}
    </>
  )
}

export default ServiceListing
