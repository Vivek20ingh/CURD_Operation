# CRUD_Operation

Project is divided in Authentication Routes and models

Model
  UserSchema : which contain
                  email,passord,name,username,country and city

Authentication contain: 
      
     Registration  :registration of new user. email.id and username of each user is unique;
                   : password is encrypted using bcrypt
                   : http://localhost:3000/api/register
                   
      login        :    login of user using email and password. without login user cannot 
                        perform get,update and delete .
                   :    on login unique token is access and refresh token generate. we can 
                        access token for get,update and delete.
                   :    access token will expire after a set time which we can get from
                        posttoken which will generate another access token for set time.
                   :    user can perform only their id get update and delete.
                   :    http://localhost:3000/api/login
                   
      token        :   it will generate new access token when current access token will expire after set time for another set time.
                   :  http://localhost:3000/api/posttoken
                       
       
      Validation   :   validation of email, password,name,username,country,city that is require.
                   :   hapi/joi have used for valididation.
      
      verify       : verification of access token to perform get, update and delete
                   : jwt (jsonwebtoken) is used for verification)
                   
Routes contain: 

      Get          : after verification of access token user can get all details of user ie
                     name, username, city and country. User can get detail of only of its 
                     own id.
                    : http://localhost:3000/api/get  
                     
      Update      :  after verification of access token user can get all Update of user ie
                     password name, username, city and country. User can get detail of only of its own id.
                  :  password will update in encrypted form.
                  :  when username will update it will check when another user of with same
                     username exit or not. updation will be valid if new username is same as current user or new user don't exits in database.
                  :  during updation Validation is also done.
                  : http://localhost:3000/api/update
                 
      Delete      : after verification of access token user can get delete all its data.
                  : http://localhost:3000/api/delete
      
   During get, delete and update Validation is checked.
   
 
  env:  
  
      : data base url,secret token of access token and refresh token are kept in this so that know one can access it 
      : env files are put in .gitignore (Notes I have not made .gitignore file)
      
Dependencies:

     hapi/joi : for validation of email ,size of string, and required.
     
     bcrypt  : for password encryption of password.
     
     dotenv  : for keeping secret code.
     
     jsonwebtoken: for generating access and refresh token after login.
     
     nodemon     : for restarting server automatically
     
     mongoose    : for manganing database mongodb
    
                     
                     
                        
                       
                        
      
