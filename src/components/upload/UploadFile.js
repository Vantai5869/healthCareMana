import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadSingleFiles(file: $file, folder:"test") {
      url
    }
  }
`;

function UploadFile() {
  const [mutate,{data, error}] = useMutation(MUTATION);
  if(error) console.log({error})
  if(data) console.log({data})
  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid) {
      console.log({file})
      mutate({ variables: { file } })
    };
  }

  return <input type="file" required onChange={onChange} />;
}
export default UploadFile;