import Profile from "../components/Profile"
import Sidebar from "../components/Sidebar"
import { useParams } from "react-router-dom"

const ProfileRoute = () => {
	const { username } = useParams<{ username: string }>()

	if (!username) {
		return <div>Username is not found</div>
	}

	return (
		<>
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						<Sidebar />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
						<Profile username={username} />
					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileRoute
