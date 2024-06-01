// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

const userId = process.env.USER_ID!

async function seed() {
	// checkThatNotRunningInProduction()
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case undefined:
				console.log("No command provided")
				break
			case "jazz-seed-inbox":
				await seedInbox()
				break
			default:
				console.log("Unknown command")
				break
		}
		console.log("done")
	} catch (err) {
		console.error("Error occurred:", err)
	}
}

import { GlobalLink, LaAccount, PersonalLink } from "@/website/src/schema"
import { startWorker } from "jazz-nodejs"
import { Group } from "jazz-tools"
import { RawControlledAccount } from "cojson"

async function seedInbox() {
	const { worker } = await startWorker({
		accountID: "co_zhvp7ryXJzDvQagX61F6RCZFJB9",
		accountSecret:
			"sealerSecret_z7o2TyWgbzin7Syoa4xUvoQc9ufyc3G2KWj6vfUsoE5en/signerSecret_z6ZnmVjPjqjFPtRcEiEVbPhuMcauvdE9hV7tVLUxRx1z5",
	})

	const user = (await (
		await LaAccount.createAs(worker, {
			creationProps: { name: "Nikiv" },
		})
	).ensureLoaded({ root: { inbox: [] } }))!

	const globalLinksGroup = Group.create({ owner: worker })
	globalLinksGroup.addMember("everyone", "reader")

	const globalLink1 = GlobalLink.create(
		{ url: "https://google.com" },
		{ owner: globalLinksGroup },
	)
	const personalLink1 = PersonalLink.create(
		{ globalLink: globalLink1, type: "personalLink" },
		{ owner: user },
	)

	user.root.inbox.push(personalLink1)

	const credentials = {
		accountID: user.id,
		accountSecret: (user._raw as RawControlledAccount).agentSecret,
	}

	await Bun.write(
		"./website/.env",
		`VITE_SEED_ACCOUNTS='${JSON.stringify({
			nikiv: credentials,
		})}'`,
	)
}

// function checkThatNotRunningInProduction() {
// 	if (process.env.EDGEDB_INSTANCE === "nikitavoloboev/learn-anything") {
// 		throw new Error(
// 			"Connected to production DB, don't run these seed commands on it",
// 		)
// 	}
// }

// TODO: fix
// @ts-ignore
await seed()
