import { debounce } from "lodash-es";
import { Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { searchOverList } from "../lib/fuse";
import placeholders from "../placeholders.json";
import { SectionType } from "../store/useSections";
import { Section } from "./Section";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const KEYS_TO_BROWSE = ["title", "content"];

export const SectionCreation = () => {
  const [filteredData, setFilteredData] = useState<SectionType[]>(placeholders);
  const [parent] = useAutoAnimate({ duration: 350, easing: "ease-in-out" });
  const searchServiceRef = useRef(searchOverList(placeholders, KEYS_TO_BROWSE));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterData = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        setFilteredData(placeholders);
        return;
      }

      const newQuery = event.target.value;
      const searchResults = searchServiceRef.current.search(newQuery);
      setFilteredData(searchResults);
    }, 500),
    []
  );
  return (
    <>
      <div className="flex mb-2 w-full items-center border-[1.5px] border-[#99ABE4] gap-4 rounded-md px-4">
        <input
          className="bg-transparent focus:bg-transparent focus:outline-none py-5 h-full w-full"
          onChange={handleFilterData}
          placeholder="Search section..."
        />
        <Search className="text-[#99ABE4]" />
      </div>
      <ul className="flex flex-col gap-y-1 w-full flex-1" ref={parent}>
        {filteredData.map((section) => {
          return <Section key={section.title} title={section.title} />;
        })}
      </ul>
    </>
  )
}
