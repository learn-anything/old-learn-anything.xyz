import { auth } from "@/edgedb-next-client"

export default async function Home() {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	const authBuiltinUiUrl = auth.getBuiltinUIUrl()
	const autBuiltinSignupUrl = auth.getBuiltinUISignUpUrl()

	// const publicData = await homePublic.run(client)
	// let authData = null as homeAuthReturn | null
	// if (authenticated) {
	// 	authData = await homeAuth.run(client, {})
	// }

	return <></>
}
