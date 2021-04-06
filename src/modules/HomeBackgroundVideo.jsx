import React from "react"

const HomeBackgroundVideo = ({ item }) => {
  const { customFields } = item
  return (
    <video autoplay="autoplay" muted loop playsinline className="">
      <source src={customFields.video.url} type="video/mp4" />
    </video>
  )
}

export default HomeBackgroundVideo
