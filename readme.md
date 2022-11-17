# **Liferay Application Proccess**

> ## Specifications
In this challenge, you will be creating a Node.js express server that has two routes, one for uploading a file, and one for downloading a file.
This is a very open-ended challenge that allows you to express your knowledge of unit tests and stubbing, Node.js server-side
development, and basic Kubernetes and Docker concepts.
Treat this challenge as if you were writing production code. This means being forward-thinking and creating useful abstractions for things
that could change in the future.
Add a ReadMe to describe your code/process and how to test your solution.

> ## Requirements
1. Use the latest version of express.
2. Use the latest version of express-validator to validate and sanitize any input.

> ## Challenge
* PART - 1
1. Create two routes, one for uploading a file, and one for downloading a file.
a. The upload route should upload the file to a temp directory on the file system.
b. Likewise, create an implementation for downloading a file which reads from a temporary directory on the file system.
2. Both routes should take as a parameter the name of the file to upload/download.
3. Add necessary validations
a. The routes should only accept uploading/downloading a .gz file.
b. File existence should be validated upfront for downloading. If the file does not exist, we respond with an error.
c. If the file exists when uploading, continue but print a warning.
4. In general, provide helpful logging in the routes.

* PART - 2
1. Add a Dockerfile for your application.
2. Add a script to build your docker image and tag it with a stable tag.

* PART - 3 (Optional)
1. Add two scripts run-dev.sh and run-k8s.sh .
a. run-dev.sh should enable server-restarting on file changes with nodemon and not use docker or kubernetes.
b. run-k8s.sh should run your application with kubernetes.
2. On run-k8s.sh termination, the k8s resources should be cleaned up.

* PART- 4 (Optional)
1. Use a test framework of your choice (eg - jest , mocha and sinon ) to add test coverage that you think would be helpful.

* PART- 5 (Optional)
1. The k8s deployment should gracefully handle when kubernetes tries to kill it, responding promptly and gracefully allowing connections to
close naturally before the container is killed.
