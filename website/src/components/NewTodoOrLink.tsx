import { useState, useEffect } from "react"
import Icon from "./Icons"
interface NewTodoOrLinkProps {
	addLink: (link: any) => void
}
interface TextInputProps {
	inputValue: string
	date?: number
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string
}

const TextInput: React.FC<TextInputProps> = ({
	inputValue,
	onChange,
	errorMessage,
}) => (
	<input
		type="text || url"
		placeholder={errorMessage || "Write a todo or paste link"}
		value={inputValue}
		onChange={onChange}
		className="flex flex-row items-center w-full justify-between bg-[#181818] outline-none placeholder-white/20 text-white/30 rounded-xl p-3 pl-5 h-full ml-3"
	/>
)

const UrlInput: React.FC<TextInputProps> = ({ inputValue, date }) => {
	const [title, setTitle] = useState("")

	useEffect(() => {
		fetch(inputValue)
			.then((response) => response.text())
			.then((html) => {
				const doc = new DOMParser().parseFromString(html, "text/html")
				const titleElement = doc.querySelectorAll("title")[0]
				setTitle(titleElement ? titleElement.innerText : inputValue)
			})
			.catch(() => setTitle(inputValue))
	}, [inputValue])

	return (
		<div className="bg-[#181818] w-full rounded-lg p-2">
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row space-x-3 px-2 items-center">
					<h2 className="text-base">{title}</h2>
					<p className="text-neutral-700 text-sm font-light">{date}</p>
				</div>
				<Icon name="Link" height="20" width="30" border="gray" />
			</div>
			<div className="flex flex-row pt-2 space-x-2 items-center">
				<button className="bg-neutral-700/20 rounded-lg px-2 py-1 flex flex-row items-center">
					<p className="pr-2">No Topic</p>
					<Icon name="ThinArrowDown" height="20" width="30" border="gray" />
				</button>
				<div className="flex flex-row items-center">
					<Icon name="Note" height="20" width="30" border="gray" />
					<input
						type="text"
						className="text-neutral-700 placeholder:text-neutral-700 text-base w-[1000px] font-light px-2 bg-transparent rounded-md outline-none focus:ring-0"
						placeholder="Take a note..."
					/>
				</div>
			</div>
		</div>
	)
}

const NewTodoOrLink: React.FC<NewTodoOrLinkProps> = ({ addLink }) => {
	const [inputValue, setInputValue] = useState("")
	const [isUrlInput, setIsUrlInput] = useState(false)
	const [showInput, setShowInput] = useState(true)

	const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		setIsUrlInput(
			event.target.value.startsWith("http://") ||
				event.target.value.startsWith("https://"),
		)
	}

	const createNewTodoOrLink = (event: React.FormEvent) => {
		event.preventDefault()
		if (inputValue.trim()) {
			addLink({ title: inputValue, date: new Date().toISOString() })
			setInputValue("")
			setShowInput(false)
		}
	}

	return (
		<form onSubmit={createNewTodoOrLink}>
			{isUrlInput ? (
				<UrlInput inputValue={inputValue} onChange={inputChange} />
			) : (
				<TextInput inputValue={inputValue} onChange={inputChange} />
			)}
			<button
				type="submit"
				className="mt-2 bg-gray text-white font-bold py-2 px-4 rounded"
			>
				Add
			</button>
		</form>
	)
}

// const NewTodoOrLink: React.FC<NewTodoOrLinkProps> = ({ addLink }) => {
// 	const [inputValue, setInputValue] = useState("")
// 	const [isUrlInput, setIsUrlInput] = useState(false)
// 	const [title, setTitle] = useState("")
// 	const [url, setUrl] = useState("")

// 	const createLink = () => {
// 		if (title && url) {
// 			addLink({ title, url })
// 			setTitle("")
// 			setUrl("")
// 		}
// 	}

// 	const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setInputValue(event.target.value)
// 		setIsUrlInput(
// 			event.target.value.startsWith("http://") ||
// 				event.target.value.startsWith("https://"),
// 		)
// 	}

// 	const createNewTodoOrLink = (event: React.FormEvent) => {
// 		event.preventDefault()
// 		if (inputValue.trim()) {
// 			addLink({ title: inputValue, date: 2024 })
// 			setInputValue("")
// 		}
// 	}

// 	return (
// 		<form onSubmit={createNewTodoOrLink}>
// 			{isUrlInput ? (
// 				<UrlInput inputValue={inputValue} onChange={inputChange} />
// 			) : (
// 				<TextInput inputValue={inputValue} onChange={inputChange} />
// 			)}
// 			<button
// 				onClick={createLink}
// 				className="mt-2 bg-gray text-white font-bold py-2 px-4 rounded"
// 			>
// 				Add Link
// 			</button>
// 		</form>
// 	)
// }

export default NewTodoOrLink
