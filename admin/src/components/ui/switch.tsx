import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5.5 w-10 shrink-0 items-center rounded-full border border-transparent bg-input shadow-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30 data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4.5 rounded-full bg-white shadow-sm ring-0 transition-transform translate-x-0.5 data-[state=checked]:translate-x-[19px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
