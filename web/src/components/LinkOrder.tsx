import { AnimatePresence, motion } from "framer-motion"
import { proxy } from "valtio"
import Icon from "./Icons"

export function LinkOrder() {
	const local = proxy({
		expanded: false,
		filterOrder: "Recently Added",
		expandTimer: false,
	})
	return (
		<div
			className="relative"
			onMouseLeave={() => {
				local.expandTimer = true
				setTimeout(() => {
					if (local.expandTimer) {
						local.expanded = false
					}
				}, 500)
			}}
			onMouseEnter={() => {
				local.expandTimer = false
			}}
		>
			<div
				onClick={() => {
					local.expanded = !local.expanded
				}}
				className="flex flex-row items-center button px-[11px] pr-[4px] text-white/60 h-[34px] flex-center gap-1 rounded-[7px] bg-[#232323]"
			>
				{local.filterOrder}
				<Icon name="ArrowDown" />
			</div>
			<AnimatePresence>
				{local.expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
						transition={{ duration: 0.22, easing: "ease-out" }}
						className="cursor-pointer absolute items-center top-10 inline-flex right-0 bg-hoverDark p-1 flex-col gap-[2px] min-w-fit rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					>
						<button
							onClick={() => {
								local.filterOrder = "Custom"
								local.expanded = false
							}}
							className="rounded-[7px] h-[34px] cursor-pointer px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
						>
							Custom
						</button>
						<button
							onClick={() => {
								local.filterOrder = "Recently Added"
								local.expanded = false
							}}
							className="flex flex-row items-center rounded-[7px] h-[34px] whitespace-nowrap px-[11px] hover:bg-softDarkText/10 text-white/60"
						>
							Recently Added
						</button>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}
