import React, { useState } from "react"
import { Link } from "gatsby"
import { TiTimes } from "react-icons/ti"

const CartItem = ({ item, removeFromCart }) => {
  // create item slug
  const itemSlug = item.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")

  return (
    <>
      <tr className="h-4 w-full border-0 border-t-2 border-gray-200">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <Link className="flex-1" to={`/products/${itemSlug}`}>
            <img
              src={item.variant.image.src}
              alt={item.title}
              style={{ width: "80px", height: "80px" }}
            />
          </Link>
        </td>
        <td>
          <Link to={`/products/${itemSlug}`}>
            <h3 className="max-w-xs text-xs font-black uppercase mb-2">
              {item.title}
            </h3>
          </Link>
          {item.variant.selectedOptions.length > 0 &&
          item.variant.selectedOptions[0].value !== "Default Title"
            ? item.variant.selectedOptions.map((option, index) => (
                <p className="text-sm" key={index}>
                  {option.value}
                </p>
              ))
            : null}
        </td>
        <td className="text-right text-sm">
          <div className="justify-end relative -right-3">
            <button onClick={() => removeFromCart(item.variant.id)}>
              <TiTimes />
            </button>
          </div>
        </td>
        <td className="text-right text-sm">
          <p className="mb-2">
            $ {(item.variant.priceV2.amount * item.quantity).toFixed(2)}
          </p>
        </td>
      </tr>
      <tr className="h-4 w-full border-0 border-b-2 border-gray-200">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </>
  )
}

export default CartItem
