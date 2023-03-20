import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import StoreIcon from "@mui/icons-material/Store";


export const routes = [  {    title: "MAIN",    items: [      {        icon: <DashboardIcon className="icon" />,        label: "Dashboard",        to: "/"      }    ]
  },
  {
    title: "LISTS",
    items: [
      {
        icon: <PersonOutlineIcon className="icon" />,
        label: "Users",
        to: "/users"
      },
      {
        icon: <StoreIcon className="icon" />,
        label: "Products",
        to: "/products"
      },
      {
        icon: <CreditCardIcon className="icon" />,
        label: "Orders",
        to: "/orders"
      },
      {
        icon: <LocalShippingIcon className="icon" />,
        label: "Delivery",
        to: "/delivery"
      }
    ]
  },
  {
    title: "USEFUL",
    items: [
      {
        icon: <InsertChartIcon className="icon" />,
        label: "Stats",
        to: "/stats"
      },
      {
        icon: <NotificationsNoneIcon className="icon" />,
        label: "Notifications",
        to: "/notifications"
      }
    ]
  },
  {
    title: "SERVICE",
    items: [
      {
        icon: <SettingsSystemDaydreamOutlinedIcon className="icon" />,
        label: "System Health",
        to: "/system-health"
      },
      {
        icon: <PsychologyOutlinedIcon className="icon" />,
        label: "Logs",
        to: "/logs"
      },
      {
        icon: <SettingsApplicationsIcon className="icon" />,
        label: "Settings",
        to: "/settings"
      }
    ]
  },
  {
    title: "USER",
    items: [
      {
        icon: <AccountCircleOutlinedIcon className="icon" />,
        label: "Profile",
        to: "/profile"
      },
      {
        icon: <ExitToAppIcon className="icon" />,
        label: "Logout",
        to: "/logout"
      }
    ]
  }
];