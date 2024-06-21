import { proxy } from "valtio"
import InboxTopbar from "./InboxTopbar"
import { useProxy } from "valtio/utils"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"
import NewTodoOrLink from "./NewTodoOrLink"
import { PersonalLinkType } from "../types"
import { PersonalLink } from "./PersonalLink"

export default function Inbox() {
	const local = proxy({
		expandedLink: null as string | null,
	})
	const global = useProxy(HomeAuthRouteState)

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<InboxTopbar />
			<div style={{ margin: "0 auto" }} className="w-[98%] flex flex-col mx-4">
				{global.enteringNewPersonalLinkOrTodo && (
					<NewTodoOrLink
						addLink={(link: PersonalLinkType) => {
							global.personalLinks = [...global.personalLinks, link]
							global.enteringNewPersonalLinkOrTodo = false
						}}
					/>
				)}
				{global.personalLinks.map((link, index) => (
					<PersonalLink
						key={index}
						link={link}
						expandedLink={local.expandedLink}
						setExpandedLink={(title) => {
							local.expandedLink = title
						}}
						index={index}
						showNewTodoOrLink={global.enteringNewPersonalLinkOrTodo}
					/>
				))}
			</div>
		</div>
	)
}
