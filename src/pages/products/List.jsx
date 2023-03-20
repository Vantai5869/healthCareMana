import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import useUserList from "../../stores/actions/users"
import { useEffect, useState } from "react"

const List = () => {
  const [userList, setUserList] = useState([])
  const {data}=useUserList();
  console.log('====================================');
  console.log({data});
  console.log('====================================');
  // if(data){
    // const tmp = data?.getUsers?.edges?.map(i=>i.node)
    // console.log('====================================');
    // console.log({tmp});

    // if(tmp) setUserList(tmp)

    useEffect(() => {
      const tmp = data?.getUsers?.edges?.map(i=>i.node)
      if(tmp) setUserList(tmp)
    }, [data])
    console.log('====================================');
    // setUserList(tmp)
  // }
  console.log('====================================');
  console.log({userList});
  console.log('====================================');
  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable users={[]} aa="xxxxxxxxxxx" />
      </div>
    </div>
  )
}

export default List