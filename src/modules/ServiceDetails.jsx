import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { renderHTML } from "../agility/utils"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import ServiceForm from "../components/ServiceForm"

const ServiceDetails = ({ dynamicPageItem }) => {
  // open / close modal state
  const [show, setShow] = useState(false)

  // open / close modal functions
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // form from Agility
  const form = dynamicPageItem.customFields.form

  const data = useStaticQuery(graphql`
    query MyQuery {
      allAgilityService {
        nodes {
          contentID
          customFields {
            title
            description
            image {
              label
              url
            }
          }
          linkedContent_agilityRates {
            customFields {
              rate
              service
              title
            }
          }
        }
      }
    }
  `)

  // grab all services
  const services = data.allAgilityService.nodes

  // filter out the service we're looking for to so we can also get linked content
  const service = services.filter(
    service => service.contentID === dynamicPageItem.contentID
  )

  // grab rates
  const rates = service[0].linkedContent_agilityRates

  return (
    <>
      <div>
        <AgilityImage
          image={dynamicPageItem.customFields.image}
          layout="fullWidth"
        />
        <h1 className="text-4xl font-bold my-6">{`// ${service[0].customFields.title}`}</h1>
        <div
          dangerouslySetInnerHTML={renderHTML(
            dynamicPageItem.customFields.description
          )}
        />
        {/* Mobile Buttons Start */}
        <div className="sm:hidden my-10 grid grid-cols-2 gap-4">
          {dynamicPageItem.customFields.form && (
            <button
              className="bg-black text-white border-2 border-black text-sm p-2 hover:bg-white hover:text-black transition ease-in-out duration-300"
              onClick={handleShow}
            >
              Book Now
            </button>
          )}
          <div>
            <Link
              to="/equipment"
              className="block border-2 text-center border-black text-black text-sm p-2 hover:bg-black hover:text-white transition ease-in-out duration-300"
            >
              View Equipment
            </Link>
          </div>
        </div>
        {/* Mobile Buttons End */}
        <div className="grid grid-cols-2 sm:grid-cols-3 my-6">
          {rates.length > 0 && (
            <div className="col-span-2">
              <div className="flex justify-between mb-4">
                <h5 className="font-black uppercase text-lg">Service</h5>
                <h5 className="font-black uppercase text-lg">Rates</h5>
              </div>
              {rates.map((rate, index) => (
                <div className="flex justify-between mb-4" key={index}>
                  <div className="pr-14">
                    <p>{rate.customFields.title}</p>
                    <div
                      className="prose text-sm max-w-full text-black"
                      dangerouslySetInnerHTML={renderHTML(
                        rate.customFields.service
                      )}
                    />
                  </div>
                  <p className="text-sm sm:text-md">{rate.customFields.rate}</p>
                </div>
              ))}
            </div>
          )}
          <div
            className={`hidden sm:block col-span-1 ${
              rates.length > 0 ? `text-right` : `text-left`
            }`}
          >
            {dynamicPageItem.customFields.form && (
              <button
                className="bg-black text-white border-2 border-black text-sm mb-4 w-40 p-2 hover:bg-white hover:text-black transition ease-in-out duration-300"
                onClick={handleShow}
              >
                Book Now
              </button>
            )}
            <div>
              <Link
                to="/equipment"
                className="border-2 text-center border-black text-black text-sm inline-block w-40 p-2 hover:bg-black hover:text-white transition ease-in-out duration-300"
              >
                View Equipment
              </Link>
            </div>
          </div>
        </div>
      </div>
      {form && (
        <div
          className={`${
            show ? `fixed` : `hidden`
          } bg-white w-full h-full top-0 left-0 bottom-0 right-0 overflow-y-scroll p-12 md:p-20`}
        >
          <ServiceForm form={form} handleClose={handleClose} />
        </div>
      )}
    </>
  )
}

export default ServiceDetails
