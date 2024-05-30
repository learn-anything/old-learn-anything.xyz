"use client"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {}
export default observer(function ProfileRoute(props: Props) {
	const local = useObservable({
		prettyName: "Nikita",
		username: "nikita",
		profileLink: "https://nikiv.dev",
		topicsLearning: 64,
		topicsToLearn: 124,
		topicsLearned: 12,
		pages: [
			{ title: "physics", prettyName: "Physics", pageUrl: "hi" },
			{ title: "karabiner", prettyName: "Karabiner", pageUrl: "hi" },
		],
		publicPages: [
			{
				title: "Figma",
			},
			{
				title: "Ableton 12",
			},
		],
		personalLinks: [
			{
				title: "Modern JavaScript Tutorial",
				url: "https://javascript.info",
				topic: "JavaScript",
			},
			{
				title: "Modern Rust Tutorial",
				url: "https://doc.rust-lang.org/rust-by-example/",
				topic: "Rust",
			},
		],
	})
	return (
		<>
			<div className="text-white">profile</div>
		</>
	)
})
