import React, { useState, useContext } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaFacebookF } from "react-icons/fa"
import { SiTiktok } from "react-icons/si"
import { GrInstagram } from "react-icons/gr"
import { StoreContext } from "../context/store-context"

const GlobalHeader = () => {
  // open/close menu
  const [open, setOpen] = useState(false)

  // get checkout from context
  const { checkout } = useContext(StoreContext)

  // query menu items
  const data = useStaticQuery(graphql`
    query {
      menuItems: allAgilitySitemapNode(
        filter: { visible: { menu: { eq: true } } }
      ) {
        nodes {
          title
          path
          menuText
        }
      }
      socials: agilityWebsiteSettings {
        customFields {
          instagram {
            href
            target
            text
          }
          facebook {
            href
            target
            text
          }
          tikTok {
            href
            target
            text
          }
        }
      }
      categories: allAgilityServiceCategory {
        nodes {
          customFields {
            category
          }
        }
      }
    }
  `)

  // get menu items
  const menuItems = data.menuItems.nodes

  // get socials
  const socials = data.socials.customFields

  // get categories
  const categories = data.categories.nodes

  return (
    <>
      <header className="container mx-auto px-4 my-6 text-xs uppercase font-bold">
        <div className="flex justify-between">
          <div>
            <Link to="/cart" className="text-black">
              <span className="hidden md:inline">Cart</span> ({" "}
              {checkout.lineItems.length} )
            </Link>
          </div>
          <div>
            <Link to="/" className="text-black">
              Carlawft Studios
            </Link>
          </div>
          <div>
            <button
              className="text-xs uppercase font-bold"
              onClick={() => setOpen(!open)}
            >
              Menu
            </button>
          </div>
        </div>
        <div>
          <div
            className={`${
              open ? `fixed` : `hidden`
            } bg-gray-100 top-0 right-0 h-full w-48 md:w-80 z-50 shadow-2xl`}
          >
            <div className="my-6 text-right pr-4">
              <button
                className="text-xs uppercase font-black"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <ul className="px-6">
              {menuItems.map((menuItem, index) => {
                return (
                  <li key={index} className="uppercase text-sm font-black mb-6">
                    <Link to={menuItem.path} title={menuItem.title}>
                      {menuItem.menuText}
                    </Link>
                    {menuItem.title === "Services" ? (
                      <ul className="ml-2">
                        {categories.map((category, index) => (
                          <li
                            className="text-xs my-2 font-medium"
                            key={index}
                            onClick={() => setOpen(false)}
                            onKeyDown={() => setOpen(false)}
                          >
                            <Link
                              to={`/services/#${category.customFields.category}`}
                              title={`${category.customFields.category} Services`}
                            >
                              {category.customFields.category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
              <ul className="flex text-sm">
                {socials.instagram && (
                  <li className="mr-4">
                    <a
                      href={socials.instagram.href}
                      title={socials.instagram.text}
                      target={socials.instagram.target}
                    >
                      <GrInstagram />
                    </a>
                  </li>
                )}
                {socials.facebook && (
                  <li className="mr-4">
                    <a
                      href={socials.facebook.href}
                      title={socials.facebook.text}
                      target={socials.facebook.target}
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                )}
                {socials.tikTok && (
                  <li>
                    <a
                      href={socials.tikTok.href}
                      title={socials.tikTok.text}
                      target={socials.tikTok.target}
                    >
                      <SiTiktok />
                    </a>
                  </li>
                )}
              </ul>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}

export default GlobalHeader
