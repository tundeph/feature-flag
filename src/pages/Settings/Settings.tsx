import { useState } from "react"

//components
import Feature from "../../components/Feature/Feature"

//styles
import "./Settings.scss"

const initialCaseManagement = [
  {
    feature: "Case Management",
    status: false,
    maxQuantity: 0,
  },
]

const initialNotifications = [
  {
    feature: "Notifications",
    status: false,
    maxQuantity: 0,
  },
]

const initialSettings = [
  {
    feature: "Audit Log",
    status: false,
    maxQuantity: 0,
  },
  {
    feature: "Users",
    status: false,
    maxQuantity: 2,
    children: [
      { feature: "Users Add", status: false, maxQuantity: 0 },
      { feature: "Users Delete", status: false, maxQuantity: 0 },
      { feature: "Users Edit", status: false, maxQuantity: 0 },
      { feature: "Max Users", status: false, maxQuantity: 10 },
    ],
  },
]

const Settings = () => {
  const [caseManagement, setCaseManagement] = useState(initialCaseManagement)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [settings, setSettings] = useState(initialSettings)
  console.log({ caseManagement, notifications, settings })

  return (
    <div className="settings">
      <div>
        <p> GENERAL </p>
        <Feature defaultValue={caseManagement} getValue={setCaseManagement} />
        <Feature defaultValue={notifications} getValue={setNotifications} />
      </div>
      <div>
        <p> SETTINGS </p>
        <Feature defaultValue={settings} getValue={setSettings} />
      </div>
    </div>
  )
}

export default Settings
