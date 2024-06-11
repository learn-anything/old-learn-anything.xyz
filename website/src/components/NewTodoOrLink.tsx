import { useState } from "react"

interface NewTodoOrLinkProps {
	addLink: (link: any) => void
}

const NewTodoOrLink: React.FC<NewTodoOrLinkProps> = ({ addLink }) => {
	const [inputValue, setInputValue] = useState("")

	const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const createNewTodoOrLink = (event: React.FormEvent) => {
		event.preventDefault()
		if (inputValue.trim()) {
			addLink({ title: inputValue, date: new Date().toISOString() })
			setInputValue("")
		}
	}

	return (
		<form onSubmit={createNewTodoOrLink}>
			<div className="flex flex-row items-center w-full justify-between">
				<input
					type="text || url"
					placeholder="Past a link or write a todo"
					value={inputValue}
					onChange={inputChange}
					className="bg-[#181818] outline-none placeholder-white/20 text-white/30 w-full rounded-xl p-3 pl-5 h-full ml-3"
				/>
			</div>
		</form>
	)
}

export default NewTodoOrLink
