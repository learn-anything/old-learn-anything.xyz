import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Button from "./Button"
import Icon from "./Icons"
import Topbar from "./Topbar"
import NewTodoOrLink from "./NewTodoOrLink"

interface Props {
	showView: string
	// TODO: get from jazz
	links: any[]
	showNewTodoOrLink: boolean
}
export default function PersonalLink(props: Props) {
	const [expandedLink, setExpandedLink] = useState<string | null>(null)

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<Topbar
				showView={props.showView as "All" | "Links" | "Todos" | "Topics"}
				setShowView={() => {}}
			/>
			<div className="px-5">
				{props.showNewTodoOrLink && (
					<div>
						<NewTodoOrLink />
					</div>
				)}
				{props.links.map((link, index) => (
					<div key={index}>
						<ProfileLink
							link={link}
							expandedLink={expandedLink}
							setExpandedLink={setExpandedLink}
							showNewTodoOrLink={props.showNewTodoOrLink}
						/>
					</div>
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
}) {
	const [hovered] = useState(false)
	const handleAttachmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
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
					isExpanded ? "h-full transition-all !bg-[#171A21]" : ""
				}`}
			>
				<div className="flex flex-row items-center justify-between">
					<div
						className={`flex flex-row items-center w-full justify-between ${!isExpanded ? "bg-[#121212] rounded-xl py-2 px-4" : ""}`}
					>
						<p>{props.link.title}</p>
						{!isExpanded && (
							<Icon name="Link" height="20" width="30" border="gray" />
						)}
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
									<Icon name="Options" height="20" width="30" border="gray" />
								</button>
								<button className="cursor:pointer">
									<Icon name="Heart" height="24" width="24" border="gray" />
								</button>
							</motion.div>
							<Status />
						</div>
					) : null}
				</div>

				{isExpanded ? (
					<motion.div
						onClick={handleAttachmentClick}
						className="w-full h-[300px] flex flex-col justify-between"
					>
						<div className="pl-7 flex-col flex justify-between gap-2 p-2 text-[14px]">
							<div className="text-white/50 w-[700px]">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
								officia. Delectus in dolor quam praesentium laborum velit iusto
								aut saepe quibusdam, quia, nihil omnis odit dignissimos tenetur
								incidunt placeat fuga.
							</div>
							<div className="text-white/10">{props.link.date}</div>
						</div>
						<div className="w-full flex flex-row justify-between items-center border-t border-[#1f222b] p-2">
							<div className="flex flex-row items-center">
								<Icon name="Note" height="24" width="24" border="white" />
								<input
									type="text"
									placeholder="Take a note..."
									onChange={() => {
										// TODO: change
									}}
									className="text-[14px] text-white/40 pl-2 border-none bg-inherit outline-none focus:outline-none focus:ring-0"
								/>
							</div>
							<div
								className="w-fit"
								onClick={() => {
									props.setExpandedLink(null)
								}}
							>
								<Button label="Done" onChange={() => {}} />
							</div>
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
			<button
				onClick={() => {
					setExpanded(!expanded)
				}}
				className={`items-center justify-center flex flex-row cursor-pointer text-[#D29752] h-[34px] px-[11px] rounded-[7px] flex-center ${status === "To Learn" && "text-[#d26352]"} ${status === "Learned" && "text-[#52d274]"}`}
				style={{
					background:
						"linear-gradient(0deg, rgba(255, 167, 64, 0.02) 0%, rgba(255, 167, 64, 0.02) 100%), rgba(255, 255, 255, 0.02)",
				}}
			>
				<span className="mr-2">
					<Icon name="Hat" />
				</span>
				{status}
			</button>
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
					>
						<div
							onClick={() => {
								setStatus("Learning")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							Learning
						</div>
						<div
							onClick={() => {
								setStatus("To Learn")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							To Learn
						</div>
						<div
							onClick={() => {
								setStatus("Learned")
								setExpanded(false)
							}}
							className="rounded-[7px] h-[34px] px-[11px] flex-center hover:bg-softDarkText/10 text-white/60"
						>
							Learned
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}
