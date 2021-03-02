const { ApolloServer, gql, UserInputError } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type product {
    name: String
    price: String
    category: [String]
  }

  type Mutation {
    updatePrice(name:String, price:String): product
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    product(name:String): product
  }
`;  

const products = [{
    name: "Ninetendo Switch",
    price: "11000",
    category: ["Console Game","Game"],
  },
  {
    name: "Rebel 300",
    price: "145000",
    category: ["Motorcycle"],
  },
  {
    name: "Macbook pro",
    price: "74900",
    category: ["Apple","Laptop"],
  }
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query:{
    product(parent, args, context, info){
      return products.find(product => product.name === args.name)
    }
  },
  Mutation:{ 
    updatePrice:async (parent, args, context, info)=>{
      const test =  products.find(product => product.name === args.name)
      if (test) {
        test.price = args.price 
      return test
      }
    }
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});