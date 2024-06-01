import { useAccount } from "../main"
import { PersonalLink, TodoItem } from "../schema"

export default function Test() {
	const { me } = useAccount({ root: { inbox: [{}] } })

	// const topic = useCoState(Topic, topicID)

	return (
		<>
			<h1>Test</h1>
			{me?.root?.inbox?.map((item) => {
				item instanceof TodoItem ? (
					<TodoItemComponent item={item} />
				) : (
					<PersonalLinkComponent item={item} />
				)
			})}
		</>
	)
}

export function TodoItemComponent({ item }: { item: TodoItem }) {
	return ""
}

export function PersonalLinkComponent({ item }: { item: PersonalLink }) {
	return ""
}
