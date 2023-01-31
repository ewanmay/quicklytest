import type { NextPage } from 'next'
import Router from 'next/router'

const Index: NextPage = () => {

  const navigateToInitialRoute = () => {
    Router.router?.push("/signin")
  }

  navigateToInitialRoute();
  return null;
}

export default Index
