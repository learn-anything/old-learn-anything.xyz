import { useAccount } from "../main"
import { PersonalLink, TodoItem } from "../schema"

export default function Test() {
	const { me } = useAccount({ root: { inbox: [{}] } })

	// const topic = useCoState(Topic, topicID)

	return (
		<div className="text-white">
			<h1>Test</h1>
			{me?.root.inbox.map((item) =>
				item instanceof TodoItem ? (
					<TodoItemComponent key={item.id} item={item} />
				) : (
					<PersonalLinkComponent key={item.id} item={item} />
				)
			)}
		</div>
	)
}

export function TodoItemComponent({ item }: { item: TodoItem }) {
	return ""
}

export function PersonalLinkComponent({ item }: { item: PersonalLink }) {
	return item.globalLink?.url
}
