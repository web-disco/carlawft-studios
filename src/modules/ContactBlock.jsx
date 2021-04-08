import React from "react"
import Form from "../components/Form"
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
        }
      }
    }
  `)

  console.log(data)

  return (
    <div className="grid md:grid-cols-2 md:gap-16">
      <div>
        <p className="">{customFields.text}</p>
        <ul className="flex text-xs my-6">
          {data.agilityWebsiteSettings.customFields.instagram && (
            <li className="mr-4">
              <a
                href={data.agilityWebsiteSettings.customFields.instagram.href}
                title={data.agilityWebsiteSettings.customFields.instagram.text}
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
                target={data.agilityWebsiteSettings.customFields.tikTok.target}
                className="font-black uppercase"
              >
                TikTok
              </a>
            </li>
          )}
        </ul>
      </div>
      <div>
        <Form form={customFields.form} />
      </div>
    </div>
  )
}

export default ContactBlock
