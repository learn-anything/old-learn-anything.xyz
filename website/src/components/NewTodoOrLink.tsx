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
	const [description, setDescription] = useState("")

	// fix title
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

	const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value)
	}

	return (
		<div className="bg-[#181818] w-full rounded-lg p-2 pb-2">
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row space-x-3 px-2 items-center">
					{/* fix so that the auto title is displayed */}
					<input
						type="text"
						value={title}
						onChange={changeTitle}
						className="text-base bg-transparent outline-none focus:ring-0 focus:outline-none text-white"
					/>
					<p className="text-neutral-700 text-sm font-light">2024</p>
				</div>
				<Icon name="Link" height="20" width="30" border="gray" />
			</div>
			<input
				type="text"
				placeholder="Add description"
				value={description}
				onChange={changeDescription}
				className="text-base p-2 bg-transparent outline-none focus:ring-0 focus:outline-none text-white/50 placeholder:text-white/30"
			/>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row pt-2 space-x-2 items-center">
					<button className="bg-neutral-700/20 text-white/50 flex flex-row rounded-lg px-2 py-1 items-center whitespace-nowrap">
						<p className="pr-2">No Topic</p>
						<Icon name="ThinArrowDown" height="20" width="30" border="gray" />
					</button>
					<div className="flex flex-row items-center">
						<Icon name="Note" height="20" width="30" border="gray" />
						<input
							type="text"
							className="text-neutral-600 placeholder:text-neutral-600 text-base w-[1000px] font-normal px-2 bg-transparent rounded-md outline-none focus:ring-0"
							placeholder="Take a note..."
						/>
					</div>
				</div>
				<div className="flex flex-row items-center opacity-50">
					<Icon name="Options" height="22" width="32" border="gray" />
					<Icon name="Heart" height="22" width="32" border="gray" />
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
			addLink({ title: inputValue })
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
			{/* <button
				type="submit"
				className="mt-2 bg-gray text-white font-bold py-2 px-4 rounded"
			>
				Add
			</button> */}
		</form>
	)
}

export default NewTodoOrLink
