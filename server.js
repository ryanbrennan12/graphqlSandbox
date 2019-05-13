const express = require('express');
//express is an http server
// glue/compatability layer/library
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');



const app = express();
const port = 4000;

//passing it an empty object/
//middlewares are tiny functions meant to modify/request when it comes through on an express server
//once we wire schema to the middleware, our graphql interface pops up
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Listening on ${port}`);

});