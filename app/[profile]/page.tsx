"use client"
import { useObservable } from "@legendapp/state/react"
import ProfileRoute from "@/components/routes/ProfileRoute"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

export default function Profile() {
	const showView = useObservable<"All" | "Links" | "Todos" | "Topics">("All")

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-1">
				<div className="w-1/6">
					<Sidebar personalPages={[]} />
				</div>
				<div className="flex-1 flex flex-col border-2 border-neutral-900 rounded-lg m-4">
					<Topbar showView={showView} />
					<ProfileRoute />
				</div>
			</div>
		</div>
	)
}
