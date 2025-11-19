import { BookData } from "@/types";

export default async function fetchBookDetail(id: number): Promise<BookData | null> {
    try {
        const url = `http://onebite-books-server-main-blue-pi.vercel.app/book/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }

}