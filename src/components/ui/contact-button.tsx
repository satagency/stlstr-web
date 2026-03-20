import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type ContactButtonProps = {
  href: string;
  label: string;
  description: string;
};

export function ContactButton({ href, label, description }: ContactButtonProps) {
  return (
    <Link
      href={href}
      className="group flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow"
    >
      <span>
        <span className="block text-base font-semibold uppercase tracking-[0.08em] text-zinc-900 underline-offset-4 group-hover:underline">
          {label}
        </span>
        <span className="block text-sm text-zinc-600">{description}</span>
      </span>
      <ArrowUpRight
        size={20}
        className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900"
      />
    </Link>
  );
}
