import React from "react"

const HomeBackgroundVideo = ({ item }) => {
  const { customFields } = item

  return (
    <video autoPlay="autoplay" muted loop playsInline className="">
      <source src={customFields.video.url} type="video/mp4" />
    </video>
  )
}

export default HomeBackgroundVideo
