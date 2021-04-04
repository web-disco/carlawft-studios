import React from 'react'

const ServiceForm = ({ form, handleClose }) => {
  console.log(form)
  return (
    <form 
      style={{ maxWidth: '600px', margin: '0 auto' }}
      action="/thank-you" 
      name={form.customFields.title}    
      method="post"
      data-netlify="true"
      onSubmit="submit" 
    >
    <input type="hidden" name="form-name" value={form.customFields.title} />
    <div className="text-right mb-8">
      <button onClick={handleClose} className="text-xs uppercase font-bold">close</button>
    </div>
    <div className="sm:grid sm:grid-cols-2 sm:gap-4">
    {form.customFields.fields.map((field, index) => {
        switch (field.customFields.type) {
          case "text":
            return(
                <label className="block mb-4 text-xs uppercase font-bold" key={index}>
                  <span className="block mb-2">{field.customFields.label} {field.customFields.required ? `*` : null}</span>
                  <input required={field.customFields.required ? true : false} type={field.customFields.type} placeholder={field.customFields.placeholder} className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
                </label>
            )
          break;
          case "email":
            return(
              <label className="block mb-4 text-xs uppercase font-bold" key={index}>
                <span className="block mb-2">{field.customFields.label} {field.customFields.required ? `*` : null}</span>
                <input required={field.customFields.required ? true : false} type={field.customFields.type} className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
              </label>
            )
          break;
          case "datetime-local":
            return(
              <label className="block mb-4 text-xs uppercase font-bold" key={index}>
                <span className="block mb-2">{field.customFields.label} {field.customFields.required ? `*` : null}</span>
                <input required={field.customFields.required ? true : false} type={field.customFields.type} className="form-input block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
              </label>
            )
          break;
          case "select":
            const selectChoices = field.customFields.choices.split("\n")
            return(
            <label className="block mb-4 text-xs uppercase font-bold" key={index}>
              <span className="block mb-2">{field.customFields.label} {field.customFields.required ? `*` : null}</span>
              <select required={field.customFields.required ? true : false} className="form-select block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
              <option value="">Select one...</option>
                {selectChoices.map((choice, index) => (
                  <option key={index}>{choice}</option>
                ))}
              </select>
            </label>
            )
          break;
          case "textarea":
            return(
             <label className="block mb-4 col-span-2 text-xs uppercase font-bold" key={index}>
              <span className="block mb-2">{field.customFields.label} {field.customFields.required ? `*` : null}</span>
              <textarea className="form-textarea block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
             </label>
            )
          break;
          default:
            return null
        }
      })}
    </div>
    <button type="submit" className="w-full bg-black text-white text-xs uppercase font-bold border-2 border-black hover:bg-white hover:text-black p-2 transition ease-in-out duration-300 my-6">Submit</button>
  </form>
  )
}

export default ServiceForm
