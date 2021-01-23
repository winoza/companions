$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.form--register");
  const signUpEmail = $("input#email");
  const signUpPassword = $("input#new-user-password");
  const usernameInput = $("input#new-user");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: signUpEmail.val().trim(),
      displayName: usernameInput.val().trim(),
      password: signUpPassword.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.displayName, userData.password);
    signUpEmail.val("");
    usernameInput.val("")
    signUpPassword.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      displayName: username,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
