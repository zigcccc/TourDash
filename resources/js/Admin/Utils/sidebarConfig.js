const sidebarConfig = [
	[
		{
			groupName: "strani",
			groupMainUrl: "/admin/pages/",
			groupContent: [
				{
					linkName: "Vse strani",
					linkUrl: "/pages/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Dodaj novo stran",
					linkUrl: "/pages/add/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Urejanje menijev",
					linkUrl: "/pages/menus/",
					permissions: ["admin", "superadmin"]
				}
			]
		},
		{
			groupName: "nastanitve",
			groupMainUrl: "/admin/accommodations/",
			groupContent: [
				{
					linkName: "Vse nastanitve",
					linkUrl: "/accommodations/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Dodaj novo nastanitev",
					linkUrl: "/accommodations/add/",
					permissions: ["admin", "superadmin"]
				}
			]
		},
		{
			groupName: "objave",
			groupMainUrl: "/admin/posts/",
			groupContent: [
				{
					linkName: "Vse objave",
					linkUrl: "/posts/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Dodaj novo objavo",
					linkUrl: "/pages/add/",
					permissions: ["admin", "superadmin"]
				}
			]
		}
	],
	[
		{
			groupName: "uporabniki",
			groupMainUrl: "/admin/users/",
			groupContent: [
				{
					linkName: "Pregled uporabnikov",
					linkUrl: "/users/",
					permissions: ["superadmin"]
				},
				{
					linkName: "Moj profil",
					linkUrl: "/users/my-profile/",
					permissions: ["admin", "superadmin"]
				}
			]
		}
	]
];

export default sidebarConfig;
