import React from "react"

const HomeBackgroundVideo = ({ item }) => {
  const { customFields } = item
  return (
    <>
    <video autoplay="autoplay" muted loop playsinline className="">
      <source src={customFields.video.url} type="video/mp4" />
    </video>
    <form
      name="contact"
      method="post"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />  
      <input type="text" name="name" />
      <button type="submit">submit</button>
    </form>
    </>
  )
}

export default HomeBackgroundVideo
