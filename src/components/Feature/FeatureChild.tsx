import React from "react"
import "./FeatureChild.scss"

type FeatureProps = {
  feature: string
  status: boolean
  maxQuantity?: number
  id?: string
  handleStatus: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFrequency: (
    event: React.ChangeEvent<HTMLSelectElement>,
    id?: string
  ) => void
}

export const FeatureChild = ({
  feature,
  status,
  maxQuantity,
  handleStatus,
  handleFrequency,
}: FeatureProps) => {
  const rows: number[] = []
  if (maxQuantity) {
    for (let i = 1; i <= maxQuantity; i++) {
      rows[i - 1] = i
    }
  }

  return (
    <div className="box">
      <div className="parent">
        <span> {feature.toUpperCase()} </span>
        <span>
          {maxQuantity && (
            <select
              onChange={(event) => handleFrequency(event, feature)}
              disabled={!status}
              value={!status ? 1 : undefined}
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
