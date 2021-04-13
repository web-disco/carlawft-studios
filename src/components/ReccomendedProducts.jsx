import React from "react"
import ProductCard from "../components/ProductCard"

const ReccomendedProducts = ({ reccomended }) => {
  console.log(reccomended)
  return (
    <section className="mt-8">
      <h3 className="uppercase font-black mb-4 text-sm">You May Also Like</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {reccomended.nodes.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            productType={product.productType.toLowerCase()}
            handle={product.handle}
            image={product.images[0].gatsbyImageData}
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

export default ReccomendedProducts
