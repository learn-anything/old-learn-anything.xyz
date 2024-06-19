import Sidebar from "../components/Sidebar"
import { icons } from "../components/Icons"

export default function SearchRoute() {
	return (
		<div className="flex h-screen mt-2 mb-2 max-w-screen w-screen overflow-hidden text-white">
			<div className="w-1/7">
				<Sidebar />
			</div>
			<div className="w-full mx-5 h-full border border-white/10 rounded-[20px]">
				<div className="px-5 py-3">
					<input className="bg-[#121212] placeholder:font-light tracking-wide font-light outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[70%] px-5 py-3"></input>
				</div>
			</div>
		</div>
	)
}
