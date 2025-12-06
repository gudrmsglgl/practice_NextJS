export default function ReviewSubmitButton({
    bookId, content, author
}: { bookId: string, content: string, author: string }
) {
    return (
        <div>
            <button type="submit">작성하기</button>
        </div>

    )
}
