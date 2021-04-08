import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { graphql, useStaticQuery } from "gatsby"

const Clients = ({ item }) => {
  const { customFields } = item

  // slider settings
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
  }

  const data = useStaticQuery(graphql`
    query {
      allAgilityClient(
        filter: { properties: { referenceName: { eq: "home_clients_client" } } }
      ) {
        nodes {
          customFields {
            logo {
              label
              url
            }
          }
        }
      }
    }
  `)

  const clients = data.allAgilityClient.nodes

  return (
    <div className="mt-20">
      <h3 className="uppercase font-black mb-8">{customFields.title}</h3>
      <Slider {...settings}>
        {clients.map((client, index) => (
          <div key={index} className="text-center">
            <AgilityImage
              image={client.customFields.logo}
              layout="constrained"
              width="350"
              height="150"
              className="filter-grayscale hover:filter-none"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Clients
