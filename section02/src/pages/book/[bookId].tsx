import style from "./[bookId].module.css";
import { GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBookDetail from "@/libs/fetch-book-detail";

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { bookId: "1" } },
            { params: { bookId: "2" } },
            { params: { bookId: "3" } }
        ],
        fallback: false
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const bookId = Number(context.params?.bookId);
    const bookDetail = await fetchBookDetail(bookId);

    return {
        props: {
            bookDetail
        }
    }
}

export default function Page({ bookDetail }: InferGetStaticPropsType<typeof getStaticProps>) {

    if (!bookDetail) {
        return <div>Book not found</div>;
    }

    const { title, subTitle, description, author, publisher, coverImgUrl } = bookDetail;
    return (
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
    )
}