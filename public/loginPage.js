const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, (request) => {
    if(request.success){
      location.reload();
    } else {
      userForm.setLoginErrorMessage(request.error);
    }
  })
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, (request) => {
    if(request.success){
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(request.error);
    }
  })
}
