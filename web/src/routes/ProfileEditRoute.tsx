import ProfileEdit from "../components/ProfileEdit"
import Sidebar from "../components/Sidebar"

export default function ProfileEditRoute() {
	return (
		<>
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						{/* <Sidebar personalPages={[]} /> */}
						<Sidebar />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
						<ProfileEdit />
					</div>
				</div>
			</div>
		</>
	)
}
