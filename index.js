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

// 샘플 데이터
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
let photos = [
    {
        id: '1',
        name: 'hidkekekk',
        description: 'dkdkdkdkdkfnenf',
        category: 'ACTION',
        githubUser: 'gPlake',
    },
    {
        id: '2',
        name: 'sjkfneknwfk',
        description: 'kewjfkwjfk3k',
        category: 'SELFIE',
        githubUser: 'sSchmidt',
    },
    {
        id: '3',
        name: 'kewfkwejflk',
        description: 'jfewnfjnj33fj',
        category: 'LANDSCAPE',
        githubUser: 'sSchmidt',
    },
];

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
        url: parent => `https://yoursite.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        }
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => console.log(`GraphQL Service running on ${url}`))


let person = { name: 'jacob'};
console.log(person.name);
console.log(person.age);


