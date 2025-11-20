import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PostItemPage() {
    const { id } = useParams(); // получаем id поста из URL
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem("access_token"); // JWT токен

    // Загрузка поста
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`);
                if (!response.ok) throw new Error("Ошибка при загрузке поста");
                const data = await response.json();
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingPost(false);
            }
        }

        fetchPost();
    }, [id]);

    // Загрузка комментариев
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/comments/?post=${id}`);
            if (!response.ok) throw new Error("Ошибка при загрузке комментариев");
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    // Добавление комментария
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/comments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    post: id,
                    content: newComment,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(JSON.stringify(data));
            }

            setNewComment("");
            fetchComments(); // обновляем список комментариев
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingPost) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-2xl font-serif text-gray-700 italic">Загрузка поста...</p>;
    if (error) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-xl font-serif text-red-700 border-l-4 border-red-700 pl-4 italic">Ошибка: {error}</p>;
    if (!post) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-xl font-serif text-gray-700 italic">Пост не найден</p>;

    return (
        <div className="min-h-screen bg-amber-50 p-8 font-serif">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white border-2 border-gray-800 shadow-lg p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">{post.title}</h1>
                    {post.image && (
                        <img
                            src={`http://127.0.0.1:8000${post.image}`}
                            alt={post.title}
                            className="w-full h-96 object-cover mb-6 border-2 border-gray-800 shadow-md"
                        />
                    )}
                    <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>
                    <div className="border-t border-gray-300 pt-4">
                        <p className="text-sm text-gray-700 italic">
                            Автор: {post.author_email} | Создано: {new Date(post.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 my-8"></div>

                <div className="bg-white border-2 border-gray-800 shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-800 pb-3">Комментарии</h2>
                    {loadingComments ? (
                        <p className="text-gray-600 italic text-center py-4">Загрузка комментариев...</p>
                    ) : comments.length === 0 ? (
                        <p className="text-gray-600 italic text-center py-4">Комментариев пока нет.</p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div
                                    key={comment.id}
                                    className="border-2 border-gray-300 bg-amber-50 p-4 shadow-sm"
                                >
                                    <p className="text-gray-800 mb-3 leading-relaxed">{comment.content}</p>
                                    <p className="text-xs text-gray-600 italic border-t border-gray-300 pt-2">
                                        Автор: {comment.author_email} | Создано: {new Date(comment.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {token ? (
                        <form onSubmit={handleAddComment} className="mt-8 border-t-2 border-gray-300 pt-6">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Добавьте комментарий"
                                rows={3}
                                className="w-full p-4 border-2 border-gray-800 bg-amber-50 text-gray-900 placeholder-gray-600 font-serif focus:outline-none focus:border-gray-900 transition-colors"
                            />
                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="mt-4 bg-gray-900 text-white py-3 px-6 font-bold font-serif hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors border-2 border-gray-900 shadow-md"
                            >
                                {submitting ? "Отправка..." : "Отправить комментарий"}
                            </button>
                        </form>
                    ) : (
                        <p className="text-center text-gray-600 italic py-4 border-2 border-gray-300 bg-amber-50 p-4">
                            Войдите в систему, чтобы оставлять комментарии.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}