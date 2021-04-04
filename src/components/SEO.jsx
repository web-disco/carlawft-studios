import React from "react"
import { Helmet } from "react-helmet"

const SEO = ({ title, description }) => {
  return (
    <Helmet
      title={`${title}  | Carlawft Studios`}
      meta={[
        {
          name: `description`,
          content: description,
        },
      ]}
    />
  )
}

export default SEO
