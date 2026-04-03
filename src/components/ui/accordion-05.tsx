import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = {
  id: string;
  title: string;
  content: string;
};

type Accordion05Props = {
  items: FaqItem[];
  defaultValue?: string;
};

export function Accordion05({ items, defaultValue }: Accordion05Props) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion
        type="single"
        defaultValue={defaultValue ?? items[0]?.id}
        collapsible
        className="w-full"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="last:border-b border-[#7B2CBF]/10"
          >
            <AccordionTrigger
              className={cn(
                "text-left pl-6 md:pl-14 overflow-hidden",
                "text-[#1A122E]/20 duration-200 hover:no-underline cursor-pointer",
                "-space-y-6 data-[state=open]:space-y-0",
                "data-[state=open]:text-[#1A122E]",
                "[&>svg]:hidden",
              )}
            >
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs font-mono text-[#BC6C25]/60 mt-1.5 shrink-0">{item.id}</p>
                <h3 className="uppercase text-2xl md:text-4xl font-black tracking-tighter leading-tight">
                  {item.title}
                </h3>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-[#524769]/80 pb-6 pl-6 md:px-20 text-sm leading-relaxed">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
