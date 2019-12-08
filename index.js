const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
`
let _id = 0;
let photos = [];

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto (parent, args) {
            let newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)
            return newPhoto;
        }
    },
    Photo: {
        url: parent => `https://yoursite.com/img/${parent.id}.jpg`
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => console.log(`GraphQL Service running on ${url}`))