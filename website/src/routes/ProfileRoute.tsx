import Profile from "../components/Profile"
import Sidebar from "../components/Sidebar"

export default function ProfileRoute() {
	return (
		<>
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						<Sidebar personalPages={[]} />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
						<Profile />
					</div>
				</div>
			</div>
		</>
	)
}
