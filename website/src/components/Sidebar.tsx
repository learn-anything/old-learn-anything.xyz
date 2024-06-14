"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import { icons } from "./Icons"
import { useLocation } from "react-router-dom"

export default function Sidebar(props: {
	// personalPages: {
	// 	title: string
	// 	prettyName: string
	// 	content: string
	// }[]
	// topicTitle?: Observable<typeof Page>
	// setMode: (value: string) => void
	// mode: string
	// currentPage: string
	// setCurrentPage: (value: string) => void
}) {
	const [expanded, setExpanded] = useState(false)
	const [expandTimer, setExpandTimer] = useState(false)

	const location = useLocation()
	const currentPath = location.pathname

	return (
		<div className=" flex flex-col justify-between h-screen min-w-[200px] bg-dark text-textGray ">
			<div>
				<div className="flex-between m-[20px] mr-[2px] flex flex-row justify-between items-center">
					<icons.LearnAnythinglogo />
					<div className="w-[50%] h-[50px] flex items-center justify-center px-2 rounded-xl text-white/20 bg-[#161616]">
						<div className="flex items-center w-full">
							<IoSearch className="w-9 h-9 mr-2" />
							<input
								type="text"
								className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white/30"
							/>
						</div>
					</div>
				</div>
				<div className="col-gap-[8px] pl-2">
					<div
						className={`cursor-pointer px-3 text-white/70 ${currentPath === "/globaltopic" ? "" : "bg-[#1b1b1b]"} p-[8px] rounded-[7px] transition-all`}
					>
						Inbox
					</div>
					{currentPath !== "/globaltopic" && (
						<div
							className="cursor-pointer px-3 text-white/60 p-[6px] rounded-[7px] transition-all"
							onClick={() => {
								// props.setCurrentPage("MyLinks")
							}}
						>
							Links
						</div>
					)}

					{/* <div className="flex-between text-white/40">
						<h2 className="text-white/20 text-[14px] px-3 p-2">Pages</h2>
						<div
							onClick={() => {
								props.setMode("Page")
								props.setCurrentPage("")
							}}
						>
							<Icon name="Plus" />
						</div>

						{props.personalPages.map((page, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										props.topicTitle?.set({})
									}}
									className="text-white/60 px-3 p-[6px] cursor-pointer mb-[2px] hover:bg-hoverDark rounded-[7px] transition-all"
								>
									{page.title}
								</div>
							)
						})}
					</div> */}
				</div>
			</div>
			<div
				className="relative"
				onClick={() => {
					setExpanded(!expanded)
				}}
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
				<div className="p-4">Profile</div>
				<AnimatePresence>
					{expanded ? (
						<motion.div
							exit={{ opacity: 0, scale: 0.8 }}
							animate={{ scale: [0.8, 1.04, 1], opacity: [0, 1] }}
							transition={{ duration: 0.22, easing: "ease-out" }}
							className="absolute bottom-12 w-full min-w-fit left-[6px] bg-hoverDark p-1 rounded-[7px]"
							style={{
								border: "1px solid #1E1E1E",
								background: "rgba(55, 55, 55, 0.40)",
								backdropFilter: "blur(8.5px)",
							}}
						>
							<div
								onClick={() => {
									// props.setMode("Profile")
									// props.setCurrentPage("Profile")
								}}
								className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60"
							>
								Settings
							</div>
							<div className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60">
								Support
							</div>
							<div className="rounded-[7px] h-[34px] cursor-pointer whitespace-nowrap px-[11px] flex items-center hover:bg-softDarkText/10 text-white/60">
								Sign out
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	)
}
