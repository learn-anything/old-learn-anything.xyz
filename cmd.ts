import { $ } from "bun"

async function main() {
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case "setup":
				await setup()
				break
		}
	} catch (err) {
		console.error("Error:", err)
	}
}

// TODO: make `bun setup` setup everything (jazz, seed, auth etc.)
// so readme is just `bun i`, `bun setup`, `bun dev` (and open localhost and start developing)
async function setup() {
	// TODO: make robust
	await $`bun seed home`
}

await main()
