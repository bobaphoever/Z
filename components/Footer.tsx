import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="sticky flex flex-wrap px-3 mt-4 text-sm leading-7 lg:px-0 top-20">
      <span className="pr-3 font-bold text-gray-500 dark:text-gray-300">
        © Z
      </span>
      <span className="pr-3">
        <Link 
          href="" 
          target="_blank" 
          rel="noreferrer" 
          passHref>
          About
        </Link>
      </span>
      <span className="pr-3">
        <Link href="/" passHref>
          Terms
        </Link>
      </span>
      <span className="pr-3">
        <Link href="/" passHref>
          Privacy
        </Link>
      </span>
      <a
        className="pr-3"
        href=""
        target="_blank"
        rel="noreferrer"
      >
        Status
      </a>
      <a
        className="pr-3"
        href=""
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      <a
        className="pr-3 hover:text-slate-900"
        href=""
        target="_blank"
        rel="noreferrer"
      >
        ▲ Powered by Vercel
      </a>
    </footer>
  )
}

export default Footer
