import { useState } from "react"
import Icons from "./Icons"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
	filter?: string[]
}
export function Filter(props: Props) {
	{
		const [filters] = useState(["Liked", "Topic"])
		const [appliedFilters, setAppliedFilters] = useState<string[]>([])
		const [expanded, setExpanded] = useState(false)
		const [expandTimer, setExpandTimer] = useState(false)

		return (
			<div
				className="flex gap-2 w-fit"
				onMouseLeave={() => {
					//this is trash gotta be a better way to do this
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
				<div className="relative">
					<div
						style={{
							border: "1px dashed rgba(255, 255, 255, 0.10)",
							background: "rgba(255, 255, 255, 0.02)",
						}}
						className="h-[34px] px-[11px] pl-[9px] rounded-[7px] shrink-0 flex-center dark:text-white/50"
						onClick={() => {
							setExpanded(!expanded)
						}}
					>
						<Icons name="Plus" />
						Filter
					</div>

					<AnimatePresence>
						{expanded ? (
							<motion.div
								exit={{ opacity: 0, scale: 0.8 }}
								animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
								transition={{ duration: 0.22, easing: "ease-out" }}
								className="absolute top-10 w-full min-w-fit left-0 bg-hoverDark p-1 rounded-[7px]"
								style={{
									border: "1px solid #1E1E1E",
									background: "rgba(55, 55, 55, 0.40)",
									backdropFilter: "blur(8.5px)",
								}}
							>
								{filters.map((filter: string, index: number) => {
									return (
										<div
											key={index}
											onClick={() => {
												if (!appliedFilters.includes(filter)) {
													setAppliedFilters([filter, ...appliedFilters])
												}
												setExpanded(false)
											}}
											className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
										>
											{filter}
										</div>
									)
								})}
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>

				{appliedFilters.map((filter, index) => {
					return (
						<div
							key={index}
							className="bg-hoverDark rounded-[7px]  px-[11px] flex-center text-white/60"
						>
							{filter}
						</div>
					)
				})}
			</div>
		)
	}
}
