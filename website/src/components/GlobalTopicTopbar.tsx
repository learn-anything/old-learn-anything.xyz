import { useState } from "react"

export default function GlobalTopicTopbar(props: {
	showView: "All" | "Links" | "Todos" | "Topics"
	setShowView: (view: "All" | "Links" | "Todos" | "Topics") => void
}) {
	const [activeButton, setActiveButton] = useState<"Guide" | "All links">(
		"Guide",
	)

	return (
		<div className="flex flex-row justify-between px-5 pt-5 mb-5">
			<h1 className="text-white text-lg font-bold">Topic Name</h1>
			<div className="flex flex-row items-center space-x-5">
				<div className="flex flex-row items-center">
					<button
						className={`rounded-l-md h-[34px] cursor-pointer px-[11px] ${activeButton === "Guide" ? "bg-neutral-700 text-white/90 rounded-r-md" : "bg-neutral-800 text-white/60"}`}
						onClick={() => setActiveButton("Guide")}
					>
						Guide
					</button>
					<button
						className={`rounded-r-md h-[34px] cursor-pointer px-[11px] ${activeButton === "All links" ? "bg-neutral-700 text-white/90 rounded-l-md" : "bg-neutral-800 text-white/60"}`}
						onClick={() => setActiveButton("All links")}
					>
						All links
					</button>
				</div>
				<button className="rounded-[7px] h-[34px] cursor-pointer px-[11px] bg-neutral-800 text-white/70">
					Add to my profile
				</button>
			</div>
		</div>
	)
}
