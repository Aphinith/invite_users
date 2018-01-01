## Instructions

1. clone the repo: $git clone https://github.com/Aphinith/invite_users.git
2. cd into directory
3. open the index.html file with any browser
4. click on the "Choose File" button and select the customers.txt file from the same directory
5. clik the "Read File" button
6. all of the users that are within 100km of the Dublin office will be rendered
    1. all users will have a user id and corresponding names
    2. all users will be ordered by user id in ascending order

> My goal was to show the list of users in the simplest way possible. It is possible to do this with just front end code so that is what I decided to do. From a higher level overview, I knew the following must be done:
1. Get data from the file into a format that we can use (JSON data would need to be parsed)
2. Once parsed, we can then access the data to determine if any particular user meets the criteria to be invited using the formula provided.
3. Since we also want to render the users in a specfic order, and in our case in ascending order by user id, we will also need to store the user ids in an array (so we can sort) and the user objects in an object with the key as the user id and the value would be the user object itself. This will allow us to do an instant lookup of any users with just the user id.
4. Then we can simply sort the array of user ids, iterate through the array, and upon each iteration, get the user object and render the user id and name onto the DOM using jQuery (my goal was to also have a linear time complexity as its worst case scenario).

## Testing

From within the root directory:

```sh
npm install
npm test
```

> I used Mocha for testing purposes. I primarily tested the file itself as I thought that it was higher in importance for what we wanted to achieve.
The file was tested for:
1. Needs to be a text type file
2. Needs to be in JSON format so the data can be parsed successfully and accessed
3. Data needs to have the following information: user id, name, and latitude and longitude coordinates
4. Data will also need to be sorted by user id

