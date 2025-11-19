import React, { useEffect, useState } from "react";
import { NavLink} from "react-router";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/posts/");
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке постов");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) return <p>Загрузка постов...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <h1>Все посты</h1>
            {posts.length === 0 ? (
                <p>Постов пока нет.</p>
            ) : (
                posts.map(post => (
                    <div
                        key={post.id}
                        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}
                    >
                        <NavLink to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <h2>{post.title}</h2>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{ maxWidth: "100%", marginBottom: "10px" }}/>
                        </NavLink>
                        <p>Автор: {post.author_email}</p>
                        <p>Создано: {new Date(post.created_at).toLocaleString()}</p>
                        <p>Статус: {post.is_published ? "Опубликовано" : "Черновик"}</p>
                    </div>
                ))
            )}
        </div>
    );
}
