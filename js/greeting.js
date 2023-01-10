//What I have to do in this file
// 1. When I submit the form(not clicking the button!), the form should be gone
// 2. And after that, the greeting should shown to the users.
// 3. The user-typed input should be saved in the local storage.

const loginForm = document.querySelector("#login-form");
// The is the login form
const loginInput = document.querySelector("#login-input");
// this is the name typed by the user
const greeting = document.querySelector("#greeting");
// This is the greeting that should be shown to the user after logging in
const HIDDEN_CLASS = "hidden";
const USERNAME_KEY = "username";
// I should make the repeated string into a variable.

function handleLoginSubmit(e) {
  e.preventDefault(); // the form shouldn't refresh itself
  loginForm.classList.add(HIDDEN_CLASS); // hiding the login form
  const username = loginInput.value; // QUESTION: 왜 document.querySelector("username")

  // 이름이 저장되어서 새로고침 하더라도 표시되어야 함.
  localStorage.setItem(USERNAME_KEY, username);

  // 여기부터는 greeting 표시해 주기
  paintGreetings(username);
}

loginForm.addEventListener("submit", handleLoginSubmit);

// 1. 저장된 이름이 없을 경우 - login form을 표시
// 2. 저장된 이름이 없을 경우 - 바로 greeting 표시
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASS); // QUESTION - WHY I NEED THIS LINE?
  loginForm.addEventListener("submit", handleLoginSubmit);
} else {
  loginForm.classList.add(HIDDEN_CLASS);
  paintGreetings(savedUserName); // QUESTION: DO I HAVE TO PUT THE ARGUMENT HERE?
}

/*
greetingArrays = [
  "Go do something productive",
  "I think you're supposed to do something",
  "Don't you want to do somehitng"
]
*/

function paintGreetings(username) {
  greeting.innerText = `Hello, ${username}!`;
  greeting.classList.remove(HIDDEN_CLASS);
}
// Greeting 표시해 주는 함수

// 우선 여기까지는 잘 작동함

/////////////////
// 시간에 따라서 greeting을 다르게 표시하고 싶다면?
