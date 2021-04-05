import React from "react"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { useStaticQuery, graphql } from "gatsby"

const ProjectListing = ({ item }) => {
  const data = useStaticQuery(graphql`
    query {
      projects: allAgilityProject {
        nodes {
          customFields {
            image {
              url
              label
            }
            link {
              href
              target
              text
            }
            subtext
            title
          }
        }
      }
    }
  `)

  // get projects
  const projects = data.projects.nodes

  if (projects.length <= 0) {
    return <p>projects coming soon...</p>
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
      {projects.map((project, index) => {
        if (project.customFields.link !== null) {
          return (
            <a
              href={project.customFields.link.href}
              title={project.customFields.link.text}
              target={project.customFields.link.target}
              key={index}
            >
              <div className="relative group">
                <div className="absolute w-full h-full z-20 flex flex-col items-center justify-center bg-transparent group-hover:bg-black group-hover:bg-opacity-75 transition ease-in-out duration-300">
                  <h3 className="text-transparent group-hover:text-white font-black mb-2">
                    {project.customFields.title}
                  </h3>
                  {project.customFields.subtext && (
                    <p className="text-transparent group-hover:text-white">
                      {project.customFields.subtext}
                    </p>
                  )}
                </div>
                <AgilityImage
                  image={project.customFields.image}
                  layout="fullWidth"
                />
              </div>
            </a>
          )
        } else {
          return (
            <div className="relative group" key={index}>
              <div className="absolute w-full h-full z-20 flex flex-col items-center justify-center bg-transparent group-hover:bg-black group-hover:bg-opacity-75 transition ease-in-out duration-300">
                <h3 className="text-transparent group-hover:text-white font-black mb-2">
                  {project.customFields.title}
                </h3>
                {project.customFields.subtext && (
                  <p className="text-transparent group-hover:text-white">
                    {project.customFields.subtext}
                  </p>
                )}
              </div>
              <AgilityImage
                image={project.customFields.image}
                layout="fullWidth"
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default ProjectListing
