import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { useAccount } from "../main"

export const GlobalTopicRouteState = proxy({
	showView: "All",
	inputValue: "Testing",
	rotateIcon: false,
})

export default function GlobalTopicRoute() {
	const local = useProxy(GlobalTopicRouteState)
	const global = useAccount({}).me?.root
	if (!global) return <></>

	return (
		<>
			<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
				<Sidebar />
				<div className="p-2 w-full">
					<Topbar showView="Topics" setShowView={() => {}} />
				</div>
			</div>
		</>
	)
}
