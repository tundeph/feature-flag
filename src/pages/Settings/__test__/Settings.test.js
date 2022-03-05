
import { getByRole, render, screen } from "@testing-library/react"
import Settings from "../Settings"


it("slides to change settings value", () => {
  render(<Settings />)
  const inputElement = getByRole('checkbox', {target: {value: ''}})
  expect(linkElement).toBeInTheDocument()
})
