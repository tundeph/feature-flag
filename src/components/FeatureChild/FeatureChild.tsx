import React from "react"
import "./FeatureChild.scss"

type FeatureProps = {
  feature: string
  status: boolean
  maxQuantity: number
  handleStatus: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFrequency: (
    event: React.ChangeEvent<HTMLSelectElement>,
    feature: string
  ) => void
}

const FeatureChild = ({
  feature,
  status,
  maxQuantity,
  handleStatus,
  handleFrequency,
}: FeatureProps) => {
  const rows: number[] = Array.from(Array(maxQuantity + 1).keys())

  return (
    <div className="box">
      <div className="parent">
        <span> {feature.toUpperCase()} </span>
        <span>
          {maxQuantity > 0 && (
            <select
              onChange={(event) => handleFrequency(event, feature)}
              disabled={!status}
              value={!status ? 0 : undefined}
            >
              {rows.map((qty) => (
                <option key={qty}> {qty}</option>
              ))}
            </select>
          )}
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleStatus}
              checked={status}
              value={feature}
            />
            <span className="slider round"></span>
          </label>
        </span>
      </div>
    </div>
  )
}

export default React.memo(FeatureChild)
