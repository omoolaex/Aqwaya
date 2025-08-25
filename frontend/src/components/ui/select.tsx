import * as React from "react";
import { cn } from "@/lib/utils";

// Root Select
interface SelectContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const Select = React.createContext<SelectContextType | null>(null);

function SelectProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Select.Provider value={{ open, setOpen, value, setValue }}>
      <div className="relative">{children}</div>
    </Select.Provider>
  );
}

// Trigger
const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(Select);
  if (!context) {
    throw new Error("SelectTrigger must be used within a SelectProvider");
  }
  const { open, setOpen } = context;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    />
  );
});
SelectTrigger.displayName = "SelectTrigger";

// Value
function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(Select);
  if (!context) {
    throw new Error("SelectValue must be used within a SelectProvider");
  }
  const { value } = context;

  return (
    <span className="text-muted-foreground">
      {value ? value : placeholder}
    </span>
  );
}

// Content (dropdown)
function SelectContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(Select);
  if (!context) {
    throw new Error("SelectContent must be used within a SelectProvider");
  }
  const { open } = context;

  if (!open) return null;

  return (
    <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
      {children}
    </div>
  );
}

// Item (option)
function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  const context = React.useContext(Select);
  if (!context) {
    throw new Error("SelectItem must be used within a SelectProvider");
  }
  const { setValue, setOpen } = context;

  return (
    <div
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
    >
      {children}
    </div>
  );
}

export {
  SelectProvider as Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
