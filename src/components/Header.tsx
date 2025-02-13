import { Star } from 'lucide-react'

export const Header = () => {
  return (
    <header className="slush-bg w-screen p-6 flex items-center justify-between border-b-[1px] border-b-[#CBD5E1]">
      <div className="flex gap-4">
        <img
          src="/favicon.svg"
          alt="file-application-logo"
          className="size-16"
        />
        <hgroup>
          <h1 className="text-2xl font-bold">README Generator</h1>
          <p className="text-slate-400 font-medium text-base">
            Create beautiful documentation
          </p>
        </hgroup>
      </div>
      <a className="px-4 py-3 cursor-pointer duration-300 ease-in-out flex items-center gap-3 font-medium bg-white hover:bg-slate-50 text-slate-900 rounded-[4px] border-[1px] border-slate-200">
        <Star size={18} className="text-slate-900" />
        Star on Github
      </a>
    </header>
  )
}
