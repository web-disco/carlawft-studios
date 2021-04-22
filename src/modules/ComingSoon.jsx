import React from "react"
import { Link, ustStaticQuery, graphql, useStaticQuery } from "gatsby"

const ComingSoon = ({ item }) => {
  // get module fields
  const { customFields } = item

  const data = useStaticQuery(graphql`
    query {
      contact: agilityWebsiteSettings {
        customFields {
          phone
          email
          instagram {
            href
            target
            text
          }
        }
      }
    }
  `)

  console.log(data)
  return (
    <div className="grid place-content-center h-screen">
      <Link to="/">
        <img
          src={customFields.logo.url}
          alt={customFields.logo.label}
          className="w-44 mx-auto"
        />
      </Link>
      <ul className="mt-6 flex justify-items-center text-xs font-black uppercase">
        <li className="mx-4">
          <a href={`tel:${data.contact.customFields.phone}`}>Phone</a>
        </li>
        <li className="mx-4">
          <a href={`mailto:${data.contact.customFields.email}`}>Email</a>
        </li>
        <li className="mx-4">
          <a
            href={data.contact.customFields.instagram.href}
            target={data.contact.customFields.instagram.target}
          >
            Instagram
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ComingSoon
