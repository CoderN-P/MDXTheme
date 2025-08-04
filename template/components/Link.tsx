// components/mdx/CustomLink.tsx
import NextLink from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link(props: Props) {
    const { href = "", children, ...rest } = props;

    const isInternal = href.startsWith("/");

    if (isInternal) {
        return (
            <NextLink
                href={href}
                className="text-blue-600 hover:underline decoration-0 hover:decoration-2 transition-all hover:text-blue-500"
                {...rest}
            >
                {children}
            </NextLink>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline decoration-0 hover:decoration-2 transition-all hover:text-blue-500"
            {...rest}
        >
            {children}
        </a>
    );
}