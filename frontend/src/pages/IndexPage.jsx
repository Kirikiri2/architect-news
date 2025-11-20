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

    if (loading) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-2xl font-serif text-gray-700 italic">Загрузка постов...</p>;
    if (error) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-xl font-serif text-red-700 border-l-4 border-red-700 pl-4 italic">Ошибка: {error}</p>;

    return (
        <div className="min-h-screen bg-amber-50 p-8 font-serif">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center border-b-2 border-gray-800 pb-4 tracking-tight">Все посты</h1>
                {posts.length === 0 ? (
                    <p className="text-center py-16 text-2xl text-gray-600 italic">Постов пока нет.</p>
                ) : (
                    posts.map(post => (
                        <div
                            key={post.id}
                            className="bg-white border-2 border-gray-800 shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
                        >
                            <NavLink to={`/posts/${post.id}`} className="block no-underline text-inherit hover:text-inherit">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-gray-700 transition-colors">{post.title}</h2>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover mb-4 border-2 border-gray-800 shadow-md"
                                    />
                            </NavLink>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 border-t border-gray-300 pt-4">
                                <p className="flex items-center">
                                    <span className="font-semibold mr-2">Автор:</span>
                                    <span className="italic">{post.author_email}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="font-semibold mr-2">Создано:</span>
                                    <span className="italic">{new Date(post.created_at).toLocaleString()}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="font-semibold mr-2">Статус:</span>
                                    <span className={`italic ${post.is_published ? 'text-green-700' : 'text-amber-700'}`}>
                                        {post.is_published ? "Опубликовано" : "Черновик"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}