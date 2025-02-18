import { Moon, Star, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./theme-provider";

export const Header = () => {
	const { t, i18n } = useTranslation();
	const { setTheme } = useTheme();

	const handleLanguageChange = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	return (
		<header className="slush-bg w-screen p-6 flex items-center justify-between border-b-[1px] border-b-[#CBD5E1]">
			<div className="flex gap-4">
				<img
					src="/favicon.svg"
					alt="file-application-logo"
					className="size-16"
				/>
				<hgroup>
					<h1 className="text-2xl font-bold">{t("title")}</h1>
					<p className="text-slate-400 font-medium text-base">
						{t("description")}
					</p>
				</hgroup>
			</div>
			<div className="flex gap-2">
				<button type="button" onClick={() => handleLanguageChange("es")}>
					Español
				</button>
				<button type="button" onClick={() => handleLanguageChange("en")}>
					English
				</button>
			</div>
			<div>
				<div>
					<button type="button">
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</button>
				</div>
				<div className="flex gap-2">
					<button type="button" onClick={() => setTheme("light")}>
						Light
					</button>
					<button type="button" onClick={() => setTheme("dark")}>
						Dark
					</button>
					<button type="button" onClick={() => setTheme("system")}>
						System
					</button>
				</div>
			</div>
			<a
				href="https://github.com/afordigital/make-a-readme"
				target="_blank"
				rel="noopener noreferrer"
				className="px-4 py-3 cursor-pointer duration-300 ease-in-out flex items-center gap-3 font-medium bg-white hover:bg-slate-50 text-slate-900 rounded-[4px] border-[1px] border-slate-200"
			>
				<Star size={18} className="text-slate-900" />
				Star on Github
			</a>
		</header>
	);
};
