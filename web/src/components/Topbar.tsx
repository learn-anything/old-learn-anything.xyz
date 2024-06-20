import { Filter } from "./Filter"
import { LinkOrder } from "./LinkOrder"

export default function Topbar(props: {
	showView: "All" | "Links" | "Todos"
	setShowView: (view: "All" | "Links" | "Todos") => void
}) {
	return (
		<div className="flex flex-row justify-between px-5 pt-5 mb-5">
			<div className=" flex [&>*]:h-full bg-hoverDark rounded-md text-white/60 bg-[#191919] [&>*]:flex-center h-[34px] items-center">
				<button
					className={`px-[11px] cursor-pointer ${props.showView === "All" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {
						// props.showView.set("All")
					}}
				>
					All
				</button>
				<button
					className={`px-[11px] ${props.showView === "Links" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {
						// props.showView.set("Links")
						//shits not working why tf
					}}
				>
					Links
				</button>
				<button
					className={`px-[11px] ${props.showView === "Todos" ? "bg-[#222222] text-white/80 rounded-md shadow-inner shadow-outer" : ""}`}
					onClick={() => {
						// props.showView.set("Todos")
					}}
				>
					Todos
				</button>
				{/* <button
					className={`px-[11px] ${props.showView === "Topics" ? "button" : ""}`}
					onClick={() => {
						// props.showView.set("Topics")
					}}
				>
					Topics
				</button> */}
			</div>
			<div className="flex flex-row items-center gap-2 cursor-pointer">
				<Filter />
				<LinkOrder />
			</div>
		</div>
	)
}
