import github from '@/assets/icons/github.svg';
import instagram from '@/assets/icons/instagram.svg';
import linkedin from '@/assets/icons/linkedin.svg';

type IconLinkProps = { src: string; size?: number; href: string };
const IconLink = ({ src, href, size = 30 }: IconLinkProps) => {
  return (
    <a href={href} target="”_blank”" rel="noopener noreferrer nofollow">
      <img style={{ height: size, width: size }} src={src} />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center pt-6 pb-5 backdrop-blur-xl">
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
