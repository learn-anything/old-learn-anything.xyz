import Sidebar from "../components/Sidebar"

export default function SearchRoute() {
	return (
		<div className="flex h-screen w-screen box-border overflow-hidden text-white">
			<div className="w-1/7 mr-2">
				<Sidebar />
			</div>
			<div className="w-full mt-2 h-full border border-white/10 rounded-[20px] mr-2">
				<div className="px-5 py-3">
					<input className="bg-[#121212] placeholder:font-light tracking-wide font-light outline-none rounded-[10px] placeholder-white/20 text-white/30 w-[70%] px-5 py-3"></input>
				</div>
			</div>
		</div>
	)
}
