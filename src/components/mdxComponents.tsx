import dynamic from 'next/dynamic';
import React, { HTMLAttributes } from 'react';

const Info = dynamic(() => import("./Info.js"), { ssr: false });
const Warning = dynamic(() => import("./Warning.js"), { ssr: false });
const Code = dynamic(() => import("./CodeBlock.js"), { ssr: false });
const Blockquote = dynamic(() => import("./Blockquote.js"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });
const Link = dynamic(() => import("./Link.js"), { ssr: false });
const Formula = dynamic(() => import("./Formula.js"), { ssr: false });

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {}
interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}
interface ListProps extends HTMLAttributes<HTMLOListElement | HTMLUListElement> {}
interface ImageProps extends React.ComponentProps<typeof Image> {}

interface CustomH1Props extends HeadingProps {}
interface CustomH2Props extends HeadingProps {}
interface CustomH3Props extends HeadingProps {}
interface CustomH4Props extends HeadingProps {}
interface CustomH5Props extends HeadingProps {}
interface CustomImgProps extends ImageProps {}
interface CustomCodeProps extends React.HTMLAttributes<HTMLElement> {}
interface CustomPProps extends ParagraphProps {}
interface CustomOlProps extends ListProps {}
interface CustomUlProps extends ListProps {}

export const components = {
    h1: (props: CustomH1Props) => <h1 className="prose text-4xl font-bold font-inter" {...props} />,
    h2: (props: CustomH2Props) => <h2 className="prose text-black text-3xl font-semibold font-inter" {...props} />,
    h3: (props: CustomH3Props) => <h3 className="prose text-black text-2xl font-semibold font-inter" {...props} />,
    h4: (props: CustomH4Props) => <h4 className="prose text-black text-xl font-semibold font-inter" {...props} />,
    h5: (props: CustomH5Props) => <h5 className="prose text-black text-lg font-semibold font-inter" {...props} />,
    img: (props: CustomImgProps) => (
        <Image
            {...props}
            width={800}
            height={600}
            sizes="(max-width: 768px) 50vw, 400px"
            className="max-w-full h-auto mt-4 mx-auto object-contain rounded-lg"
        />
    ),

    code: (props: CustomCodeProps) => (
        <Code {...props} />
    ),
    p: (props: CustomPProps) => (
        <p className="text-lg prose leading-7 font-medium font-inter" {...props} />
    ),
    ol: (props: CustomOlProps) => (
        <ol className="prose text-lg font-medium leading-7 list-decimal ml-4 font-inter" {...props} />
    ),
    ul: (props: CustomUlProps) => (
        <ul className="prose text-lg font-medium leading-7 list-disc ml-4 font-inter" {...props} />
    ),
    a: Link,
    blockquote: Blockquote,
    Info,
    Warning,
    Formula: (props: React.ComponentProps<typeof Formula>) => <Formula {...props} />,
}