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
			groupName: "namestitve",
			groupMainUrl: "/admin/accommodations/",
			groupContent: [
				{
					linkName: "Vse namestitve",
					linkUrl: "/accommodations/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Dodaj novo namestitev",
					linkUrl: "/accommodations/add/",
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
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Moj profil",
					linkUrl: "/users/my-profile/",
					permissions: ["admin", "superadmin"]
				}
			]
		}
	],
	[
		{
			groupName: "nastavitve",
			groupMainUrl: "/admin/settings/",
			groupContent: [
				{
					linkName: "Pregled nastavitev",
					linkUrl: "/settings/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Nastavitve portala",
					linkUrl: "/settings/customization/",
					permissions: ["admin", "superadmin"]
				},
				{
					linkName: "Nastavitve administracije",
					linkUrl: "/settings/administration/",
					permissions: ["superadmin"]
				}
			]
		}
	]
];

export default sidebarConfig;
