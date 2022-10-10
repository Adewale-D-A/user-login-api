# NODE JS User Authentication restAPI using AWS RDS(MySQL) and hosted on AWS Elastic Beanstalk <a href="http://user-login-api.us-east-1.elasticbeanstalk.com/" target="_blank">server endpoint</a>

### This Repository Contains An Express Server

**_Concepts Implemented in this project:_**

- [x] Database: `AWS Mysql DB`
- [x] FileStore: `AWS S3`
- [x] Authentication: `jwt`
- [x] Password Hashing: `bcrypt`

**_structure of config file_**

> const bucketCredentials = {
> signatureVersion: "\*\*",
> apiVersion: "\*\*\*\*-\*\*-\*\*",
> accessKeyId: "\*\*\*\*\*\*\*",
> secretAccessKey: "\*\*\*\*\*\*\*\*",
> };

> const secret_data = {
> host: "\*\*\*\*\*\*\*\*\",
> user: "\*\*\*",
> password: "\*\*\*\*\*",
> name: "\*\*\*\*\*\*",
> };
