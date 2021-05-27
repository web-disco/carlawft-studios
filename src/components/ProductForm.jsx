import React, { useState, useEffect } from "react"
import OptionPicker from "./OptionPicker"
import {
  useClientUnsafe,
  useAddItemToCart,
  useCart,
} from "gatsby-theme-shopify-manager"

const ProductForm = ({ product }) => {
  // set up client
  const client = useClientUnsafe()

  // set up add to cart hook
  const addItemToCart = useAddItemToCart()

  // add to cart function
  const handleAddToCart = async () => {
    try {
      await addItemToCart(variant.storefrontId, 1)
      console.log("added to cart...")
    } catch (e) {
      console.log("error adding to cart...", e)
    }
  }

  // get sizes if applicable
  let sizes

  if (product.options.find(option => option.name.toLowerCase() === "size")) {
    sizes = product.options.find(option => option.name.toLowerCase() === "size")
      .values
  }

  // get colors if applicable
  let colors

  if (product.options.find(option => option.name.toLowerCase() === "color")) {
    colors = product.options.find(
      option => option.name.toLowerCase() === "color"
    ).values
  }

  // set initial variant
  const [variant, setVariant] = useState(
    product.variants[0] || product.storefrontId
  )

  console.log("product", product)
  console.log("variant", variant)

  // set product availability
  const [available, setAvailable] = useState(
    product.variants[0].availableForSale
  )

  // set size
  const [size, setSize] = useState(
    product.variants[0].selectedOptions.find(
      option => option.name.toLowerCase() === "size"
    )?.value
  )

  // set color
  const [color, setColor] = useState(
    product.variants[0].selectedOptions.find(
      option => option.name.toLowerCase() === "color"
    )?.value
  )

  // check availability function
  const checkAvailability = async storefrontId => {
    const product = await client.product.fetch(storefrontId)
    // const result = product.variants.filter(v => v.id === variant.storefrontId)
    // setAvailable(result[0].available)
  }

  // check availability when variant changes
  useEffect(() => {
    checkAvailability(product.storefrontId)
  }, [variant])

  // get new variant
  useEffect(() => {
    const newVariant =
      product.variants.find(variant => {
        // variant size
        const variantSize = variant.selectedOptions.find(
          option => option.name.toLowerCase() === "size"
        )

        // variant color
        const variantColor = variant.selectedOptions.find(
          option => option.name.toLowerCase() === "color"
        )

        // if we have size and color
        if (variantSize && variantColor) {
          return variantSize.value === size && variantColor.value === color
        }

        // if we only have sizes, return sizes value
        if (variantSize) {
          return variantSize.value === size
        }

        // if we only have color
        if (variantColor) {
          return variantColor.value === color
        }
      }) || product.variants[0]
    // set new variant
    setVariant(newVariant)
  }, [product.variants, size, color, variant])

  return (
    <div>
      {sizes && (
        <OptionPicker
          name="Size"
          options={sizes}
          selected={size}
          onChange={e => setSize(e.target.value || null)}
        />
      )}
      {colors && (
        <OptionPicker
          name="Color"
          options={colors}
          selected={color}
          onChange={e => setColor(e.target.value || null)}
        />
      )}
      <button
        disabled={available ? null : "disabled"}
        onClick={handleAddToCart}
        className={`${
          available
            ? `bg-black text-white hover:bg-white hover:text-black`
            : `bg-gray-100 text-black`
        } text-sm mb-4 w-full p-2 transition ease-in-out duration-300 inline-block my-4 border-2 border-black`}
      >
        {available ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  )
}

export default ProductForm
