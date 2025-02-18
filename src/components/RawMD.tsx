import { handleMDFormart } from "../lib/handleMDFormat";
import { useSectionsStore } from "../store/useSections";

export const RawMD = () => {
	const { sections } = useSectionsStore();

	return (
		<textarea
			disabled
			readOnly
			className="h-full w-full resize-none overflow-y-auto p-5"
			id="textarea-raw-code"
			value={handleMDFormart(sections)}
		/>
	);
};
