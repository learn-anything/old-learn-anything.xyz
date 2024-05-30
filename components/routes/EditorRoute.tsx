"use client"
import { observer, useObservable } from "@legendapp/state/react"
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface Props {}
export default observer(function EditorRoute(props: Props) {
	const local = useObservable({
		topicTitle: "Cursor",
		pageContent: "Cursor is great IDE.",
		pages: [
			{ title: "physics", prettyName: "Physics", pageUrl: "hi" },
			{ title: "karabiner", prettyName: "Karabiner", pageUrl: "hi" },
			{ title: "cursor", prettyName: "Cursor", pageUrl: "hi" },
		],
	})
	return (
		<>
			<div className="text-white">
				<EditorProvider
					extensions={extensions}
					content={local.pageContent.get()}
				></EditorProvider>
			</div>
		</>
	)
})

const extensions = [StarterKit]
