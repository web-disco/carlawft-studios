import React from "react"
import Seo from "../components/Seo"
import GlobalHeader from "../components/GlobalHeader"
import GlobalFooter from "../components/GlobalFooter"

const Cart = () => {
  return (
    <>
      <Seo title="Your Cart" />
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <main className="flex-grow container mx-auto px-4">cart</main>
        <GlobalFooter />
      </div>
    </>
  )
}

export default Cart
