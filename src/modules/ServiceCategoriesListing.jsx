import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import GridCard from "../components/GridCard"

const ServiceCategoriesListing = ({ item }) => {
  const { customFields } = item
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
    <section className="mt-12">
      <h3 className="uppercase font-black mb-4">{customFields.title}</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <GridCard
            key={index}
            image={category.customFields.featuredImage}
            title={category.customFields.category}
            path={`/services#${category.customFields.category}`}
            subtitle="+"
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceCategoriesListing
