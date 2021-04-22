import React, { useState, useEffect } from "react"
import OptionPicker from "./OptionPicker"
import { useClientUnsafe, useAddItemToCart } from "gatsby-theme-shopify-manager"

const ProductForm = ({ product }) => {
  // set up client
  const client = useClientUnsafe()

  // set up add to cart hook
  const addItemToCart = useAddItemToCart()

  // add to cart function
  const handleAddToCart = async () => {
    try {
      await addItemToCart(variant.storefrontId, 1)
    } catch (e) {
      console.log("error adding to cart...")
    }
  }

  // get sizes if applicable
  let sizes

  if (product.options.find(option => option.name.toLowerCase() === "size")) {
    sizes = product.options.find(option => option.name.toLowerCase() === "size")
      .values
  }

  // set initial variant
  const [variant, setVariant] = useState(product.variants[0])

  // set product availability
  const [available, setAvailable] = useState(
    product.variants[0].availableForSale
  )

  console.log(available)

  // set size
  const [size, setSize] = useState(
    product.variants[0].selectedOptions[0]?.value
  )

  // check availability function
  const checkAvailability = async storefrontId => {
    const product = await client.product.fetch(storefrontId)
    const result = product.variants.filter(v => v.id === variant.storefrontId)
    setAvailable(result[0].available)
  }

  useEffect(() => {
    checkAvailability(product.storefrontId)
  })

  useEffect(() => {
    const newVariant = product.variants.find(variant => {
      // if we only have sizes, return sizes value
      if (variant.selectedOptions[0]) {
        return variant.selectedOptions[0].value === size
      }
    })
    // set new variant
    setVariant(newVariant)
  }, [product.variants, size, variant])

  return (
    <div>
      product form
      <OptionPicker
        name="Size"
        options={sizes}
        selected={size}
        onChange={e => setSize(e.target.value)}
      />
      <button disabled={available ? null : "disabled"}>Add To Cart</button>
    </div>
  )
}

export default ProductForm
