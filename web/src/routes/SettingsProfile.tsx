import { proxy } from "valtio"
import Icon from "../components/Icons"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"
import { useProxy } from "valtio/utils"
import { checkIfUrl } from "../../lib/utils"

const SettingsProfileState = proxy({
	name: "",
	username: "",
	website: "",
	bio: "",
})
export default function SettingsProfile() {
	const local = useProxy(SettingsProfileState)
	const global = useAccount({
		root: {},
	}).me?.root
	// TODO: load proxy with global state
	if (!global) return <></>

	return (
		<>
			<div className="flex flex-col h-screen py-3">
				<div className="flex flex-1">
					<div className="w-1/5 mr-2">
						<Sidebar />
					</div>
					<div className="flex-1 flex flex-col border border-neutral-800 rounded-3xl">
						<div>
							<p className="text-[25px] text-white/30 font-semibold h-[74px] p-[20px]">
								Profile
							</p>
							<div className="px-[41px] p-[20px] flex gap-[40px]">
								<button className="w-[130px] h-[130px] border-dashed border rounded-[7px] border-white/10 bg-white bg-opacity-[0.02] flex flex-col justify-center items-center text-white/40">
									<Icon name="Plus" />
									<p>Photo</p>
								</button>
								<div className="flex flex-col font-light space-y-4">
									<input
										type="text"
										placeholder="Your name"
										className="bg-[#121212] placeholder:font-light font-light outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[400px] px-[14px] p-[13px]"
										value={global.name}
										onChange={(e) => {
											global.name = e.target.value
										}}
									/>
									<input
										type="text"
										placeholder="Username"
										value={global.username}
										onChange={(e) => {
											global.username = e.target.value
												.toLowerCase()
												.replace(/\s+/g, "-")
												.replace(/[^a-z0-9-]/g, "")
										}}
										className="bg-[#121212] placeholder:font-light outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[400px] px-[14px] p-[13px]"
									/>
									<p className="text-white/30">
										learn-anything.xyz/@{global.username}
									</p>
									<input
										type="text"
										placeholder="Website"
										className="bg-[#121212] placeholder:font-light outline-none rounded-[10px] placeholder-white/20 w-[400px] px-[14px] p-[13px] text-white/30"
										value={global.website}
										onChange={(e) => {
											return
											// const isValidUrl = (url: string) => {
											// 	try {
											// 		new URL(url)
											// 		return true
											// 	} catch (_) {
											// 		return false
											// 	}
											// }
											// if (isValidUrl(e.target.value)) {
											// 	global.website = e.target.value
											// }
										}}
									/>
									<input
										type="text"
										placeholder="Bio"
										className="bg-[#121212] font-light placeholder:font-light pt-2 outline-none rounded-[10px] placeholder-white/20 w-[400px] h-[120px] px-[14px] pb-[104px] text-left"
										value={global.bio}
										onChange={(e) => {
											global.bio = e.target.value
										}}
									/>
								</div>
								<button
									onClick={() => {
										global.name = local.name
										// TODO: check that username does not already exist in jazz. show red error if it does.
										global.username = local.username
										if (checkIfUrl(local.website)) {
											global.website = local.website
										}
										global.bio = local.bio
									}}
									className="bg-[#121212] text-white/20 font-light outline-none rounded-[10px] py-2 px-4 mt-4 w-[120px] flex justify-center items-center whitespace-nowrap"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
