import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PageProps {
	page?: {
		title: string
		description: string
	}
}

export default function Page({ page }: PageProps) {
	const [title, setTitle] = useState("")

	useEffect(() => {
		if (page) {
			setTitle(page.title)
		}
	}, [page])

	return (
		<div className="">
			<div className="flex-between h-[74px] p-[20px] pr-[25px]">
				{page ? (
					<motion.div
						initial={{ opacity: 0, x: 10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="text-[25px] font-bold"
					>
						{title}
					</motion.div>
				) : (
					<input
						type="text"
						placeholder="Title"
						className="placeholder-white/20 font-bold text-[25px] bg-transparent outline-none"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				)}
				<div className="flex gap-[20px] flex-center">
					<div>vis</div>
					<div>...</div>
				</div>
			</div>
		</div>
	)
}
