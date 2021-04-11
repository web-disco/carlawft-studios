import React, { useEffect, useState } from "react"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LoadingWidget from "../components/LoadingWidget"

const Gallery = ({ item }) => {
  // get module fields
  const { customFields } = item

  // set up gallery
  const [gallery, setGallery] = useState([])

  // set up visible images
  const [visible, setVisible] = useState(parseInt(customFields.photosToShow))

  // function to show more items
  const showMoreImages = () => {
    setVisible(prevValue => prevValue + parseInt(customFields.photosToLoad))
  }

  // set up loading
  const [loading, setLoading] = useState(true)

  // set up messaging
  const messages = {
    error:
      "We're sorry, we can't load the gallery at the moment. Please try again later.",
    loading: "Loading Gallery...",
  }

  // set initial message
  const [message, setMessage] = useState(messages.loading)

  // get gallery function
  const getGallery = async () => {
    try {
      // fetch gallery from agility
      const res = await fetch(
        `https://api.aglty.io/${process.env.GATSBY_AGILITY_GUID}/fetch/gallery/${customFields.gallery.galleryid}`,
        {
          headers: {
            Accept: "application/json",
            Apikey: `${process.env.GATSBY_AGILITY_API_KEY}`,
          },
        }
      )
      // get the data
      const data = await res.json()

      // set gallery
      setGallery(data.media)

      // set loading to false
      setLoading(false)
    } catch (error) {
      // log error
      console.error(error)
      // set loading back to true
      setLoading(true)
      // set message
      setMessage(messages.error)
    }
  }

  // use effect to run getGallery function once on component mount
  useEffect(() => {
    getGallery()
  }, [])

  // if loading, show loading widget
  if (loading) {
    return <LoadingWidget message={message} />
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {gallery.slice(0, visible).map((image, index) => (
          <AgilityImage image={image} key={index} layout="fullWidth" />
        ))}
      </div>
      {gallery.length > visible && (
        <div className="text-center mt-12">
          <button
            onClick={showMoreImages}
            className="bg-black text-white border-2 border-black text-sm mb-4 w-40 p-2 hover:bg-white hover:text-black transition ease-in-out duration-300 inline-block my-4"
          >
            {customFields.buttonLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery
