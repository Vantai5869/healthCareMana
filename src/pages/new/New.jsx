import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useCallback, useEffect, useState } from "react";
import UploadFile from "../../components/upload/UploadFile";
import LocationSelector from "../../components/addressSelect";
import useUploadFile from "../../stores/actions/useUpload";
import { ADD_USER } from "../../gql/addUser";
import { useMutation } from "@apollo/client";

const New = ({ inputs, title }) => {
  const [addUser,{data:addUserData,loading:loadingAddUser, error}] = useMutation(ADD_USER);
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState();
  const {upload, data} =useUploadFile();
  const handleSubmit=(e)=>{
    e.preventDefault()
    upload({ variables: { file } })
  }

  useEffect(() => {
   if(data){
    addUser({
      variables:{ data:{...formData, avatar: data.uploadSingleFiles.url}}
    })
   }
  }, [data])

  if(error) console.log({error})
  if(addUserData) console.log({addUserData})

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

const handleChangeAddress = useCallback(
    (e) => {
      setFormData({
        ...formData,
        ...e
      })

    },[formData])

console.log('====================================');
console.log({formData});
console.log('====================================');
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} name={input.name} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}

              {/* <UploadFile/> */}
              <LocationSelector onChangAddress={handleChangeAddress} />
              <button >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
