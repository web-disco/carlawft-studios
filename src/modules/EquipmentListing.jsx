import React from "react"
import { renderHTML } from "../agility/utils"

const EquipmentListing = ({ item }) => {
  const { customFields } = item
  return (
    <div className="grid gap-4 mt-8 sm:grid-cols-2">
      <div>
        <h4 className="uppercase font-black">Audio</h4>
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={renderHTML(customFields.audioEquipment)}
        />
      </div>
      <div>
        <h4 className="uppercase font-black">Visual</h4>
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={renderHTML(customFields.visualEquipment)}
        />
      </div>
      <div>
        <h4 className="uppercase font-black">Event</h4>
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={renderHTML(customFields.eventEquipment)}
        />
      </div>
      <div>
        <h4 className="uppercase font-black">Facility</h4>
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={renderHTML(customFields.facilityEquipment)}
        />
      </div>
    </div>
  )
}

export default EquipmentListing
