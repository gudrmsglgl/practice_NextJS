import createReviewAction from "@/app/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ bookId }: { bookId: string }) {

    return (
        <section>
            <form
                className={style.form_container}
                action={createReviewAction}
            >
                <input name="bookId" type="hidden" value={bookId} readOnly />
                <textarea name="content" placeholder="리뷰를 입력해주세요." />
                <div className={style.submit_container}>
                    <input name="author" placeholder="작성자" />
                    <button type="submit">작성하기</button>
                </div>
            </form>
        </section>
    );
}