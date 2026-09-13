import github from '@/assets/icons/github.png';
import instagram from '@/assets/icons/instagram.png';
import linkedin from '@/assets/icons/linkedin.png';

type IconLinkProps = { src: string; size?: number; href: string };
const IconLink = ({ src, href, size = 20 }: IconLinkProps) => {
  return (
    <a href={href} target="”_blank”" rel="noopener noreferrer nofollow">
      <img style={{ height: size, width: size }} src={src} />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="border-kommy-hair-white-dark flex w-full items-center justify-center border-t-2 pt-3 pb-8">
      <div className="flex gap-3">
        <IconLink src={github} href="https://github.com/jellyrolljunior" />
        <IconLink
          src={instagram}
          href="https://www.instagram.com/river.flows__"
        />
        <IconLink
          src={linkedin}
          href="https://www.linkedin.com/in/jellyrolljunior/"
        />
      </div>
    </footer>
  );
};

export { Footer };
