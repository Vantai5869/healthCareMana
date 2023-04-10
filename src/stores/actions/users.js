import { useQuery } from '@apollo/client';
import { GET_USERS } from "../../gql/users.gql";

export default function useUserList(){
    const { loading, error, data } = useQuery(GET_USERS);
    return { loading, error, data}
}
