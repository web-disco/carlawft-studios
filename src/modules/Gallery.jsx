import React, { useState } from "react"
import useSWR from "swr"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LoadingWidget from "../components/LoadingWidget"

const Gallery = ({ item }) => {
  // get module fields
  const { customFields } = item

  // fetcher for swr
  const fetcher = url =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        Apikey: `${process.env.GATSBY_AGILITY_API_KEY}`,
      },
    }).then(res => res.json())

  // using swr to cache our fetch
  const { data, error } = useSWR(
    `https://api.aglty.io/${process.env.GATSBY_AGILITY_GUID}/fetch/gallery/${customFields.gallery.galleryid}`,
    fetcher
  )

  // set up visible images
  const [visible, setVisible] = useState(parseInt(customFields.photosToShow))

  // function to show more items
  const showMoreImages = () => {
    setVisible(prevValue => prevValue + parseInt(customFields.photosToLoad))
  }

  // if error fetching gallery
  if (error) {
    return (
      <LoadingWidget message="We're sorry, we can't load the gallery at the moment. Please try again later." />
    )
  }

  // loading gallery
  if (!data) {
    return <LoadingWidget message="Loading Gallery..." />
  }

  // return gallery
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {data.media.slice(0, visible).map((image, index) => (
          <AgilityImage image={image} key={index} layout="fullWidth" />
        ))}
      </div>
      {data.media.length > visible && (
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
