import { useSectionsStore } from '../store/useSections'
import { toast } from '@pheralb/toast'
import placeholder from '../placeholders.json'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'

type SectionProps = {
  title: string
}

export const Section = ({ title }: SectionProps) => {
  const { addSection, setActiveSection } = useSectionsStore()

  const handleAddSection = (titleToFind: string) => {
    const sectionToAdd = placeholder.find((item) => item.title === titleToFind)
    if (!sectionToAdd) return

    const newSection = {
      ...sectionToAdd,
      placeholderId: sectionToAdd.id,
      id: crypto.randomUUID()
    }

    addSection(newSection)
    setActiveSection(newSection)
    toast.success({
      text: `✨ ${titleToFind} was added successfully!`
    })
  }

  return (
    <Box className="bg-white rounded-md p-3 border-2 h-[48px]">
      <Flex gap="3" align="center" justify={'between'}>
        <Text weight="medium">{title}</Text>
        <Button
          onClick={() => {
            handleAddSection(title)
          }}
          variant="ghost"
          className="cursor-pointer text-slate-600 hover:bg-slate-200 aspect-square size-7 p-0 -translate-x-1 -translate-y-0.5 transition-colors"
        >
          <PlusIcon />
        </Button>
      </Flex>
    </Box>
  )
}
