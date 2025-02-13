import { debounce } from 'lodash-es'
import { useCallback, useRef, useState } from 'react'
import { searchOverList } from '../lib/fuse'
import placeholders from '../placeholders.json'
import { SectionType } from '../store/useSections'
import { Section } from './Section'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const KEYS_TO_BROWSE = ['title', 'content']

export const SectionCreation = () => {
  const [filteredData, setFilteredData] = useState<SectionType[]>(placeholders)
  const [parent] = useAutoAnimate({ duration: 350, easing: 'ease-in-out' })
  const searchServiceRef = useRef(searchOverList(placeholders, KEYS_TO_BROWSE))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterData = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        setFilteredData(placeholders)
        return
      }

      const newQuery = event.target.value
      const searchResults = searchServiceRef.current.search(newQuery)
      setFilteredData(searchResults)
    }, 500),
    []
  )
  return (
    <div className="flex flex-col gap-y-2.5">
      <h2 className="font-medium text-slate-500">Available Sections</h2>

      <div className="flex flex-col gap-y-1.5">
        <label>
          <MagnifyingGlassIcon height="16" width="16" />
          <input
            onChange={handleFilterData}
            placeholder="Search section..."
            className="bg-white border-2 border-slate-200 text-slate-900 rounded-[4px] px-3 py-2  placeholder:text-slate-900 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <ul className="flex flex-col gap-y-1.5" ref={parent}>
          {filteredData.map((section) => {
            return <Section key={section.title} title={section.title} />
          })}
        </ul>
      </div>
    </div>
  )
}
