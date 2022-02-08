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
      id?: string
    }[]
  }[]
}

const Feature = ({ settings }: SettingsProps) => {
  //function to generate unique numbers
  const generateRandom = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  //add unique ids to all entries in the object
  const newVal = settings.map((val) => {
    if (Object.keys(val.children).length > 0) {
      for (const childVal in val.children) {
        const id = generateRandom()
        val.children[childVal].id = id
      }
    }
    const id = generateRandom()
    return { ...val, id }
  })

  const [values, setValues] = useState(newVal)
  console.log(values)

  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const featureId = event.target.value

    const val = [...values]
    const featureIndex = val.findIndex((ind) => ind.id === featureId)
    if (featureIndex !== -1) {
      val[featureIndex].status = isChecked

      //if parent status is false, change all children status to false
      if (isChecked === false) {
        if (val[featureIndex].quantity) val[featureIndex].quantity = 1
        val[featureIndex].children.forEach((child) => {
          return (child.status = false)
        })
      }
    } else {
      for (let i = 0; i < val.length; i++) {
        const child = val[i].children
        if (child.length > 0) {
          const foundIndex = child.findIndex((ind) => ind.id === featureId)
          if (foundIndex !== -1) {
            child[foundIndex].status = isChecked
            child[foundIndex].quantity = 1
          }
        }
      }
    }

    setValues(val)
  }

  const handleFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>,
    featureId?: string
  ) => {
    const val = [...values]
    const featureIndex = val.findIndex((ind) => ind.id === featureId)
    if (featureIndex !== -1) {
      val[featureIndex].quantity = Number(event.target.value)
    } else {
      for (let i = 0; i < val.length; i++) {
        const child = val[i].children
        if (child.length > 0) {
          const foundIndex = child.findIndex((ind) => ind.id === featureId)
          if (foundIndex !== -1) {
            child[foundIndex].quantity = Number(event.target.value)
          }
        }
      }
    }
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
                    id={setting.id}
                    handleStatus={handleStatus}
                    handleFrequency={(e) => handleFrequency(e, setting.id)}
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
                        id={child.id}
                        handleStatus={handleStatus}
                        handleFrequency={(e) => handleFrequency(e, child.id)}
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
