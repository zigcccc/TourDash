export const editingPageDummyContent = [
	{
		uid: 1,
		type: "typography",
		data: "Glavni naslov",
		hasParent: false,
		options: {
			tag: "h1",
			style: {
				textAlign: "center",
				color: "#2d2d2d",
				fontSize: "48px"
			}
		}
	},
	{
		uid: 2,
		type: "columns",
		hasParent: false,
		options: {
			amount: 2,
			style: {}
		},
		data: [
			{
				uid: 3,
				type: "typography",
				hasParent: true,
				parentBlockUid: 2,
				data:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				options: {
					tag: "p",
					style: {
						textAlign: "justify"
					}
				}
			},
			{
				uid: 4,
				type: "typography",
				hasParent: true,
				parentBlockUid: 2,
				data:
					"Consectetur adipiscing elit, lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				options: {
					tag: "p",
					style: {
						textAlign: "justify"
					}
				}
			}
		]
	},
	{
		uid: 5,
		type: "typography",
		hasParent: false,
		data:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		options: {
			tag: "p",
			style: {
				textAlign: "justify"
			}
		}
	}
];
