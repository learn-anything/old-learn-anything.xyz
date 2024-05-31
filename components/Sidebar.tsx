"use client"
import { useState } from "react"
import Icon from "./Icons"
import { AnimatePresence, motion } from "framer-motion"
import { Observable } from "@legendapp/state"
import { Page } from "./routes/HomeRoute"

export default function Sidebar(props: {
	personalPages: {
		title: string
		pageUrl: string
		prettyName: string
		content: string
	}[]
	topicTitle?: Observable<Page>
	// setMode: (value: string) => void
	// mode: string
	// currentPage: string
	// setCurrentPage: (value: string) => void
}) {
	const [expanded, setExpanded] = useState(false)
	const [expandTimer, setExpandTimer] = useState(false)

	return (
		<div className=" flex flex-col justify-between h-screen min-w-[200px] bg-dark text-textGray ">
			<div>
				<div className="flex-between m-[20px] mr-[2px]">
					<div className="h-[40px] w-[40px] rounded-full bg-white"></div>
					<div
						className="px-[15px] h-[40px] flex-center rounded-[7px] text-white/30 bg-hoverDark "
						onClick={() => {}}
					>
						{/* {props.mode === "Search" ? "Back" : "Search"} */}
						Search
					</div>
				</div>
				<div className="col-gap-[8px] pl-2">
					<div className="cursor-pointer px-3 text-white/60 p-[6px] rounded-[7px] transition-all">
						Inbox
					</div>
					<div
						className="cursor-pointer px-3 text-white/60 p-[6px] rounded-[7px] transition-all"
						onClick={() => {
							// props.setCurrentPage("MyLinks")
						}}
					>
						Links
					</div>
					<div className="">
						<div className="flex-between text-white/40">
							<div className="text-white/20 text-[14px] px-3 p-2">Pages</div>
							<div
								onClick={() => {
									// props.setMode("Page")
									// props.setCurrentPage("")
								}}
							>
								<Icon name="Plus" />
							</div>
						</div>
						{props.personalPages.map((page, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										props.topicTitle?.set(page)
									}}
									className="text-white/60 px-3 p-[6px] cursor-pointer mb-[2px] hover:bg-hoverDark rounded-[7px] transition-all"
								>
									{page.title}
								</div>
							)
						})}
					</div>
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
