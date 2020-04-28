import React, { useState, useEffect, useRef } from 'react'
import './dropdown.styles.scss'
import './arrows.styles.scss'

const Dropdown = ({
  options,
  selectedOption,
  resetValue,
  onChange,
  buttonLabel,
  buttonIndicator,
  buttonIndicatorContent,
  buttonArrow,
  selectedOptionIcon,
  className,
  PreBuildOptions
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const refDropdown = useRef(null)
  const refButtonIndicator = useRef(null)

  useEffect(() => {
    if (showOptions) {
      document.addEventListener('click', handleClick)
      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [showOptions])

  const handleClick = (e) => {
    if (
      refDropdown &&
      refDropdown.current &&
      refDropdown.current.contains(e.target)
    ) {
      //return
    }

    setShowOptions(false)
  }

  const toggleOptions = (e) => {
    if (
      selectedOption &&
      refButtonIndicator &&
      refButtonIndicator.current &&
      refButtonIndicator.current.contains(e.target)
    ) {
      //return
    }
    setShowOptions(prevShowOptions => !prevShowOptions)
  }

  return (
    <div className={className}>
      <span onClick={e => toggleOptions(e)} className="dropdown-button">
        {buttonIndicator && (
          <span
            ref={refButtonIndicator}
            className={`dropdown-button-indicator ${
              selectedOption && selectedOption.length ? 'selected' : ''
            }`}
            onClick={e => toggleOptions(e)}
            //onClick={() => selectedOption && onChange(resetValue)}
          >
            {buttonIndicatorContent}
          </span>
        )}
        {buttonLabel && buttonLabel}
        {buttonArrow === 'double' && <span className="dropdown-double-arrow" />}
        {!buttonArrow && <span className={`dropdown-single-arrow ${showOptions ? 'selected' : ''}`}/>}
      </span>
      {showOptions && (
        <ul ref={refDropdown} className="dropdown-option-list">
          {PreBuildOptions?<PreBuildOptions />:options.map(option => (
            <li key={option.value}>
              <button
                className={`dropdown-option ${
                  selectedOption === option.value ||
                  (selectedOption &&
                    selectedOption.length &&
                    selectedOption.includes(option.value))
                    ? 'selected'
                    : ''
                }`}
                onClick={() => onChange(option)}
              >
                {option.icon}
                <span
                  style={{
                    opacity: selectedOption === option.value ? 1 : 0
                  }}
                >
                  {selectedOptionIcon}
                </span>

                {option.content}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown