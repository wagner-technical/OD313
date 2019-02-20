import React from 'react'

const Checkbox = ({name, town, checked, onChange}) => {
  return (
    <div
      className="checkbox"
    >
      <div 
        className={`${checked ? 'checked' : 'unchecked'}`} 
        onClick={town ? () => onChange(name, town) : () => onChange(name)}
      />
      <div 
        className={`${checked ? 'name-checked' : 'name-unchecked'}`}
        onClick={town ? () => onChange(name, town) : () => onChange(name)}
      >
        {name}
      </div>
    </div>
  )
}

export default Checkbox
