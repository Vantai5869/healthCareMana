import { useQuery } from '@apollo/client';
import { GET_USERS } from "../../gql/users.gql";

export default function useUserList(){
    
    const { loading, error, data } = useQuery(GET_USERS);
    console.log({hhhhh:data})


    return { loading, error, data}
}
