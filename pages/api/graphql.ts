import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '../../graphql/schema';
import { createGraphqlContext } from '../../graphql/context';

const apolloServer = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: createGraphqlContext,
});
