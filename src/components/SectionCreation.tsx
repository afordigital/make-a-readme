import { Section } from './Section'
import placeholders from '../placeholders.json'
import { Search } from 'lucide-react'
import { useState } from 'react'

export const SectionCreation = () => {
  const [filteredData, setFilteredData] = useState('')

  const filterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredData(event.target.value)
  }

  return (
    <>
      <div className="flex my-2 w-full items-center border-[1.5px] border-[#99ABE4] gap-4 rounded-md px-4">
        <Search className="text-[#99ABE4]" />
        <input
          placeholder="Search for a section"
          className="bg-transparent focus:bg-transparent focus:outline-none py-5 h-full w-full"
          onChange={filterData}
        />
      </div>

      {placeholders
        .filter((value) =>
          value.title.toUpperCase().includes(filteredData.toUpperCase())
        )
        .sort(
          (a, b) =>
            +!!b.title.toUpperCase().startsWith(filteredData.toUpperCase()) -
            +!!a.title.toUpperCase().startsWith(filteredData.toUpperCase())
        )
        .map((section) => {
          return <Section key={section.title} title={section.title} />
        })}
    </>
  )
}
