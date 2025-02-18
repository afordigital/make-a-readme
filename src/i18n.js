import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: {
					title: "README Generator",
					description: "Create beautiful documentation",
					currentSection: "Current Sections",
					availableSection: "Available Sections",
				},
			},
			es: {
				translation: {
					title: "Generador de READMEs",
					description: "Crea linda documentación",
					currentSection: "Secciones actuales",
					availableSection: "Secciones disponibles",
				},
			},
		},
	});

export default i18n;
