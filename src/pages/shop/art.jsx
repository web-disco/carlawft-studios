import React from "react"
import SEO from "../../components/SEO"
import GlobalHeader from "../../components/GlobalHeader"
import GlobalFooter from "../../components/GlobalFooter"
import ProductListing from "../../components/ProductListing"
import { useStaticQuery, graphql } from "gatsby"

const Art = () => {
  // fetch products
  const data = useStaticQuery(graphql`
    query {
      products: allShopifyProduct(
        filter: { status: { eq: "ACTIVE" }, productType: { eq: "Art" } }
        sort: { order: DESC, fields: createdAt }
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

  return (
    <>
      <SEO title="Art" />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <main className="flex-grow container mx-auto px-4">
          {products.length >= 0 ? (
            <ProductListing products={products} category="Art" />
          ) : (
            <p>No products available...</p>
          )}
        </main>
        <GlobalFooter />
      </div>
    </>
  )
}

export default Art
