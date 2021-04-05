import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"

const TeamMembers = ({ item }) => {
  // get module fields
  const { customFields } = item

  const data = useStaticQuery(graphql`
    query {
      teamMembers: allAgilityTeamMember(
        filter: {
          properties: {
            referenceName: { eq: "about_teammembers42_teammemb26761b" }
          }
        }
      ) {
        nodes {
          customFields {
            name
            position
            image {
              label
              url
            }
          }
        }
      }
    }
  `)

  // grab team members
  const teamMembers = data.teamMembers.nodes

  return (
    <div className="my-6">
      <h3 className="text-xl font-black uppercase mb-6">
        {customFields.title}
      </h3>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {teamMembers.map((teamMember, index) => (
          <div key={index}>
            <AgilityImage
              image={teamMember.customFields.image}
              layout="fullWidth"
              className="mb-2 filter-grayscale hover:filter-none"
            />
            <p className="font-black uppercase">
              {teamMember.customFields.name}
            </p>
            <p className="text-sm text-gray-500">
              {teamMember.customFields.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
// about_teammembers42_teammemb26761b

export default TeamMembers
