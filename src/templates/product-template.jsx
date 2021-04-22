import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import SEO from "../components/SEO"
import GlobalHeader from "../components/GlobalHeader"
import GlobalFooter from "../components/GlobalFooter"
import ReccomendedProducts from "../components/ReccomendedProducts"
import ProductImageSlider from "../components/ProductImageSlider"
import ProductForm from "../components/ProductForm"

const Product = ({ data: { product, reccomended } }) => {
  const hasImages = product.images.length > 0
  const hasMultipleImages = product.images.length > 1
  return (
    <>
      <SEO title={`${product.title}`} />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <main className="flex-grow container mx-auto px-4">
          <section className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="overflow-hidden">
              {hasImages &&
                (hasMultipleImages ? (
                  <ProductImageSlider
                    images={product.images}
                    alt={product.title}
                  />
                ) : (
                  <div>
                    <GatsbyImage
                      image={product.images[0].gatsbyImageData}
                      alt={product.title}
                    />
                  </div>
                ))}
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-black uppercase mb-2">
                {product.title}
              </h1>
              <h3>$ {product.priceRangeV2.maxVariantPrice.amount}</h3>
              <ProductForm product={product} />
            </div>
          </section>
          {reccomended.nodes.length >= 1 && (
            <ReccomendedProducts reccomended={reccomended} />
          )}
        </main>
        <GlobalFooter />
      </div>
    </>
  )
}

export default Product

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      shopifyId
      images {
        gatsbyImageData(width: 1000, height: 1000, layout: FULL_WIDTH)
      }
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    reccomended: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        title
        handle
        productType
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        images {
          gatsbyImageData(width: 1000, height: 1000, layout: FULL_WIDTH)
        }
      }
    }
  }
`
