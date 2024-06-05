import { CoMap, CoList, co, Account, Group } from "jazz-tools"

export class PersonalLink extends CoMap {
	type = co.literal("personalLink")
	globalLink = co.ref(GlobalLink)
}

export class GlobalLink extends CoMap {
	url = co.string
}

export class GlobalTopic extends CoMap {
	name = co.string
	title = co.string
	sections = co.ref(ListOfSections)
}

export class ListOfSections extends CoList.Of(co.ref(() => Section)) {}

export class Section extends CoMap {
	title = co.string
	links = co.ref(ListOfLinks)
}

export class Page extends CoMap {
	title = co.string
	// TODO: make rich text
	content = co.string
}

export class ListOfLinks extends CoList.Of(co.ref(GlobalLink)) {}

export class TodoItem extends CoMap {
	type = co.literal("todo")
	text = co.string
	done = co.boolean
}

export class ListOfPersonalLinks extends CoList.Of(co.ref(PersonalLink)) {}
export class ListOfPersonalTodoItems extends CoList.Of(co.ref(TodoItem)) {}
export class ListOfPages extends CoList.Of(co.ref(Page)) {}
export class UserProfile extends CoMap {
	name = co.string
	// avatar
}
export class UserRoot extends CoMap {
	wantToLearn = co.ref(ListOfTopics)
	learning = co.ref(ListOfTopics)
	learned = co.ref(ListOfTopics)
	personalLinks = co.ref(ListOfPersonalLinks)
	pages = co.ref(ListOfPages)
	todos = co.ref(ListOfPersonalTodoItems)
}

export class ListOfTopics extends CoList.Of(co.ref(GlobalTopic)) {}

export class LaAccount extends Account {
	profile = co.ref(UserProfile)
	root = co.ref(UserRoot)

	async migrate(
		this: LaAccount,
		creationProps?: { name: string } | undefined,
	): Promise<void> {
		if (!this._refs.root && creationProps) {
			const profileGroup = Group.create({ owner: this })
			profileGroup.addMember("everyone", "reader")
			this.profile = UserProfile.create(
				{ name: creationProps.name },
				{ owner: profileGroup },
			)

			this.root = UserRoot.create(
				{
					wantToLearn: ListOfTopics.create([], { owner: this }),
					learning: ListOfTopics.create([], { owner: this }),
					learned: ListOfTopics.create([], { owner: this }),
					inbox: Inbox.create([], { owner: this }),
					personalLinks: ListOfPersonalLinks.create([], { owner: this }),
					pages: ListOfPages.create([], { owner: this }),
				},
				{ owner: this },
			)
		}
	}
}
