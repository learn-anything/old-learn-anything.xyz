import { useState } from "react"
import Icon from "./Icons"

interface NewTodoOrLinkProps {
	addLink: (link: any) => void
}

interface TextInputProps {
	inputValue: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = ({ inputValue, onChange }) => (
	<input
		type="text"
		placeholder="Write a todo or paste link"
		value={inputValue}
		onChange={onChange}
		className="flex flex-row items-center w-full justify-between bg-[#181818] outline-none placeholder-white/20 text-white/30 rounded-xl p-3 pl-5 h-full ml-3"
	/>
)

const UrlInput: React.FC<{ inputValue: string }> = ({ inputValue }) => (
	<div className="bg-[#181818] rounded-md p-2">
		<div className="flex flex-row justify-between items-center">
			<div className="flex flex-row space-x-3 px-2 items-center">
				<h2 className="text-base">{inputValue}</h2>
				<p className="text-neutral-700 text-sm font-light">
					{new Date().getFullYear()}
				</p>
			</div>
			<Icon name="Link" height="20" width="30" border="gray" />
		</div>
		<p className="text-neutral-700 text-sm font-light px-2">
			Lorem ipsum dolor sit amet consectetur adipisicing elit
		</p>
	</div>
)

const NewTodoOrLink: React.FC<NewTodoOrLinkProps> = ({ addLink }) => {
	const [inputValue, setInputValue] = useState("")
	const [isUrlInput, setIsUrlInput] = useState(false)
	const [urlError, setUrlError] = useState("")

	const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		setIsUrlInput(false)
		setUrlError("")
	}

	const createNewTodoOrLink = (event: React.FormEvent) => {
		event.preventDefault()
		if (inputValue.startsWith("http://") || inputValue.startsWith("https://")) {
			fetch(inputValue)
				.then((response) => response.text())
				.then((html) => {
					const doc = new DOMParser().parseFromString(html, "text/html")
					const title = doc.querySelector("title")
					if (title) {
						setInputValue(title.innerText)
						setIsUrlInput(true)
					}
				})
				.catch(() => {
					setIsUrlInput(false)
					setUrlError("Invalid link, check the URL and try again")
					setTimeout(() => setUrlError(""), 2000)
				})
		} else {
			addLink({ title: inputValue, date: new Date().toISOString() })
			setInputValue("")
		}
	}

	return (
		<form onSubmit={createNewTodoOrLink}>
			{urlError && <p className="text-[#ff004bed] text-center">{urlError}</p>}
			{isUrlInput ? (
				<UrlInput inputValue={inputValue} />
			) : (
				<TextInput inputValue={inputValue} onChange={inputChange} />
			)}
		</form>
	)
}

export default NewTodoOrLink
