import github from '@/assets/icons/github.png';
import instagram from '@/assets/icons/instagram.png';
import linkedin from '@/assets/icons/linkedin.png';

type IconLinkProps = { src: string; size?: number; href: string };
const IconLink = ({ src, href, size = 20 }: IconLinkProps) => {
  return (
    <a className='bg-gray-200' href={href} target="”_blank”" rel="noopener noreferrer nofollow">
      <img style={{ height: size, width: size }} src={src} />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="flex w-full pt-3 pb-8 items-center justify-center border-t-2 border-kommy-hair-white-dark">
      <div className='flex gap-3'>
        <IconLink src={github} href="www.swag.com" />
        <IconLink src={instagram} href="www.swag.com" />
        <IconLink src={linkedin} href="www.swag.com" />
      </div>
    </footer>
  );
};

export { Footer };
