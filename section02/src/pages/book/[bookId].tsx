import style from "./[bookId].module.css";
import { GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBookDetail from "@/libs/fetch-book-detail";
import { useRouter } from "next/router";
import MetaHead from "@/components/MetaHead";

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { bookId: "1" } },
            { params: { bookId: "2" } },
            { params: { bookId: "3" } }
        ],
        fallback: true
    };
};

export const getStaticProps = async (
    context: GetStaticPropsContext
) => {
    const bookId = Number(context.params?.bookId);
    const bookDetail = await fetchBookDetail(bookId);


    if (!bookDetail) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            bookDetail
        }
    }
}

export default function Page({ bookDetail }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;
    if (!bookDetail) {
        return (
            <>
                <MetaHead />
                <div>Book not found</div>
            </>
        );
    }

    const { title, subTitle, description, author, publisher, coverImgUrl } = bookDetail;
    return (
        <>
            <MetaHead title={title} ogTitle={title} ogDescription={description} ogImage={coverImgUrl} />
            <div className={style.container}>
                <section>
                    <div
                        className={style.cover_img_container}
                        style={{ backgroundImage: `url(${coverImgUrl})` }}>
                        <img src={coverImgUrl} />
                    </div>
                </section>
                <section>
                    <div className={style.title}>{title}</div>
                    <div className={style.subTitle}>{subTitle}</div>
                </section>
                <section>
                    <div className={style.author}>{author} | {publisher}</div>
                </section>
                <section>
                    <div className={style.description}>{description}</div>
                </section>
            </div>
        </>
    )
}