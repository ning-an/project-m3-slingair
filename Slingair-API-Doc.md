# The Slingair API
​
The base url of the API is `https://journeyedu.herokuapp.com`.
​
## Usage
​
Use the [request-promise](https://www.npmjs.com/package/request-promise) module to make requests to this API. Take some time to read the their docs. (_Note that this module, and the `request` module are deprecated but still very much relevant and in-use. You can read about it [here](https://github.com/request/request/issues/3142)._)
​
This API follows the REST principles.
​
### Note
​
Keep in mind, that this API is on a free heroku instance, and as such the first call of the day will fail as it triggers the service to spin up.
​
### Persistence
​
There is data persistence for this API. Changes you make will remain. In fact, the changes of all other users will be visible to you. At some point, the instructor may do a _data reset_, in which case all of the data you submitted will be deleted.
​
## List of Endpoints
​
| Method | Endpoint                          | Description                                                                                                                                                |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/slingair/flights`               | returns an array of flight numbers                                                                                                                         |
| `GET`  | `/slingair/flights/:flight`       | returns info on a specific flight                                                                                                                          |
| `GET`  | `/slingair/flights/:flight/:seat` | returns info on a specific seat                                                                                                                            |
| `GET`  | `/slingair/users`                 | returns an array of all users. Accepts query params of `limit` and `start` for pagination. \_If values are not provided, it will return the first 10 users |
| `GET`  | `/slingair/users/:userId`         | returns the user object based on the userId (you can also pass an email instead of a userId)                                                               |
| `POST` | `/slingair/users`                 | creates a new user/reservation                                                                                                                             |
​
### API Response
​
The API will always provide a response. :P
​
## Examples
​
_...coming soon... ...maybe._