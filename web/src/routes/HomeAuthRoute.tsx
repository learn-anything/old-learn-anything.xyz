import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import Icon from "../components/Icons"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"
import Inbox from "../components/Inbox"

export const HomeAuthRouteState = proxy({
	showView: "All",
	inputValue: "Testing",
	rotateIcon: false,
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
		root: { personalLinks: [{ globalLink: {} }], todos: [{}] },
	}).me?.root
	if (!global) return <></>
	return (
		<>
			<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
				<Sidebar />
				<div className="p-2 w-full">
					<Inbox
						showView={local.showView}
						links={local.personalLinks}
						showNewTodoOrLink={local.showNewTodoOrLink}
					/>
				</div>
				<button
					onClick={() => {
						local.showNewTodoOrLink = !local.showNewTodoOrLink
						local.rotateIcon = local.showNewTodoOrLink
					}}
					className={`fixed z-1 flex items-center justify-center bottom-5 w-[50px] h-[50px] rounded-full transition-all bg-[#1f305c] right-5 ${local.rotateIcon ? "rotate-45" : ""}`}
				>
					<Icon name="Plus" />
				</button>
			</div>
		</>
	)
}
