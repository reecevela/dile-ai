// components/layout/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, User, Bell, Notebook, UserIcon } from "lucide-react";

const Header = () => {
	const pathname = usePathname();

	const navItems = [
		{
			label: "Notes",
			href: "/notes",
			icon: <Notebook className="w-4 h-4" />,
		},
		{
			label: "Reminders",
			href: "/reminders",
			icon: <Bell className="w-4 h-4" />,
		},
		{
			label: "Community",
			href: "/profiles",
			icon: <UserIcon className="w-4 h-4" />,
		},
		{
			label: "Profile",
			href: "/account",
			icon: <User className="w-4 h-4" />,
		},
		{
			label: "Settings",
			href: "/settings",
			icon: <Settings className="w-4 h-4" />,
		},
	];

	if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
		return null;
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-cream/10 bg-background/80 backdrop-blur-sm">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo/Brand */}
					<Link
						href="/"
						className="text-cream font-bold text-xl hover:text-primary transition-colors"
					>
						Dile
					</Link>

					{/* Navigation */}
					<nav className="flex items-center space-x-1">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`
                  flex items-center px-3 py-2 rounded-md text-sm
                  transition-colors duration-200
                  ${
						pathname === item.href
							? "text-primary bg-primary/10"
							: "text-cream/60 hover:text-cream hover:bg-cream/10"
					}
                `}
							>
								<span className="mr-2">{item.icon}</span>
								<span className="hidden sm:inline">
									{item.label}
								</span>
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
