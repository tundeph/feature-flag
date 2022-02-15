import React, { useState } from "react"
import { FeatureChild } from "./FeatureChild"
import "./Feature.scss"

type SettingsProps = {
  settings: {
    feature: string
    status: boolean
    quantity?: number
    maxQuantity?: number
    children: {
      feature: string
      status: boolean
      quantity?: number
      maxQuantity?: number
    }[]
  }[]
}

const Feature = ({ settings }: SettingsProps) => {
  const [values, setValues] = useState(settings)
  console.log(values)

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const featureId = event.target.value

    const val = values.map((value) => {
      if (value.children.length > 0) {
        value.children.map((childValue) => {
          if (childValue.feature === featureId) {
            childValue.status = isChecked
          }
          return childValue
        })
      }

      if (value.feature === featureId) {
        value.status = isChecked
        if (!isChecked) {
          value.children.map((childValue) => {
            childValue.status = false
            return childValue
          })
        }
      }
      return value
    })
    setValues(val)
  }

  const handleFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>,
    featureId?: string
  ) => {
    const val = values.map((value) => {
      if (value.children.length > 0) {
        value.children.map((childValue) => {
          if (childValue.feature === featureId) {
            childValue.quantity = Number(event.target.value)
          }
          return childValue
        })
      }

      if (value.feature === featureId) {
        value.quantity = Number(event.target.value)
      }
      return value
    })

    setValues(val)
  }

  return (
    <div className="feature-parent ">
      <div>
        <div className="feature">
          {settings &&
            values.map((setting, index) => (
              <React.Fragment key={index}>
                <div
                  className={
                    setting.children.length > 0 ? "top-split" : "top-no-split"
                  }
                >
                  <FeatureChild
                    feature={setting.feature}
                    status={setting.status}
                    maxQuantity={setting.maxQuantity}
                    handleStatus={handleStatus}
                    handleFrequency={(e) => handleFrequency(e, setting.feature)}
                  />
                  {setting.children.length > 0 && (
                    <div className="top-arrow">
                      <i className="arrow arrow-down"></i>
                    </div>
                  )}
                </div>
                {setting.status &&
                  setting.children.length > 0 &&
                  setting.children.map((child, index) => (
                    <div className="bottom" key={index}>
                      <FeatureChild
                        feature={child.feature}
                        status={child.status}
                        maxQuantity={child.maxQuantity}
                        handleStatus={handleStatus}
                        handleFrequency={(e) =>
                          handleFrequency(e, child.feature)
                        }
                      />
                    </div>
                  ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Feature
