import { gql, useMutation } from "@apollo/client";
import { MUTATION } from "../../gql/upload.gql";


function  useUploadFile() {
  const [upload,{data,loading, error}] = useMutation(MUTATION);
  if(error) console.log({error})
  if(data) console.log({data})

  return {upload, data, loading,error}
}
export default useUploadFile;