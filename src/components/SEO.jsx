import React from "react"
import { Helmet } from "react-helmet"

const SEO = ({ title, description, keywords, ogImage }) => {
  return (
    <Helmet
      title={`${title}  | Carlawft Studios`}
      htmlAttributes={{
        lang: "en",
      }}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: "keywords",
          content: keywords,
        },
        {
          property: `og:title`,
          content: `${title} | Carlawft Studios`,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `@carlawftstudios`,
        },
        {
          name: `twitter:title`,
          content: `${title} | Carlawft Studios`,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `twitter:image`,
          content: ogImage,
        },
        {
          property: `image`,
          content: ogImage,
        },
      ]}
    />
  )
}

export default SEO
