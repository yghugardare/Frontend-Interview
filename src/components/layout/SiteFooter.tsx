import { cn } from "@/lib/utils"

type SiteFooterProps = {
  className?: string
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("bg-neutral-950 text-neutral-200", className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-white/10">
              <span className="text-xs font-semibold">CA</span>
            </div>
            <span className="text-sm font-semibold tracking-wide">CA MONK</span>
          </div>
          <p className="text-sm text-neutral-300">
            Empowering the next generation of financial leaders with tools,
            community, and knowledge.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">RESOURCES</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li>Blog</li>
            <li>Webinars</li>
            <li>Case Studies</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">PLATFORM</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li>Job Board</li>
            <li>Practice Tests</li>
            <li>Mentorship</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">CONNECT</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CA Monk. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-neutral-200" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-neutral-200" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

