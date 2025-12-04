"use server";

export default async function createReviewAction(formData: FormData) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if (!bookId || !content || !author) {
        console.error(`bookId: ${bookId}, content: ${content}, author: ${author} is required`);
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: "POST",
                body: JSON.stringify({ bookId, content, author })
            }
        );
        console.log(response.status)
    } catch (err) {
        console.error(err);
    }
    console.log(content, author);
}