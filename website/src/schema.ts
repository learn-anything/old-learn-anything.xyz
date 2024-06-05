import { CoMap, CoList, co, Account, Group } from "jazz-tools"

export class PersonalLink extends CoMap {
	note = co.string
	type = co.literal("personalLink")
	globalLink = co.ref(GlobalLink)
}

export class GlobalLink extends CoMap {
	url = co.string // unique
}

export class GlobalTopic extends CoMap {
	name = co.string
	title = co.string
	sections = co.ref(ListOfSections)
}
export class Section extends CoMap {
	title = co.string
	links = co.ref(ListOfGlobalLinks)
}
export class ListOfSections extends CoList.Of(co.ref(() => Section)) {}

export class Page extends CoMap {
	title = co.string
	// TODO: make rich text
	content = co.string
}

export class TodoItem extends CoMap {
	type = co.literal("todo")
	text = co.string
	done = co.boolean
}

export class ListOfGlobalLinks extends CoList.Of(co.ref(GlobalLink)) {}
export class ListOfPersonalLinks extends CoList.Of(co.ref(PersonalLink)) {}
export class ListOfPersonalTodoItems extends CoList.Of(co.ref(TodoItem)) {}
export class ListOfPages extends CoList.Of(co.ref(Page)) {}
export class ListOfTopics extends CoList.Of(co.ref(GlobalTopic)) {}
export class UserProfile extends CoMap {
	name = co.string
	// TODO: avatar
}
export class UserRoot extends CoMap {
	topicsWantToLearn = co.ref(ListOfTopics)
	topicsLearning = co.ref(ListOfTopics)
	topicsLearned = co.ref(ListOfTopics)
	personalLinks = co.ref(ListOfPersonalLinks)
	pages = co.ref(ListOfPages)
	todos = co.ref(ListOfPersonalTodoItems)
}

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
					topicsWantToLearn: ListOfTopics.create([], { owner: this }),
					topicsLearning: ListOfTopics.create([], { owner: this }),
					topicsLearned: ListOfTopics.create([], { owner: this }),
					personalLinks: ListOfPersonalLinks.create([], { owner: this }),
					pages: ListOfPages.create([], { owner: this }),
					todos: ListOfPersonalTodoItems.create([], { owner: this }),
				},
				{ owner: this },
			)
		}
	}
}
