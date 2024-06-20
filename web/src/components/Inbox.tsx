import Topbar from "./Topbar"
import NewTodoOrLink from "./NewTodoOrLink"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"
import { PersonalLink } from "./PersonalLink"
import { proxy } from "valtio"

export default function Inbox(props: {
	showView: string
	// TODO: get from jazz
	links: any[]
	showNewTodoOrLink: boolean
}) {
	const local = proxy({
		expandedLink: null as string | null,
		links: props.links,
	})

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<Topbar
				showView={props.showView as "All" | "Links" | "Todos"}
				setShowView={() => {}}
			/>
			<div className="px-5">
				{props.showNewTodoOrLink && (
					<div>
						<NewTodoOrLink
							addLink={(link) => {
								local.links = [...local.links, link]
								HomeAuthRouteState.showNewTodoOrLink = false
								HomeAuthRouteState.rotateIcon = false
							}}
						/>
					</div>
				)}
				{local.links.map((link, index) => (
					<PersonalLink
						key={index}
						link={link}
						expandedLink={local.expandedLink}
						setExpandedLink={(title) => {
							local.expandedLink = title
						}}
						index={index}
						showNewTodoOrLink={props.showNewTodoOrLink}
					/>
				))}
			</div>
		</div>
	)
}
