import Map from './Map'
test ('Unit Test #1 — Querying the Database', function(){
    /*testing that the function correctly queries the DB */
let course = 'CICS208' //assigning the string we will query the database with to the variable 'course'
const response = queryDB(course) //calling the queryDB method with the variable 'course'
expect(response.data.courseInfo.Name).toBe('CICS 208 — Defending Democracy In a Digital World')
});

test ('Unit Test #2 — Testing the createNode() function', function(){
    /*testing that the function returns an object of the following format:
    id: courseInfo._id,
    name: courseInfo.Name,
    diamond: false,
    children: []
when it is called with a course that has no prerequisites */

//for this purpose, we will query the database for a class that has no prerequisites, such as CS208
let course = 'CICS208' //assigning the string we will query the database with to the variable 'course'
const response = queryDB(course) //calling the queryDB method with the variable 'course'
let obj = createNode(response.data.courseInfo)
expect(obj.id).toBe(response.data.courseInfo._id)
expect(obj.name).toBe(response.data.courseInfo.Name)
expect(obj.diamond).toBe(false)
expect(obj.children.length).toBe(0)
});

test ('Unit Test #3 — Testing the createNode() function', function(){
    //testing that the function pulls the correct prerequisite 
    //for this purpose, we will query the database for a class that has 1 prerequisite, such as ENGLWRIT112
let course = 'ENGLWRIT112' //assigning the string we will query the database with to the variable 'course'
const response = queryDB(course) //calling the queryDB method with the variable 'course'
let obj = createNode(response.data.courseInfo)
expect(obj.id).toBe(response.data.courseInfo._id)
expect(obj.name).toBe(response.data.courseInfo.Name)
expect(obj.diamond).toBe(false)
expect(obj.children.length).toBe(1)
expect(obj.children[0].name).toBe('ENGLWRIT111 — Writing, Identity and Power')
expect(obj.children[0].id).toBe('66143955e47687530035539a')
});

test ('Unit Test #4 — Querying the Database Incorrectly', function(){
    /*testing that when an incorrect query is passed, the queryDB() method prints an error message */
let course = 'CICS200' //this course doesn't exist
const response = queryDB(course) //calling the queryDB method with the variable 'course'
//it should print an error message to the console
});

test ('Unit Test #5 — Passing a wrong object to the createTree() function', function(){
    /*testing that when an incorrect query is passed,  */
    let obj = {attribute1: "Number One", attribute2: "Number Two"} //this object does not have an attribute called Prerequisites. Thus, when createTree() calls createNode(), which will attempt to access the .Prerequisites attribute, an error will be thrown
    //an error message to the console should be printed 
});


