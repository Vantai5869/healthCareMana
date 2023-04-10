import { useEffect, useState } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import useUserList from "../../stores/actions/users"
import "./list.scss"

const UsersList = () => {
  const [userList, setUserList] = useState([])
  const {data}=useUserList();
 
  useEffect(() => {
    const tmp = data?.getUsers?.edges?.map(i=>i.node)
    if(tmp) setUserList(tmp)
  }, [data])
 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable users={userList} />
      </div>
    </div>
  )
}

export default UsersList