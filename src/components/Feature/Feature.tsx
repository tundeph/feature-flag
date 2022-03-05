import React, { Dispatch, SetStateAction, useCallback } from "react"

//components
import FeatureChild from "../FeatureChild/FeatureChild"

//types
import { FeatureType } from "./Feature.types"

//styles
import "./Feature.scss"

interface SettingsProps {
  defaultValue: FeatureType[]
  getValue: Dispatch<SetStateAction<FeatureType[]>>
}

interface makeChangeProps {
  (
    array: any[],
    feature: string,
    property: string,
    value: number | string | boolean
  ): FeatureType[]
}

interface handleStatusProps {
  (event: React.ChangeEvent<HTMLInputElement>, feature: string): any
}

interface handleFrequencyProps {
  (event: React.ChangeEvent<HTMLSelectElement>, feature: string): any
}

const Feature = ({ defaultValue, getValue }: SettingsProps) => {
  //helper function to change prop values
  const makeChange: makeChangeProps = (array, feature, property, value) => {
    const ret = array.map((childValue) => {
      if (childValue.children) {
        makeChange(childValue.children, feature, property, value)
      }

      if (childValue.feature === feature) {
        childValue[property] = value

        if (property === "status" && !value) {
          childValue.quantity = 0
          if (childValue.children) {
            childValue.children.map(
              (child: { status: boolean; quantity: number }) => {
                child.status = false
                child.quantity = 0
                return child
              }
            )
          }
        }
      }
      return childValue
    })

    return ret
  }

  const handleStatus: handleStatusProps = (event, feature) => {
    const isChecked = event.target.checked
    if (defaultValue.length > 0) {
      const val = makeChange(defaultValue, feature, "status", isChecked)
      getValue(val)
    }
  }
  const handleFrequency: handleFrequencyProps = (event, feature) => {
    const newVal = Number(event.target.value)
    const val = makeChange(defaultValue, feature, "quantity", newVal)
    getValue(val)
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
                    handleStatus={(e) => handleStatus(e, setting.feature)}
                    handleFrequency={(e) => handleFrequency(e, setting.feature)}
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
                        handleStatus={(e) => handleStatus(e, child.feature)}
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

export default React.memo(Feature)
