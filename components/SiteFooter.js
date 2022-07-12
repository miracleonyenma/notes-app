import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { CodeIcon } from "@heroicons/react/solid";

const SiteFooter = ({}) => {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <header className="footer-header">
          <div className="logo-cont">
            <figure className="site-logo">
              <Link href={`/`} passHref={true}>
                📝 Nottes
              </Link>
            </figure>
            <p>
              {" "}
              Built with ❤ by{" "}
              <a href="http://miracleio.me" target="_blank" rel="noopener noreferrer">
                Miracleio ✨
              </a>
            </p>
          </div>

          <nav className="site-footer-nav">
            <ul className="links">
              <li className="link">
                <a href="#" onClick={() => signIn()}>
                  Sign In
                </a>
              </li>
              <li className="link">
                <a href="https://github.com/miracleonyenma/notes-app" target="_blank" rel="noopener noreferrer" className="w-icon">
                  <CodeIcon className="icon solid" />
                  <span>View on Github</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <p className="text-sm mt-8"> &copy; Copyright 2022 Nottes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
