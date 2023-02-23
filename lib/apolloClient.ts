import { TOKEN } from '@/utils/constants';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type UriMappingType = {
  [key: string]: string;
};

const uriMapping: UriMappingType = {
  development: 'http://localhost:3000',
  production: 'https://apollo-graphql-blogify.vercel.app',
};

const httpLink = createHttpLink({
  uri: `${uriMapping[process.env.NEXT_PUBLIC_ENV as string]}/api/graphql`,
});

const authLink = setContext((_request, { headers }) => {
  const token = localStorage.getItem(TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
