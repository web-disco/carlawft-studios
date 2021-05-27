import React from "react"
import SEO from "../components/SEO"
import GlobalHeader from "../components/GlobalHeader"
import GlobalFooter from "../components/GlobalFooter"
import CartItem from "../components/CartItem"
import { Link } from "gatsby"
import { useCart, useRemoveItemFromCart } from "gatsby-theme-shopify-manager"

const Cart = () => {
  // set cart
  const cart = useCart()

  console.log(cart)

  // set up remove item function
  const removeItemFromCart = useRemoveItemFromCart()

  async function removeFromCart(variantId) {
    if (cart.lineItems.length < 1) {
      return null
    }
    try {
      await removeItemFromCart(variantId)
    } catch (e) {
      console.log("Error removing item from cart", e)
    }
  }

  return (
    <>
      <SEO title="Your Cart" />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <main className="flex-grow container mx-auto px-4">
          <h1 className="text-4xl font-bold my-6 uppercase">// Your Cart</h1>
          {cart?.lineItems.length > 0 ? (
            <>
              <table className="table-auto border-collapse w-full">
                <thead className="">
                  <tr>
                    <th className="w-1/4 text-left"></th>
                    <th className="w-1/4"></th>
                    <th className="w-1/4"></th>
                    <th className="w-1/4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-4">
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {cart.lineItems &&
                    cart.lineItems.map((item, index) => (
                      <CartItem
                        item={item}
                        removeFromCart={removeFromCart}
                        key={index}
                      />
                    ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-6">
                <div className="bg-gray-100 p-6 text-sm">
                  <p className="text-right mb-2">
                    subtotal{" "}
                    <span className="ml-4">$ {cart.paymentDueV2.amount}</span>
                  </p>
                  <p className="mb-6">
                    taxes and shipping calculated at checkout
                  </p>
                  <a
                    className="text-center block w-full bg-black text-white border-2 border-black text-sm p-2 hover:bg-white hover:text-black transition ease-in-out duration-300"
                    href={cart.webUrl}
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center h-screen grid place-content-center">
              <p className="block">Your cart is currently empty...</p>
              <div>
                <Link
                  to="/shop"
                  className="mx-4 bg-black text-white border-2 border-black text-sm mb-4 w-40 p-2 hover:bg-white hover:text-black transition ease-in-out duration-300 inline-block my-4"
                >
                  View Shop
                </Link>
              </div>
            </div>
          )}
        </main>
        <GlobalFooter />
      </div>
    </>
  )
}

export default Cart
