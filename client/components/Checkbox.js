import React from 'react'

const Checkbox = ({name, town, checked, onChange}) => {

  return (
    <div className='checkbox'
      onClick={
        town 
          ? () => onChange(name, town)
          : () => onChange(name)
      }
    >
      <div 
        className={`${checked ? 'checked' : 'unchecked'}`}

      />
      <div className={`${checked ? 'name-checked' : 'name-unchecked'}`}>{name}</div>
    </div>
  )
}

export default Checkbox