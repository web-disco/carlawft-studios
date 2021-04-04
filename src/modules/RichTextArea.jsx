import React from "react"
import { renderHTML } from "../agility/utils"

const RichTextArea = ({ item }) => {
  return (
    <section className="container">
      <div
        className="prose max-w-full mx-auto"
        dangerouslySetInnerHTML={renderHTML(item.customFields.textblob)}
      ></div>
    </section>
  )
}

export default RichTextArea
