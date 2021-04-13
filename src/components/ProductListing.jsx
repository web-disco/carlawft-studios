import React from "react"
import ProductCard from "../components/ProductCard"

const ProductListing = ({ products, category }) => {
  return (
    <section>
      <div className="my-6">
        <h1 className="text-2xl sm:text-4xl font-black uppercase">{`// ${category}`}</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            productType={product.productType.toLowerCase()}
            handle={product.handle}
            image={product.images[0]?.gatsbyImageData}
            subtitle={
              product.productType === "Accessories"
                ? `$${product.priceRangeV2.minVariantPrice.amount}`
                : "+"
            }
          />
        ))}
      </div>
    </section>
  )
}

export default ProductListing
