import React from "react"

const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      {/* <label htmlFor="optionPicker">{name}</label> */}
      <br></br>
      <select
        onChange={onChange}
        value={selected}
        className="w-full border-2 border-black"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default OptionPicker
