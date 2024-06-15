import { Filter } from "./Filter"
import { LinkOrder } from "./LinkOrder"

export default function Topbar(props: {
	showView: "All" | "Links" | "Todos" | "Topics"
	setShowView: (view: "All" | "Links" | "Todos" | "Topics") => void
}) {
	return (
		<div className="flex flex-row justify-between px-5 pt-5 mb-5">
			<div className="flex [&>*]:h-full bg-hoverDark rounded-[7px] text-white/60 [&>*]:flex-center h-[34px] items-center">
				<button
					className={`px-[11px] ${props.showView === "All" ? "button" : ""}`}
					onClick={() => {
						// props.showView.set("All")
					}}
				>
					All
				</button>
				<button
					className={`px-[11px] ${props.showView === "Links" ? "button bg-red-500" : ""}`}
					onClick={() => {
						// props.showView.set("Links")
						//shits not working why tf
					}}
				>
					Links
				</button>
				<button
					className={`px-[11px] ${props.showView === "Todos" ? "button" : ""}`}
					onClick={() => {
						// props.showView.set("Todos")
					}}
				>
					Todos
				</button>
				<button
					className={`px-[11px] ${props.showView === "Topics" ? "button" : ""}`}
					onClick={() => {
						// props.showView.set("Topics")
					}}
				>
					Topics
				</button>
			</div>
			<div className="flex flex-row items-center gap-2">
				<Filter />
				<LinkOrder />
			</div>
		</div>
	)
}
