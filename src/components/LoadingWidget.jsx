import React from "react"
import { CgSpinner } from "react-icons/cg"

const LoadingWidget = ({ message }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <CgSpinner className="animate-spin text-2xl mb-4" />
      <p className="max-w-md mx-auto px-6 text-center">{message}</p>
    </div>
  )
}

export default LoadingWidget
