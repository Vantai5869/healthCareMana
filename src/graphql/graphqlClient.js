import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: 'http://3.1.79.226:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');

  // Thêm header Authorization nếu người dùng đã đăng nhập
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // Không thêm header Authorization nếu người dùng chưa đăng nhập
  return { headers };
});

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.result && networkError.result.code === 'ETIMEDOUT') {
    console.log('Request timed out');
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      timeout: 5000, // set timeout value in milliseconds
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
