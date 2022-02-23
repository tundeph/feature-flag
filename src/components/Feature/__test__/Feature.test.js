import { render, screen } from "@testing-library/react"
//import { useState } from "react"
import Feature from "../Feature"

// const initialSettings = [
//   {
//     feature: "Audit Log",
//     status: false,
//     maxQuantity: 0,
//     children: [],
//   },
//   {
//     feature: "Users",
//     status: true,
//     maxQuantity: 2,
//     children: [
//       { feature: "Users Add", status: false, maxQuantity: 0 },
//       { feature: "Users Delete", status: false, maxQuantity: 0 },
//       { feature: "Users Edit", status: false, maxQuantity: 0 },
//       { feature: "Max Users", status: false, maxQuantity: 10 },
//     ],
//   },
// ]

// const [settings, setSettings] = useState(initialSettings)

describe("Feature Component", () => {
  test("confirm the component shows", () => {
    render(<Feature />)
    const feature = screen.getByTestId("feature")
    expect(feature).toBeTruthy()
  })
})
