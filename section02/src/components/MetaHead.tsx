import Head from "next/head";

interface MetaHeadProps {
    title?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

export default function MetaHead({
    title = "한입북스",
    ogTitle = "한입북스",
    ogDescription = "한입 북스에 등록된 도서들을 만나보세요",
    ogImage = "/thumbnail.png",
}: MetaHeadProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
        </Head>
    );
}