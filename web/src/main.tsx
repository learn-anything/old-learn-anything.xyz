import { createJazzReactContext, DemoAuth } from "jazz-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import GlobalTopicRoute from "./routes/GlobalTopicRoute"
import HomeAuthRoute from "./routes/HomeAuthRoute"
import ProfileRoute from "./routes/ProfileRoute"
import TestRoute from "./routes/TestRoute"
import { LaAccount } from "./schema"
import SettingsProfile from "./routes/SettingsProfile"

const router = createBrowserRouter([
	{
		path: "/",
		// TODO: render HomePublic if not auth'd
		element: <HomeAuthRoute />,
	},
	{
		path: "/@:username",
		element: <ProfileRoute />,
	},
	{
		path: "/:topic",
		element: <GlobalTopicRoute />,
	},
	{
		path: "/settings/profile",
		element: <SettingsProfile />,
	},
	// {
	// 	path: "*",
	// 	element: <HomeAuthRoute />,
	// },
	// {
	// 	path: "/@:username/:page-name",
	// 	element: <PersonalPageRoute />,
	// },
	// TODO: remove from prod (only available locally)
	{
		path: "/test",
		element: <TestRoute />,
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
