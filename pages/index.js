import { useState } from "react";
import React from "react";
import Chat from ".//components/chat";
import Layout from ".//components/Layout";
import withSession from "../lib/session";

export default function Home({ user }) {

  const { userName, description } = user
  const [ join, setJoin ] = useState(true)
  const [ currentUser, setCurrentUser ] = useState(userName)

  return (
    <>
      <Layout title={`Chat de: ${userName}`} />
      <Chat user={userName}/>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  return {
    props: { user: req.session.get("user") }
  }

})