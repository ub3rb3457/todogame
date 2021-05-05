import React from "react"
import { navigate } from "hookrouter"
import { AuthConfig } from "react-use-auth"
import { Auth0 } from "react-use-auth/auth0"
const AuthProvider = ({ element }) => (
  <>
    <AuthConfig
        navigate={navigate}
        authProvider={Auth0}
        params={{
            domain: "useauth.auth0.com",
            clientID: "PL3Nkd31ItdYj1bUnRuUW9nBoiTCiKf2"
        }}
    />
    {element}
  </>
)
export default AuthProvider