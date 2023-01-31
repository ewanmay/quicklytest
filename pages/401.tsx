import type { NextPage } from 'next'
import Router from 'next/router'

// In the future we would want to redirect automatically + do some other checks

// const navigateToInitialRoute = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   if (token && user) {
//     Router.router?.push("/profile")
//   } else {
//     Router.router?.push("/signin")
//   }
// }

const Index: NextPage = () => {
  return <h1>You're not logged in silly billy</h1>;
}

export default Index
