import Feature from "../components/Feature/Feature"
import "./Settings.scss"

const caseManagement = [
  {
    feature: "Case Management",
    status: false,
    children: [],
  },
]

const notifications = [
  {
    feature: "Notifications",
    status: false,
    children: [],
  },
]

const settings = [
  {
    feature: "Audit Log",
    status: false,
    children: [],
  },
  {
    feature: "Users",
    status: true,
    maxQuantity: 2,
    children: [
      { feature: "Users Add", status: false },
      { feature: "Users Delete", status: false },
      { feature: "Users Edit", status: false },
      { feature: "Max Users", status: false, maxQuantity: 10 },
    ],
  },
]

const alerts = [
  {
    feature: "Users",
    status: true,
    maxQuantity: 2,
    children: [
      { feature: "Users Add", status: false },
      { feature: "Users Delete", status: false },
      { feature: "Users Edit", status: false },
      { feature: "Max Users", status: false, maxQuantity: 10 },
    ],
  },
]

const Settings = () => {
  return (
    <div className="settings">
      <div>
        <p> GENERAL </p>
        <Feature settings={caseManagement} />
        <Feature settings={notifications} />
      </div>
      <div>
        <p> SETTINGS </p>
        <Feature settings={settings} />
      </div>

      <div>
        <p>ALERTS </p>
        <Feature settings={alerts} />
      </div>
    </div>
  )
}

export default Settings
