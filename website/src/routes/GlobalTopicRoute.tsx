import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import GlobalTopicTopbar from "../components/GlobalTopicTopbar"
import { useAccount } from "../main"

export const Props = proxy({
	showView: "All",
	inputValue: "Testing",
	rotateIcon: false,
})

export default function GlobalTopicRoute() {
	const local = useProxy(Props)
	const global = useAccount({}).me?.root
	if (!global) return <></>

	return (
		<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
			<div className="w-1/6">
				<Sidebar />
			</div>
			<div className="p-2 w-5/6">
				<GlobalTopicTopbar />
				<div> {/* Дополнительный div, если нужен */}</div>
			</div>
		</div>
	)
}
