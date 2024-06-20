import { proxy } from "valtio"
import InboxTopbar from "./InboxTopbar"

export default function Inbox() {
	const local = proxy({
		expandedLink: null as string | null,
	})

	return (
		<div className="w-full h-full border border-white/10 rounded-[20px]">
			<InboxTopbar />
		</div>
	)
}

// <div className="px-5">
// 	{props.showNewTodoOrLink && (
// 		<div>
// 			{/* <NewTodoOrLink
// 				addLink={(link) => {
// 					local.links = [...local.links, link]
// 					HomeAuthRouteState.showNewTodoOrLink = false
// 					HomeAuthRouteState.rotateIcon = false
// 				}}
// 			/> */}
// 		</div>
// 	)}
// 	{local.links.map((link, index) => (
// 		<PersonalLink
// 			key={index}
// 			link={link}
// 			expandedLink={local.expandedLink}
// 			setExpandedLink={(title) => {
// 				local.expandedLink = title
// 			}}
// 			index={index}
// 			showNewTodoOrLink={props.showNewTodoOrLink}
// 		/>
// 	))}
// </div>
