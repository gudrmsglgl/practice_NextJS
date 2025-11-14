import style from "./[bookId].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBookDetail from "@/libs/fetch-book-detail";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const bookId = Number(context.params?.bookId);
    const bookDetail = await fetchBookDetail(bookId);

    return {
        props: {
            bookDetail
        }
    }
}

export default function Page({ bookDetail }: InferGetServerSidePropsType<typeof getServerSideProps>) {

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