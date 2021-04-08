import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import GridCard from "../components/GridCard"

const ServiceCategoriesListing = () => {
  const data = useStaticQuery(graphql`
    query {
      allAgilityServiceCategory(
        filter: { properties: { referenceName: { eq: "servicecategories" } } }
      ) {
        nodes {
          customFields {
            category
            featuredImage {
              url
              label
            }
          }
        }
      }
    }
  `)

  const categories = data.allAgilityServiceCategory.nodes

  return (
    <section className="grid sm:grid-cols-3 gap-4 mt-12">
      {categories.map((category, index) => (
        <GridCard
          key={index}
          image={category.customFields.featuredImage}
          title={category.customFields.category}
          path={`/services#${category.customFields.category}`}
          subtitle="+"
        />
      ))}
    </section>
  )
}

export default ServiceCategoriesListing
