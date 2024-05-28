"use client"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {}
export default observer(function HomeRoute(props: Props) {
	const local = useObservable({})
	return <></>
})
