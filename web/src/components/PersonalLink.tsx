import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Icon from "./Icons"
import Topbar from "./Topbar"
import NewTodoOrLink from "./NewTodoOrLink"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"

interface Props {
	showView: string
	// TODO: get from jazz
	links: any[]
	showNewTodoOrLink: boolean
}
export default function PersonalLink(props: Props) {
	const [expandedLink, setExpandedLink] = useState<string | null>(null)
	const [links, setLinks] = useState<any[]>(props.links)

	const addLink = (link: any) => {
		setLinks([...links, link])
		HomeAuthRouteState.showNewTodoOrLink = false
		HomeAuthRouteState.rotateIcon = false
	}

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<Topbar
				showView={props.showView as "All" | "Links" | "Todos"}
				setShowView={() => {}}
			/>
			<div className="px-5">
				{props.showNewTodoOrLink && (
					<div>
						<NewTodoOrLink addLink={addLink} />
					</div>
				)}
				{links.map((link, index) => (
					<ProfileLink
						key={index}
						link={link}
						expandedLink={expandedLink}
						setExpandedLink={setExpandedLink}
						index={index}
						showNewTodoOrLink={props.showNewTodoOrLink}
					/>
				))}
			</div>
		</div>
	)
}

function ProfileLink(props: {
	// link: Links
	link: any
	expandedLink: string | null
	setExpandedLink: (title: string | null) => void
	showNewTodoOrLink: boolean
	index: number
}) {
	const [hovered] = useState(false)
	const [title, setTitle] = useState(props.link.title)
	const [description, setDescription] = useState(props.link.description)

	const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
	}

	const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value)
	}

	const isExpanded = props.expandedLink === props.link.title

	return (
		<div>
			<motion.div
				id="ProfileLink"
				onClick={() => {
					props.setExpandedLink(isExpanded ? null : props.link.title)
				}}
				className={`rounded-lg hover:bg-hoverDark bg-softDark p-[2px] pl-3 h-full transition-all ${
					isExpanded ? "h-full transition-all !bg-neutral-900" : ""
				}`}
			>
				<div className="flex flex-row items-center justify-between">
					<div
						className={`flex flex-row p-2 items-center w-full justify-between ${!isExpanded ? "bg-[#121212] rounded-xl py-2 px-4" : ""}`}
					>
						<div className="flex items-center">
							{isExpanded ? (
								<input
									onClick={(e) => e.stopPropagation()}
									value={title}
									onChange={changeTitle}
									className="bg-inherit text-white/50 placeholder:text-neutral-600 w-full p-2 outline-none focus:outline-none focus:ring-0 border-none text-left"
								/>
							) : (
								<p>{props.link.title}</p>
							)}

							{isExpanded && (
								<p className="text-white/10 ml-2">{props.link.date}</p>
							)}
						</div>
						{isExpanded && (
							<Icon name="Link" height="20" width="30" border="gray" />
						)}
					</div>
				</div>

				{isExpanded ? (
					<motion.div
						onClick={handleAttachmentClick}
						className="w-full h-full flex flex-col justify-between"
					>
						<div className="flex-col flex justify-between text-[14px]">
							<input
								onClick={(e) => e.stopPropagation()}
								className="bg-inherit text-white/50 placeholder:text-neutral-600 w-[90%] p-2 outline-none focus:outline-none focus:ring-0 border-none text-left"
								style={{ textAlign: "left", whiteSpace: "pre-wrap" }}
								value={description}
								onChange={changeDescription}
								placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, officia."
							></input>
						</div>
						<div className="w-full flex flex-row justify-between items-center p-2">
							<div className="flex flex-row items-center">
								<Icon name="Note" height="24" width="24" border="white" />
								<input
									type="text"
									placeholder="Take a note..."
									onChange={() => {}}
									className="text-[14px] placeholder:text-neutral-600 text-white/40 pl-2 border-none bg-inherit outline-none focus:outline-none focus:ring-0"
								/>
							</div>
							{hovered || isExpanded ? (
								<div className="flex flex-row justify-between items-center gap-2">
									<motion.div
										animate={{
											transform: ["translateX(5px)", "translateX(0)"],
											opacity: [0, 0.6],
										}}
										transition={{ duration: 0.3 }}
										className="opacity-60 items-center flex flex-row gap-2"
									>
										<button className="cursor:pointer">
											<Icon
												name="Options"
												height="20"
												width="30"
												border="gray"
											/>
										</button>
										<button className="cursor:pointer">
											<Icon name="Heart" height="24" width="24" border="gray" />
										</button>
									</motion.div>
									<Status />
								</div>
							) : null}
						</div>
					</motion.div>
				) : null}
			</motion.div>
		</div>
	)
}

function Status() {
	const [expanded, setExpanded] = useState(false)
	const [status, setStatus] = useState("Learning")
	const [expandTimer, setExpandTimer] = useState(false)
	return (
		<motion.div
			animate={{
				transform: ["translateX(5px)", "translateX(0)"],
				opacity: [0, 1],
			}}
			transition={{ duration: 0.5 }}
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
			<AnimatePresence>
				{expanded ? (
					<motion.div
						exit={{ opacity: 0, scale: 0.8 }}
						animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1] }}
						transition={{ duration: 0.2, easing: "ease-in" }}
						className="absolute top-10 w-full min-w-fit left-0 bg-hoverDark p-1 rounded-[7px]"
						style={{
							border: "1px solid #1E1E1E",
							background: "rgba(55, 55, 55, 0.40)",
							backdropFilter: "blur(8.5px)",
						}}
					></motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}
