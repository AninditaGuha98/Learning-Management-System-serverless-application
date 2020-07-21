def register_service(first_name, last_name, email, password, confirm_password, security_1, security_2):
    print("registration for user here")
    # Lambda function will encrypt and decrypt the password and send it to storage.

    flag = True
    if(flag==True):
        message = "User registered successfully"
    else:
        message = "User did not register"
    return True, message


def login_service(email, password, security_question):
    print("login service for user here")

    flag = True
    if(flag == True):
        message = "Login successfull"
    else:
        message = "Login unsuccessful"
    return True,message
