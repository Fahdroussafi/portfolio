import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0B0B] text-[#0B0B0B] dark:text-white py-12 md:py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/images/design-mode/grid1.png"
                    alt="Paperfolio X Logo"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-lg md:text-xl font-bold dark:text-white">
                  Roussafi Fahd
                </span>
              </div>
              <p className="text-[#393939] dark:text-gray-400 mb-6 text-sm leading-relaxed">
                As a Full-Stack Developer, I transform complex challenges into
                seamless digital experiences through clean code and innovative
                solutions.
              </p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/fahd-roussafi/"
                  className="size-10 bg-blue-500 dark:bg-blue-500 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Linkedin className="size-5 text-white dark:text-white" />
                </a>
                <a
                  target="_blank"
                  href="https://github.com/FahdRoussafi"
                  className="size-10 bg-[#0B0B0B] dark:bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Github className="size-5 text-white dark:text-black" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Pages</h3>
              <ul className="space-y-2 text-[#393939] dark:text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black dark:hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Contact me</h3>
              <ul className="space-y-3 text-[#393939] dark:text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <a
                    href="mailto:roussafifahd@gmail.com"
                    className="hover:text-black dark:hover:text-white transition-colors">
                    roussafifahd@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <a
                    href="tel:+212697352024"
                    className="hover:text-black dark:hover:text-white transition-colors">
                    +212 697352024
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-black/10 dark:border-white/10 pt-8 text-center text-[#393939] dark:text-gray-400 text-sm">
            <p>Made with ❤️ by Fahd</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
