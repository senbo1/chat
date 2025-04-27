'use client'

import { useState } from "react";
import { Button } from "@chat/ui/components/button"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  textToCopy: string;
  ariaLabel?: string;
  copiedAriaLabel?: string;
}

export function CopyButton({
  textToCopy,
  ariaLabel = "Copy",
  copiedAriaLabel = "Copied!"
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000) 
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label={hasCopied ? copiedAriaLabel : ariaLabel}
    >
      {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
