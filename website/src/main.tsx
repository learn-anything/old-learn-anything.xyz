import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createJazzReactContext, DemoAuth } from "jazz-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import InboxPage from "./routes/Inbox"
import { LAAccount } from "./schema"

const router = createBrowserRouter([
	{
		path: "/",
		element: <InboxPage />,
	},
])

const Jazz = createJazzReactContext({
	auth: DemoAuth({ appName: "Learn Anything", accountSchema: LAAccount }),
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
