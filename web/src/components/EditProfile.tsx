import { icons } from "../components/Icons"

interface Props {
	username: string
}

interface ProfileStatsProps {
	number: number
	label: string
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ number, label }) => {
	return (
		<div className="text-center font-semibold">
			<p className="text-4xl text-white">{number}</p>
			<p className="text-[#878787]">{label}</p>
		</div>
	)
}

const EditProfile: React.FC<Props> = ({ username }) => {
	return (
		<div>
			<p className="text-2xl text-white/30 font-semibold h-[74px] p-[20px]">
				@{username}
			</p>
			<div className="flex flex-col items-center bg-inherit text-white pb-5 border-b border-neutral-900">
				<div className="flex align-top w-full max-w-2xl">
					<div className="w-[130px] h-[130px] bg-[#222222] rounded-md mr-3" />
					<div className="ml-6 flex-1">
						<p className="text-[25px] font-semibold mb-3">Username Username</p>
						<div className="text-white text-[24] font-light mb-1 flex flex-row">
							<icons.Link />
							<p className="pl-1">Usernametext</p>
						</div>
						<a
							href="https://"
							className="text-white/40 text-sm font-light mb-1 flex flex-row items-center"
						>
							<icons.Link />
							<p className="pl-1">usernamelink</p>
						</a>
					</div>
					<button className="ml-auto px-3 h-[34px] bg-[#222222] text-white/70 rounded-md shadow-inner shadow-outer">
						Follow
					</button>
				</div>
			</div>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row gap-20">
					<ProfileStats number={64} label="Learning" />
					<ProfileStats number={124} label="To Learn" />
					<ProfileStats number={12} label="Learned" />
				</div>
			</div>
		</div>
	)
}

export default EditProfile