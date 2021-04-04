import React from "react"

const PageTitle = ({ page }) => {
  const { title } = page
  return (
    <div className="my-6">
      <h1 className="text-2xl sm:text-4xl font-black uppercase">{`// ${title}`}</h1>
    </div>
  )
}

export default PageTitle
