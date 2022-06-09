import React from 'react'

const ToggleP2 = ( {toggleFunction}) => {
  return (
    <div className="mx-64">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-xl mx-2 text-orange-700">
                Pro Mode
              </span>
              <input
                type="checkbox"
                className="toggle"
                unchecked
                style={{ backgroundColor: "rgb(194,65,12" }}
                onClick= {toggleFunction}
              />
              <span className="label-text text-xl mx-2 text-orange-700">
                Yeet
              </span>
            </label>
          </div>
        </div>
  )
}

export default ToggleP2