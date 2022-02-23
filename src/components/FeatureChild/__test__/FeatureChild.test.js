import { render, screen, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import FeatureChild from "../FeatureChild"

const mockedStatus = jest.fn()

it("changes the value of checkbox", () => {
  act(() => {
    render(
      <FeatureChild
        feature="Users"
        maxQuantity={10}
        handleStatus={mockedStatus}
      />
    )
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox.checked).toEqual(false)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
  })
})
