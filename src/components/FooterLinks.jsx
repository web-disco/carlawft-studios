import React, { useState } from "react"
import { Link } from "gatsby"
import { GoChevronDown, GoChevronUp } from "react-icons/go"

// function to check whether or not the url is absolute
const isUrlAbsolute = url => url.indexOf("://") > 0 || url.indexOf("//") === 0

// function to generate proper link
const generateLink = (url, target, text) => {
  // if relative link, use next/link
  if (isUrlAbsolute(url) === false) {
    return (
      <Link to={url} title={text} target={target} className="text-xs uppercase">
        {text}
      </Link>
    )
  } else {
    // else use anchor tag
    return (
      <a href={url} title={text} target={target} className="text-xs uppercase">
        {text}
      </a>
    )
  }
}

const FooterLinks = ({ title, links }) => {
  // state for open/close of menu
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs flex items-center justify-between w-full focus:outline-none py-2"
      >
        <h5 className="font-bold uppercase">{title}</h5>
        <div className="sm:hidden">
          {open ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </button>
      <div className={open ? `block sm:block` : `hidden sm:block`}>
        <ul>
          {links.map((link, index) => (
            <li className="my-2 ml-2 sm:ml-0" key={index}>
              {generateLink(
                link.customFields.link.href,
                link.customFields.link.target,
                link.customFields.link.text
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FooterLinks
