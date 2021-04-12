import React, { useState } from "react"
import FooterLinks from "./FooterLinks"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GoChevronDown, GoChevronUp } from "react-icons/go"

const GlobalFooter = () => {
  const [open, setOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      agilityGlobalFooter {
        column1: linkedContent_column1Links {
          customFields {
            link {
              href
              target
              text
            }
          }
        }
        column2: linkedContent_column2Links {
          customFields {
            link {
              href
              target
              text
            }
          }
        }
        column3: linkedContent_column3Links {
          customFields {
            link {
              href
              target
              text
            }
          }
        }
        customFields {
          column1Title
          column2Title
          column3Title
          column4Title
        }
      }
      contact: agilityWebsiteSettings {
        customFields {
          phone
          email
          address
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
    }
  `)

  // links
  const column1Links = data.agilityGlobalFooter.column1
  const column2Links = data.agilityGlobalFooter.column2
  const column3Links = data.agilityGlobalFooter.column3

  // titles
  const titles = data.agilityGlobalFooter.customFields

  // contact
  const contact = data.contact

  const d = new Date()
  const year = d.getFullYear()

  return (
    <>
      <div className="bg-gray-100 pt-12 pb-6 mt-12 text-xs">
        <div className="container mx-auto px-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
          <FooterLinks links={column1Links} title={titles.column1Title} />
          <FooterLinks links={column2Links} title={titles.column2Title} />
          <FooterLinks links={column3Links} title={titles.column3Title} />
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="text-xs flex items-center justify-between w-full focus:outline-none py-2"
            >
              <h5 className="font-bold uppercase">{titles.column4Title}</h5>
              <div className="sm:hidden">
                {open ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </button>
            <ul className={open ? `block sm:block` : `hidden sm:block`}>
              {contact.customFields.phone && (
                <li className="my-3 ml-2 sm:ml-0">
                  <a href={`tel:${contact.customFields.phone}`}>
                    {contact.customFields.phone}
                  </a>
                </li>
              )}
              {contact.customFields.email && (
                <li className="my-3 uppercase ml-2 sm:ml-0">
                  <a href={`mailto:${contact.customFields.email}`}>
                    {contact.customFields.email}
                  </a>
                </li>
              )}
              {contact.customFields.address && (
                <li className="my-3 uppercase ml-2 sm:ml-0">
                  <Link to="/contact">
                    <p>{contact.customFields.address}</p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black text-gray-400 text-center text-xs p-4">
        <div className="flex flex-col md:flex-row md:justify-between container mx-auto px-4">
          <p className="mb-2 md:mb-0">
            © {year} Copyright Carlawft Studios | All Rights Reserved
          </p>
          <p>
            Website by{" "}
            <a
              href="https://www.instagram.com/webdisco.digital/?hl=en"
              title="Toronto Web Development"
              target="_blank"
              rel="noreferrer noopener"
            >
              Web Disco
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default GlobalFooter
