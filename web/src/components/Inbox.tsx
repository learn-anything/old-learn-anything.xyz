import { useState } from "react"
import Topbar from "./Topbar"
import NewTodoOrLink from "./NewTodoOrLink"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"
import { PersonalLink } from "./PersonalLink"

export default function Inbox(props: {
	showView: string
	// TODO: get from jazz
	links: any[]
	showNewTodoOrLink: boolean
}) {
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
					<PersonalLink
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
