import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const KdramaCopy = ({ row }: { row: any }): JSX.Element => {
  const { toast } = useToast()

  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copy to clipboard! ✔",
      description: `Drama Name: ${text}`,
    })
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => copyHandler(row.original.title)}
    >
      Copy
    </Button>
  )
}

export default KdramaCopy