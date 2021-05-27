import React, { useState } from "react"
import { format } from "date-fns"

const ServiceForm = ({ form, handleClose }) => {
  // set up date for formatting
  const [date, setDate] = useState("")
  const [sessionLength, setSessionLength] = useState("")
  return (
    <form
      name={form.customFields.name}
      method="POST"
      data-netlify="true"
      action="/thank-you"
      className="max-w-full md:max-w-lg mx-auto"
    >
      <input type="hidden" name="form-name" value={form.customFields.name} />
      <div className="">
        {form.customFields.fields.map((field, index) => {
          switch (field.customFields.type) {
            case "text":
              return (
                <label
                  className="block mb-8 text-xs uppercase font-bold"
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
                  className="block mb-8 text-xs uppercase font-bold"
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
                <>
                  <label
                    className="block mb-8 text-xs uppercase font-bold"
                    key={index}
                  >
                    <span className="block mb-2">
                      {field.customFields.label}{" "}
                      {field.customFields.required === "true" ? `*` : null}
                    </span>
                    <input
                      onChange={e =>
                        setDate(format(new Date(e.target.value), "PPPPp"))
                      }
                      required={
                        field.customFields.required === "true" ? `*` : null
                      }
                      type={field.customFields.type}
                      className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    />
                    <input hidden type="text" name="date" defaultValue={date} />
                  </label>
                </>
              )
            case "select":
              const selectChoices = field.customFields.choices.split("\r\n")
              return (
                <label
                  className="block mb-8 text-xs uppercase font-bold"
                  key={index}
                >
                  <span className="block mb-2">
                    {field.customFields.label}{" "}
                    {field.customFields.required === "true" ? `*` : null}
                  </span>
                  <select
                    onChange={e => setSessionLength(e.target.value)}
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
                  <input
                    hidden
                    type="text"
                    name={`${field.customFields.name}`}
                    defaultValue={sessionLength}
                  />
                </label>
              )
            case "textarea":
              return (
                <label
                  className="block mb-8 col-span-2 text-xs uppercase font-bold"
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
                    placeholder={field.customFields.placeholder}
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
  )
}

export default ServiceForm
