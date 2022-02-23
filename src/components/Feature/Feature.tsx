import React, { Dispatch, SetStateAction, useCallback } from "react"

//components
import FeatureChild from "../FeatureChild/FeatureChild"

//types
import { FeatureType } from "./Feature.types"

//styles
import "./Feature.scss"

type SettingsProps = {
  defaultValue: FeatureType[]
  getValue: Dispatch<SetStateAction<FeatureType[]>>
}

const Feature = ({ defaultValue, getValue }: SettingsProps) => {
  const handleParentStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, feature: string) => {
      const isChecked = event.target.checked
      if (defaultValue.length > 0) {
        const val = defaultValue.map((value) => {
          if (value.feature === feature) {
            value.status = isChecked
            if (!isChecked && value.children) {
              value.children.map((childValue) => {
                childValue.status = false
                childValue.quantity = 0
                return childValue
              })
              value.quantity = 0
            }
          }
          return value
        })
        getValue(val)
      }
    },
    [defaultValue, getValue]
  )

  const handleChildrenStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, feature: string) => {
      const isChecked = event.target.checked
      const val = defaultValue.map((value) => {
        if (value.children) {
          value.children.map((childValue) => {
            if (childValue.feature === feature) {
              childValue.status = isChecked
            }
            return childValue
          })
        }
        return value
      })
      getValue(val)
    },
    [defaultValue, getValue]
  )

  const handleParentFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>,
    feature: string
  ) => {
    const val = defaultValue.map((value) => {
      if (value.feature === feature) {
        value.quantity = Number(event.target.value)
      }
      return value
    })
    getValue(val)
  }

  const handleChildrenFrequency = (
    event: React.ChangeEvent<HTMLSelectElement>,
    feature: string
  ) => {
    const freq = Number(event.target.value)
    const value = defaultValue.map((v) => {
      if (v.children) {
        v.children.map((childValue) => {
          if (childValue.feature === feature) {
            childValue.quantity = freq
          }
          return childValue
        })
      }
      return v
    })
    getValue(value)
  }

  return (
    <div className="feature-parent" data-testid="feature">
      <div>
        <div className="feature">
          {defaultValue &&
            defaultValue.map((setting, index) => (
              <React.Fragment key={index}>
                <div
                  className={setting.children ? "top-split" : "top-no-split"}
                >
                  <FeatureChild
                    feature={setting.feature}
                    status={setting.status}
                    maxQuantity={setting.maxQuantity}
                    handleStatus={(e) => handleParentStatus(e, setting.feature)}
                    handleFrequency={(e) =>
                      handleParentFrequency(e, setting.feature)
                    }
                  />
                  {setting.children && (
                    <div className="top-arrow">
                      {setting.status ? (
                        <i className="arrow arrow-up"></i>
                      ) : (
                        <i className="arrow arrow-down"></i>
                      )}
                    </div>
                  )}
                </div>
                {setting.status &&
                  setting.children &&
                  setting.children.map((child, index) => (
                    <div className="bottom" key={index}>
                      <FeatureChild
                        feature={child.feature}
                        status={child.status}
                        maxQuantity={child.maxQuantity}
                        handleStatus={(e) =>
                          handleChildrenStatus(e, child.feature)
                        }
                        handleFrequency={(e) =>
                          handleChildrenFrequency(e, child.feature)
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

export default React.memo(Feature)
