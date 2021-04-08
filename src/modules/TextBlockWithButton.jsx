import React from "react"
import { Link } from "gatsby"

// function to check whether or not the url is absolute
const isUrlAbsolute = url => url.indexOf("://") > 0 || url.indexOf("//") === 0

// function to generate proper link
const generateLink = (url, target, text) => {
  // if relative link, use next/link
  if (isUrlAbsolute(url) === false) {
    return (
      <Link
        to={url}
        title={text}
        target={target}
        className="bg-black text-white border-2 border-black text-sm mb-4 w-40 p-2 hover:bg-white hover:text-black transition ease-in-out duration-300 inline-block my-4"
      >
        {text}
      </Link>
    )
  } else {
    // else use anchor tag
    return (
      <a href={url} title={text} target={target} className="uppercase">
        {text}
      </a>
    )
  }
}

const TextBlockWithButton = ({ item }) => {
  const { customFields } = item
  return (
    <section className="text-center mt-12">
      {customFields.title && (
        <h1 className="text-2xl font-bold mb-4">{customFields.title}</h1>
      )}
      <p className="max-w-2xl mx-auto">{customFields.text}</p>
      <div>
        {generateLink(
          customFields.button.href,
          customFields.button.target,
          customFields.button.text
        )}
      </div>
    </section>
  )
}

export default TextBlockWithButton
