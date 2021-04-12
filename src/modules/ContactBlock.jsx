import React from "react"
import Form from "../components/Form"
import Map from "../components/Map"
import { graphql, useStaticQuery } from "gatsby"

const ContactBlock = ({ item }) => {
  // get module fields
  const { customFields } = item

  const data = useStaticQuery(graphql`
    query {
      agilityWebsiteSettings {
        customFields {
          address
          email
          phone
          facebook {
            href
            target
            text
          }
          instagram {
            href
            target
            text
          }
          tikTok {
            href
            target
            text
          }
          phone
          email
          address
        }
      }
    }
  `)

  return (
    <div>
      <div className="grid md:grid-cols-2 md:gap-16">
        <div className="mb-16 md:mb-0">
          <p>{customFields.text}</p>
          <ul className="flex text-xs my-10">
            {data.agilityWebsiteSettings.customFields.instagram && (
              <li className="mr-4">
                <a
                  href={data.agilityWebsiteSettings.customFields.instagram.href}
                  title={
                    data.agilityWebsiteSettings.customFields.instagram.text
                  }
                  target={
                    data.agilityWebsiteSettings.customFields.instagram.target
                  }
                  className="font-black uppercase"
                >
                  Instagram
                </a>
              </li>
            )}
            {data.agilityWebsiteSettings.customFields.facebook && (
              <li className="mr-4">
                <a
                  href={data.agilityWebsiteSettings.customFields.facebook.href}
                  title={data.agilityWebsiteSettings.customFields.facebook.text}
                  target={
                    data.agilityWebsiteSettings.customFields.facebook.target
                  }
                  className="font-black uppercase"
                >
                  Facebook
                </a>
              </li>
            )}
            {data.agilityWebsiteSettings.customFields.tikTok && (
              <li>
                <a
                  href={data.agilityWebsiteSettings.customFields.tikTok.href}
                  title={data.agilityWebsiteSettings.customFields.tikTok.text}
                  target={
                    data.agilityWebsiteSettings.customFields.tikTok.target
                  }
                  className="font-black uppercase"
                >
                  TikTok
                </a>
              </li>
            )}
          </ul>
          <p className="mb-2">
            <a href={`tel:${data.agilityWebsiteSettings.customFields.phone}`}>
              {data.agilityWebsiteSettings.customFields.phone}
            </a>
          </p>
          <p className="mb-2">
            <a
              href={`mailto:${data.agilityWebsiteSettings.customFields.email}`}
            >
              {data.agilityWebsiteSettings.customFields.email}
            </a>
          </p>
          <p>{data.agilityWebsiteSettings.customFields.address}</p>
        </div>
        <div>
          <Form form={customFields.form} />
        </div>
      </div>
      {customFields.showMap === "true" && (
        <Map
          lng={customFields.longitude}
          lat={customFields.latitude}
          zoom={customFields.zoom}
        />
      )}
    </div>
  )
}

export default ContactBlock
