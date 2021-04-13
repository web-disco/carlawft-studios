import React from "react"
import SEO from "../components/SEO"
import GlobalHeader from "../components/GlobalHeader"
import GlobalFooter from "../components/GlobalFooter"
import ProductListing from "../components/ProductListing"
import { useStaticQuery, graphql } from "gatsby"

const Art = () => {
  // fetch products
  const data = useStaticQuery(graphql`
    query {
      products: allShopifyProduct(
        filter: { status: { eq: "ACTIVE" }, productType: { eq: "Art" } }
      ) {
        nodes {
          title
          handle
          productType
          images {
            gatsbyImageData(width: 1000, height: 1000, layout: FULL_WIDTH)
          }
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  `)

  const products = data.products.nodes

  if (products.length <= 0) {
    return (
      <>
        <SEO title="Art" />
        <div className="flex flex-col min-h-screen">
          <GlobalHeader />
          <main className="flex-grow container mx-auto px-4">
            <p>No Products Available...</p>
          </main>
          <GlobalFooter />
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Art" />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <main className="flex-grow container mx-auto px-4">
          <ProductListing products={products} category="Art" />
        </main>
        <GlobalFooter />
      </div>
    </>
  )
}

export default Art
