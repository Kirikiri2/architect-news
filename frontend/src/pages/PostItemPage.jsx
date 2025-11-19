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

    if (loadingPost) return <p>Загрузка поста...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
    if (!post) return <p>Пост не найден</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            {post.image && (
                <img
                    src={`http://127.0.0.1:8000${post.image}`}
                    alt={post.title}
                    style={{ maxWidth: "100%", marginBottom: "20px" }}
                />
            )}
            <p>{post.content}</p>
            <p>
                Автор: {post.author_email} | Создано: {new Date(post.created_at).toLocaleString()}
            </p>

            <hr />

            <h2>Комментарии</h2>
            {loadingComments ? (
                <p>Загрузка комментариев...</p>
            ) : comments.length === 0 ? (
                <p>Комментариев пока нет.</p>
            ) : (
                comments.map(comment => (
                    <div
                        key={comment.id}
                        style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
                    >
                        <p>{comment.content}</p>
                        <p>
                            Автор: {comment.author_email} | Создано: {new Date(comment.created_at).toLocaleString()}
                        </p>
                    </div>
                ))
            )}

            {token ? (
                <form onSubmit={handleAddComment} style={{ marginTop: "20px" }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий"
                        rows={3}
                        style={{ width: "100%" }}
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Отправка..." : "Отправить комментарий"}
                    </button>
                </form>
            ) : (
                <p>Войдите в систему, чтобы оставлять комментарии.</p>
            )}
        </div>
    );
}
