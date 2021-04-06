import React from "react"

const ServiceForm = ({ form, handleClose }) => {
  return (
    <>
    <div className="container mx-auto text-right mb-16">
    <button
      onClick={handleClose}
      className="text-xs uppercase font-bold"
    >
      close
    </button>
  </div>
  <form
    name={form.customFields.name}
    method="POST"
    data-netlify="true"
    action="/thank-you"
    style={{ maxWidth: "600px", margin: "0 auto" }}
  >
    <input
      type="hidden"
      name="form-name"
      value={form.customFields.name}
    />
    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
      {form.customFields.fields.map((field, index) => {
        switch (field.customFields.type) {
          case "text":
            return (
              <label
                className="block mb-4 text-xs uppercase font-bold"
                key={index}
              >
                <span className="block mb-2">
                  {field.customFields.label}{" "}
                  {field.customFields.required === "true" ? `*` : null}
                </span>
                <input
                  name={field.customFields.name}
                  required={
                    field.customFields.required === "true" ? `*` : null
                  }
                  type={field.customFields.type}
                  placeholder={field.customFields.placeholder}
                  className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
              </label>
            )
          case "email":
            return (
              <label
                className="block mb-4 text-xs uppercase font-bold"
                key={index}
              >
                <span className="block mb-2">
                  {field.customFields.label}{" "}
                  {field.customFields.required === "true" ? `*` : null}
                </span>
                <input
                  name={field.customFields.name}
                  required={
                    field.customFields.required === "true" ? `*` : null
                  }
                  type={field.customFields.type}
                  className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
              </label>
            )
          case "datetime-local":
            return (
              <label
                className="block mb-4 text-xs uppercase font-bold"
                key={index}
              >
                <span className="block mb-2">
                  {field.customFields.label}{" "}
                  {field.customFields.required === "true" ? `*` : null}
                </span>
                <input
                  name={field.customFields.name}
                  required={
                    field.customFields.required === "true" ? `*` : null
                  }
                  type={field.customFields.type}
                  className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
              </label>
            )
          case "select":
            const selectChoices = field.customFields.choices.split("\n")
            return (
              <label
                className="block mb-4 text-xs uppercase font-bold"
                key={index}
              >
                <span className="block mb-2">
                  {field.customFields.label}{" "}
                  {field.customFields.required === "true" ? `*` : null}
                </span>
                <select
                  name={`${field.customFields.name}[]`}
                  required={
                    field.customFields.required === "true" ? `*` : null
                  }
                  className="form-select block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                >
                  <option value="">Select one...</option>
                  {selectChoices.map((choice, index) => (
                    <option value={choice} key={index}>
                      {choice}
                    </option>
                  ))}
                </select>
              </label>
            )
          case "textarea":
            return (
              <label
                className="block mb-4 col-span-2 text-xs uppercase font-bold"
                key={index}
              >
                <span className="block mb-2">
                  {field.customFields.label}{" "}
                  {field.customFields.required === "true" ? `*` : null}
                </span>
                <textarea
                  required={
                    field.customFields.required === "true" ? `*` : null
                  }
                  name={field.customFields.name}
                  className="form-textarea block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                />
              </label>
            )
          default:
            return null
        }
      })}
    </div>
    <button
      type="submit"
      className="w-full bg-black text-white text-xs uppercase font-bold border-2 border-black hover:bg-white hover:text-black p-2 transition ease-in-out duration-300 my-6"
    >
      Submit
    </button>
  </form>
  </>
  )
}

export default ServiceForm
