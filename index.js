const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
    }

    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput): Photo!
    }
`
let _id = 0;
let users= [
    {
        githubLogin: 'mHattrup',
        name: 'Mike Hattrup'
    },
    {
        githubLogin: 'gPlake',
        name: 'Glen Plake'
    },
    {
        githubLogin: 'sSchmidt',
        name: 'Scot Schmidt'
    },
]
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
                ...args.input
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