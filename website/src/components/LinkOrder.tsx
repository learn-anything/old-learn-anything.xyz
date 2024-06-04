import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Icon from "./Icons"

export function LinkOrder(props: { filterOrder?: "Custom" | "RecentlyAdded" }) {
	const [expanded, setExpanded] = useState(false)
	const [filterOrder, setFilterOrder] = useState("Recently Added")
	const [expandTimer, setExpandTimer] = useState(false)
	return (
		<div
			className="relative"
			onMouseLeave={() => {
				setExpandTimer(true)
				setTimeout(() => {
					if (expandTimer) {
						setExpanded(false)
					}
				}, 500)
			}}
			onMouseEnter={() => {
				setExpandTimer(false)
			}}
		>
			<div
				onClick={() => {
					setExpanded(!expanded)
				}}
				className="flex flex-row items-center button px-[11px] pr-[4px] text-white/60 h-[34px] flex-center gap-1 rounded-[7px] bg-[#232323]"
			>
				{filterOrder}
				<Icon name="ArrowDown" />
			</div>
			<AnimatePresence>
				{expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
						transition={{ duration: 0.22, easing: "ease-out" }}
						className="absolute items-center top-10 inline-flex right-0 bg-hoverDark p-1 flex-col gap-[2px] min-w-fit rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					>
						<div
							onClick={() => {
								setFilterOrder("Custom")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] cursor-pointer px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
						>
							Custom
						</div>
						<div
							onClick={() => {
								setFilterOrder("Recently Added")
								setExpanded(false)
							}}
							className="flex flex-row items-center rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] hover:bg-softDarkText/10 text-white/60"
						>
							Recently Added
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}
