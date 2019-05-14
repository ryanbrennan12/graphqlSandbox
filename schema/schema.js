//Entire purpose of this schema file is to file is to
//...instruct graphql about what TYPE OF DATA we have in our application

//defines the first TYPE OF DATA in our application....
//- TYPE OF DATA = USERTYPE
//tells GQL that our application has a concept of a user and each user has
//.. an id, a FN, and an age
//all of the knowledge required to for telliing
//graphQL exactly what your application's data looks like

//ie : what properties each object has
// and exactly how each object is related to eachother

//somehow now want to communicate to graphql that we have the idea of a
//a USER and the user has an id and a first name

const graphql = require('graphql');
//"from this object we are going to be destructuring a lot of different properties"
const _ = require('lodash');
//destructuring from the graphQL library
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
  //GraphQLSchema takes in a root query and returns a GraphQLSchema  instance
} = graphql;

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Ryan', age: 77 }
]
//So we are going to use GraphQLObjectType to instruct
// . . . graphql about the presence of a USER in our application
//..like the idea of a user; a user that has an id and a first name property
//
//1) create a new object that instructs graphQL about what a USER OBJECT looks like
// ..like what properties it is supposed to have.
//TWO required properties
// 1) name: name property will always be a string that describes the type we are defining
// this will usually be equal to whatever we call this type
// 2) fields property which is an object. MOST IMPORTANT property.  It is what tells
//...graphql about all the different properties that a USER HAS
//the keys to this object are the names of the properties the user has
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});
//now we instructed GQL that every single user will have an id, FN, and age
//we have to use built in types like GraphQLString

//ROOT QUERY allows GQL to JUMP in to our application's data graph on a very specific node
// - Entry point into our data
//read the following as : "You can ask me, the Root Query about Users in the application"
// ..if you give me the ID of the user you are looking for, I will return a user back to you
//ROOT query has expectation of getting the id
//THIS QUERY GETS SENT TO OUR ROOTQUERYTYPE
  //1) it then takes that query and enters into our graph of data
  //2) BC we specified USER as the field of the query, the root query went and found the
  //user key inside of its fields object
  //3) we specified in that fields object that the query should come with an id that is a type String
  //4) Graph ql then plucks off the object returned in the resolve function,
   //   a) the id, firstname, and age
//{
//   user(id : "23") {
//     id
//     firstName
//     age
//   }
// }


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType, // 2) then I give you this
      args: { id: { type: GraphQLString } }, // 1) if you give me this
      //arguments required for this root query
      resolve(parentValue, args) {
        //return raw json here and graphql takes care of the rest
        //resolve must return data that represents a user object
        return _.find(users, { id: args.id });
        //need to make an HTTP request in here and return the promise that it generates
      }
    }
  }
});
//GraphQLSchema takes in a root query and returns a GraphQLSchema instance
//now want to export newly created GraphQLSchema
//i'll pass to it an object that has

module.exports = new GraphQLSchema({
  query: RootQuery
});
//resolve function- very importanat function in GQL. The purpose is ..
//..."Oh, you are looking for a user with an id of 23? Ok, I will do my best to resolve it"
//THE RESOLVE FUNCTION GOES INTO THE DATABASE!!!

//everything up to this point has been tells us what our DATA LOOKS LIKE
//so resolve function's job is to go out and get that real data
// parentValue is bullshit, args, however is an object that gets called with whatever arguments
//. . . where passed into the ORIGINAL QUERY

//our browser is running graphiql and it is sending a graphql query to our express server

//ship it back to our graphical client