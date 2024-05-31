"use client"
import { useObservable } from "@legendapp/state/react"
import ProfileRoute from "@/components/routes/ProfileRoute"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

export default function Profile() {
	const showView = useObservable<"All" | "Links" | "Todos" | "Topics">("All")

	return (
		<div className="flex flex-col h-screen">
			<Topbar showView={showView} />
			<div className="flex flex-1">
				<Sidebar personalPages={[]} />
				<div className="flex-1">
					<ProfileRoute />
				</div>
			</div>
		</div>
	)
}
