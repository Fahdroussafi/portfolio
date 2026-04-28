import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 md:py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/images/design-mode/grid1.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-lg md:text-xl font-bold">
                  Roussafi Fahd
                </span>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                As a Full-Stack Developer, I transform complex challenges into
                seamless digital experiences through clean code and innovative
                solutions.
              </p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/fahd-roussafi/"
                  className="size-10 bg-accent rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Linkedin className="size-5 text-accent-foreground" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/FahdRoussafi"
                  className="size-10 bg-foreground rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Github className="size-5 text-background" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Pages</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a
                    href="#home"
                    className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experiences"
                    className="hover:text-primary transition-colors">
                    Experiences
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact me</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <a
                    href="mailto:roussafifahd@gmail.com"
                    className="hover:text-primary transition-colors">
                    roussafifahd@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <a
                    href="tel:+212697352024"
                    className="hover:text-primary transition-colors">
                    +212 697352024
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>Made with ❤️ by Fahd</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
