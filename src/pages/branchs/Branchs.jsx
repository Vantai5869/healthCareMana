import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import useUserList from "../../stores/actions/users"
import { useEffect, useState } from "react"

const Branchs = () => {
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

export default Branchs