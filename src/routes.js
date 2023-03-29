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
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import UsersList from "./pages/users/Users";
import Single from "./pages/single/Single";

export const routes = [
  {
    title: "MAIN", items: [{ icon: <DashboardIcon className="icon" />, label: "Dashboard", to: "/" }]
  },
  {
    title: "LISTS",
    items: [
      {
        icon: <PersonOutlineIcon className="icon" />,
        label: "Người dùng",
        to: "/users",
        auth: 'super_admin',
        children: [
          {
            "index": true,
            "element": <UsersList />
          },
          {
            "path": ":userId",
            "element": <Single />
          },
          {
            "path": "new",
            "element": {
              "<New />": {
                "inputs": "userInputs",
                "title": "Add New User"
              }
            }
          }
        ]
      },
      {
        icon: <RoomServiceOutlinedIcon className="icon" />,
        label: "Quản lý chi nhánh",
        to: "/branch",
        auth: 'admin'
      },
      {
        icon: <RoomServiceOutlinedIcon className="icon" />,
        label: "Quản lý nhóm dịch vụ",
        to: "/service-group",
        auth: 'admin'
      },
      {
        icon: <RoomServiceOutlinedIcon className="icon" />,
        label: "Quản lý dịch vụ",
        to: "/service",
        auth: 'admin'
      },
 
      {
        icon: <StoreIcon className="icon" />,
        label: "Sản phẩm",
        to: "/products",
        auth: 'admin'
      },
      {
        icon: <CreditCardIcon className="icon" />,
        label: "Đơn hàng",
        to: "/orders",
        auth: 'admin'
      },
      {
        icon: <CreditCardIcon className="icon" />,
        label: "Nhân viên",
        to: "/staff",
        auth: 'admin'
      },
      {
        icon: <LocalShippingIcon className="icon" />,
        label: "Vận chuyển",
        to: "/delivery",
        auth: 'admin'
      }
    ]
  },
  {
    title: "USEFUL",
    items: [
      {
        icon: <InsertChartIcon className="icon" />,
        label: "Stats",
        to: "/stats",
        auth: 'admin'
      },
      {
        icon: <NotificationsNoneIcon className="icon" />,
        label: "Notifications",
        to: "/notifications",
        auth: 'admin'
      }
    ]
  },
  {
    title: "SERVICE",
    items: [
      {
        icon: <SettingsSystemDaydreamOutlinedIcon className="icon" />,
        label: "System Health",
        to: "/system-health",
        auth: 'admin'
      },
      {
        icon: <PsychologyOutlinedIcon className="icon" />,
        label: "Logs",
        to: "/logs",
        auth: 'admin'
      },
      {
        icon: <SettingsApplicationsIcon className="icon" />,
        label: "Settings",
        to: "/settings",
        auth: 'admin'
      }
    ]
  },
  {
    title: "USER",
    items: [
      {
        icon: <AccountCircleOutlinedIcon className="icon" />,
        label: "Profile",
        to: "/profile",
        auth: 'admin'
      },
      // {
      //   icon: <ExitToAppIcon className="icon" />,
      //   label: "Logout",
      //   to: "/logout",
      //   auth: 'admin'
      // }
    ]
  }
];