import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("px-5 py-16 sm:px-6 lg:px-8 lg:py-24", className)} {...props}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>}
            {title && (
              <h2 className="text-3xl font-bold tracking-normal text-text-primary sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-7 text-text-secondary sm:text-lg">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
