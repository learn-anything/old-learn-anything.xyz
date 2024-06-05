import { createJazzReactContext, DemoAuth } from "jazz-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import HomeAuthRoute from "./routes/HomeAuthRoute"
import TestRoute from "./routes/TestRoute"
import ProfileEditRoute from "./routes/ProfileEditRoute"
import Profile from "./components/Profile"
import { LaAccount } from "./schema"

const router = createBrowserRouter([
	{
		path: "/",
		// TODO: render HomePublic if not auth'd
		element: <HomeAuthRoute />,
	},
	{
		path: "/test",
		element: <TestRoute />,
	},
	{
		path: "/accounts/edit",
		element: <ProfileEditRoute />,
	},
	{
		// TODO: make dynamic routes
		path: `@$/{username}`,
		element: <Profile />,
	},
])

const Jazz = createJazzReactContext({
	auth: DemoAuth({
		appName: "Learn Anything",
		accountSchema: LaAccount,
		seedAccounts:
			import.meta.env.VITE_SEED_ACCOUNTS &&
			JSON.parse(import.meta.env.VITE_SEED_ACCOUNTS),
	}),
	peer: "wss://mesh.jazz.tools/?key=nikita@nikiv.dev",
})
export const { useAccount, useCoState } = Jazz

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Jazz.Provider>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Jazz.Provider>,
)
