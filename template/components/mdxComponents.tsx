import dynamic from 'next/dynamic';
import React, { HTMLAttributes } from 'react';
import Formula from './Formula';
const Info = dynamic(() => import("./Info"), { ssr: false });
const Warning = dynamic(() => import("./Warning"), { ssr: false });
const Code = dynamic(() => import("./Code"), { ssr: false });
const Blockquote = dynamic(() => import("./Blockquote"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });
const Link = dynamic(() => import("./Link"), { ssr: false });

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type ListProps = HTMLAttributes<HTMLOListElement | HTMLUListElement>;
type ImageProps = React.ComponentProps<typeof Image>;
type CodeProps = React.HTMLAttributes<HTMLElement>;

export const components = {
    h1: (props: HeadingProps) => <h1 className="prose text-4xl text-black font-bold font-inter" {...props} />,
    h2: (props: HeadingProps) => <h2 className="prose text-black text-3xl font-semibold font-inter" {...props} />,
    h3: (props: HeadingProps) => <h3 className="prose text-black text-2xl font-semibold font-inter" {...props} />,
    h4: (props: HeadingProps) => <h4 className="prose text-black text-xl font-semibold font-inter" {...props} />,
    h5: (props: HeadingProps) => <h5 className="prose text-black text-lg font-semibold font-inter" {...props} />,
    img: (props: ImageProps) => (
        <Image
            {...props}
            width={800}
            height={600}
            sizes="(max-width: 768px) 50vw, 400px"
            className="max-w-full h-auto mt-4 mx-auto object-contain rounded-lg"
        />
    ),
    code: (props: CodeProps) => (
        <Code {...props} />
    ),
    p: (props: ParagraphProps) => (
        <p className="text-lg prose leading-7 font-inter" {...props} />
    ),
    ol: (props: ListProps) => (
        <ol className="prose text-lg leading-7 list-decimal ml-4 font-inter" {...props} />
    ),
    ul: (props: ListProps) => (
        <ul className="prose text-lg leading-7 list-disc ml-4 font-inter" {...props} />
    ),
    a: Link,
    blockquote: Blockquote,
    Info,
    Warning,
    Formula,
    Image,
};