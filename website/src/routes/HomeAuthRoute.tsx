import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import Icon from "../components/Icons"
import PersonalLink from "../components/PersonalLink"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"

export const HomeAuthRouteState = proxy({
	showView: "All",
	inputValue: "Testing",
	pages: [
		{
			title: "physics",
			prettyName: "Physics",
			content: "Physics is great",
		},
		{
			title: "karabiner",
			prettyName: "Karabiner",
			content: "Karabiner is great",
		},
	],
	personalLinks: [
		{
			title: "Modern JavaScript Tutorial",
			url: "https://javascript.info",
			description: "Teaches you JS in modern way",
			note: "loved it",
			status: "Learning",
			topic: "JavaScript",
			date: "2023",
			dateAdded: "March 20, 2024",
		},
		{
			title: "Modern Rust Tutorial",
			url: "https://doc.rust-lang.org/rust-by-example/",
			description: "Teaches you Rust in modern way",
			note: "was ok",
			status: "Learned",
			topic: "Rust",
			date: "2024",
			dateAdded: "April 20, 2024",
		},
	],
	showNewTodoOrLink: false,
})
export default function HomeAuthRoute() {
	const local = useProxy(HomeAuthRouteState)
	const global = useAccount({
		// {} = loads all primitive fields
		// {} = can include references to load inside the object
		root: { pages: [{}], personalLinks: [{ globalLink: {} }], todos: [{}] },
	}).me?.root

	if (!global) return <></>

	return (
		<>
			<div className="text-white">
				{global.personalLinks.map((personalLink) => {
					return <div key={personalLink.id}>{personalLink.globalLink.url}</div>
				})}
			</div>
			<input
				type="text"
				value={global.personalLinks[1].note}
				onChange={(e) => {
					global.personalLinks[1].note = e.target.value
				}}
				className="p-2 rounded-md border border-gray-300"
			/>
			<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
				<Sidebar personalPages={local.pages} />
				<div className="p-2 w-full">
					<PersonalLink
						showView={local.showView}
						links={local.personalLinks}
						showNewTodoOrLink={local.showNewTodoOrLink}
					/>
				</div>
				<div
					onClick={() => {
						local.showNewTodoOrLink = true
					}}
					className="absolute flex items-center justify-center bottom-5 w-[50px] h-[50px] z-60 rounded-full transition-all bg-blue-500 right-5"
				>
					<Icon name="Plus" />
				</div>
			</div>
		</>
	)
}
