import { useState } from "react"
import Icon from "../components/Icons"
import Page from "../components/Page"
import Sidebar from "../components/Sidebar"
import { useAccount } from "../main"

export default function HomeAuthRoute() {
	const { me } = useAccount({ root: { inbox: [{}] } })
	console.log(me, "me")

	const [pages] = useState([
		{
			title: "physics",
			prettyName: "Physics",
			pageUrl: "hi",
			content: "I hate Physics!",
		},
		{
			title: "karabiner",
			prettyName: "Karabiner",
			pageUrl: "hi",
			content: "???",
		},
	])
	const [showView] = useState("All")
	const [personalLinks] = useState([
		{
			// use `title` as id for now
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
	])
	const [showPlusBar, setShowPlusBar] = useState(false)

	return (
		<>
			<div className="flex h-screen max-w-screen w-screen overflow-hidden text-white">
				<Sidebar personalPages={pages} />
				<div className="p-2 w-full">
					<Page showView={showView} links={personalLinks} />
				</div>
				<div
					onClick={() => {
						setShowPlusBar(!showPlusBar)
					}}
					className="absolute bottom-5 w-[50px] h-[50px] flex-center z-60 rounded-full transition-all bg-blue-500 right-5"
				>
					<Icon name="Plus" />

					{showPlusBar ? (
						<div className="absolute bottom-1 right-1 bg-blue-600 z-50 w-[200px] h-[400px] rounded-[11px]"></div>
					) : null}
				</div>
			</div>
		</>
	)
}
