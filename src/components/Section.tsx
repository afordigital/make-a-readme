import { useSectionsStore } from '../store/useSections'
import { toast } from '@pheralb/toast'
import placeholder from '../placeholders.json'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { PlusCircledIcon } from '@radix-ui/react-icons'

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
    <Box
      p="4"
      style={{
        backgroundColor: 'var(--gray-a2)',
        borderRadius: 'var(--radius-3)'
      }}
    >
      <Flex gap="3" align="center" justify={'between'}>
        <Text weight="medium">{title}</Text>
        <Button
          onClick={() => {
            handleAddSection(title)
          }}
          variant="ghost"
          className="cursor-pointer"
        >
          <PlusCircledIcon />
        </Button>
      </Flex>
    </Box>
  )
}
