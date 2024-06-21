import { useState } from "react"
import { useProxy } from "valtio/utils"
import { HomeAuthRouteState } from "../routes/HomeAuthRoute"
import { PersonalLinkType } from "../types"
import InboxTopbar from "./InboxTopbar"
import NewTodoOrLink from "./NewTodoOrLink"
import { PersonalLink } from "./PersonalLink"

export default function Inbox() {
	// TODO: bring back once fixed https://discord.com/channels/740090768164651008/778312367439347724/1253698071657709688
	// const local = proxy({
	// 	expandedLink: null as string | null,
	// })
	// useEffect(() => {
	// 	console.log(local.expandedLink, "expandedLink")
	// }, [local.expandedLink])

	const [expandedLink, setExpandedLink] = useState<string | null>(null)
	const global = useProxy(HomeAuthRouteState)

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<InboxTopbar />
			<div className="px-5">
				{global.enteringNewPersonalLinkOrTodo && (
					<div>
						<NewTodoOrLink
							addLink={(link: PersonalLinkType) => {
								global.personalLinks = [...global.personalLinks, link]
								global.enteringNewPersonalLinkOrTodo = false
							}}
						/>
					</div>
				)}
				{global.personalLinks.map((link, index) => (
					<PersonalLink
						key={index}
						link={link}
						expandedLink={expandedLink}
						setExpandedLink={(title) => {
							setExpandedLink(title)
						}}
						index={index}
						showNewTodoOrLink={global.enteringNewPersonalLinkOrTodo}
					/>
				))}
			</div>
		</div>
	)
}
