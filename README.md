## Running the service
1. Start the service from the console 
`npm start`
2. Send the post request with the size of matrix as a  path param
`localhost:3000/{size}`
 . Below is the url for the request to build a matrix with the size of 2000x2000 
 and to read an item from its rows and columns. Thus we load the V8 engine with 
 the task to see its limits and ability to allocate memory. Results can be seen in the logs. 
     > http://localhost:3000/2000
 3. Send the get request which calls simple log function. After a few calls, the logs show that 
there are more memory in the heap as node's garbage collector has cleaned up the memory from 
the previous load. 
    >http://localhost:3000