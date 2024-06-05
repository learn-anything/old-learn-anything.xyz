export default function NewTodoOrLink() {
	return (
		<div className="flex flex-row items-center w-full justify-between">
			<input
				type="text || url"
				placeholder="Past a link or write a todo"
				className="bg-[#181818] outline-none placeholder-white/20 text-white/30 w-full rounded-xl p-3 pl-5 h-full ml-3"
			/>
		</div>
	)
}
