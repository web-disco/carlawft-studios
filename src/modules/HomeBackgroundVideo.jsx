import React from "react"

const HomeBackgroundVideo = ({ item }) => {
  const { customFields } = item
  console.log(customFields)
  return (
    <video autoplay="autoplay" muted loop className="">
      <source src={customFields.video.url} type="video/mp4" />
    </video>
  )
}

export default HomeBackgroundVideo
