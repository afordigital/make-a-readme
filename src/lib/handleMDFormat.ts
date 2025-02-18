import type { SectionType } from "../store/useSections";

export const handleMDFormart = (sectionsArr: SectionType[] | undefined) => {
	return sectionsArr?.map((section) => section.content).join("\n");
};
