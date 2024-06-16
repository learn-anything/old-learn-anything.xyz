import { proxy } from "valtio"
import { useProxy } from "valtio/utils"
import Icon from "../components/Icons"
import PersonalLink from "../components/PersonalLink"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"

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
				{/* <Sidebar personalPages={local.pages} /> */}
				<Sidebar />
				<div className="p-2 w-full">
					<PersonalLink
						showView={local.showView}
						links={local.personalLinks}
						showNewTodoOrLink={local.showNewTodoOrLink}
					/>
				</div>
				{/* {local.showNewTodoOrLink && (
					<div className="absolute z-2 bottom-10 right-10 bg-[#a1b3db] w-[180px] rounded-lg">
						<div className="flex flex-col space-y-2 text-black mb-8 p-2">
							<button className="text-left rounded-md bg-white/10 pl-2">
								Link or Todo
							</button>
							<button className="text-left rounded-md bg-white/10 pl-2">
								Page
							</button>
						</div>
					</div>
				)} */}
				<button
					onClick={() => {
						local.showNewTodoOrLink = !local.showNewTodoOrLink
						local.rotateIcon = local.showNewTodoOrLink // fix this idk
					}}
					className={`fixed z-1 flex items-center justify-center bottom-5 w-[50px] h-[50px] rounded-full transition-all bg-[#1f305c] right-5 ${local.rotateIcon ? "rotate-45" : ""}`}
				>
					<Icon name="Plus" />
				</button>
			</div>
		</>
	)
}
