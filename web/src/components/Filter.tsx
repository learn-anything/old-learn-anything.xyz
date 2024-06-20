import { AnimatePresence, motion } from "framer-motion"
import { proxy } from "valtio"
import Icons from "./Icons"

export function Filter() {
	const local = proxy({
		filters: ["Liked", "Topic"],
		appliedFilters: [] as string[],
		expanded: false,
		expandTimer: false,
	})

	return (
		<div
			className="flex gap-2 w-fit"
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
			<div className="relative">
				<div
					style={{
						border: "1px dashed rgba(255, 255, 255, 0.10)",
						background: "rgba(255, 255, 255, 0.02)",
					}}
					className="flex flex-row items-center h-[34px] px-[11px] pl-[9px] rounded-[7px] shrink-0 flex-center dark:text-white/50"
					onClick={() => {
						local.expanded = !local.expanded
					}}
				>
					<Icons name="Plus" />
					Filter
				</div>

				<AnimatePresence>
					{local.expanded ? (
						<motion.div
							exit={{ opacity: 0, scale: 0.8 }}
							animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
							transition={{ duration: 0.22, easing: "ease-out" }}
							className="absolute top-10 w-full min-w-fit justify-center left-0 bg-hoverDark rounded-[7px] space-y-2"
							style={{
								border: "1px solid #1E1E1E",
								background: "rgba(55, 55, 55, 0.40)",
								backdropFilter: "blur(8.5px)",
							}}
						>
							{local.filters.map((filter: string, index: number) => {
								return (
									<div
										key={index}
										onClick={() => {
											if (!local.appliedFilters.includes(filter)) {
												local.appliedFilters = [filter, ...local.appliedFilters]
											}
											local.expanded = false
										}}
										className="rounded-[7px] h-[34px] px-[11px] flex flex-col space-y-2 hover:bg-softDarkText/10 text-white/60"
									>
										{filter}
									</div>
								)
							})}
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			{local.appliedFilters.map((filter, index) => {
				return (
					<div
						key={index}
						className="bg-hoverDark rounded-[7px] px-[11px] flex-center text-white/60 gap-10"
					>
						{filter}
					</div>
				)
			})}
		</div>
	)
}
