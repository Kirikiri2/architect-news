import React, { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);

    const token = localStorage.getItem("access_token"); // JWT токен

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/auth/me/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Не удалось загрузить данные пользователя");
                const data = await response.json();
                setUser(data);
                setFormData({
                    username: data.username || "",
                    bio: data.bio || "",
                    avatar: null,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            setFormData({ ...formData, avatar: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const formPayload = new FormData();
        formPayload.append("username", formData.username);
        formPayload.append("bio", formData.bio);
        if (formData.avatar) formPayload.append("avatar", formData.avatar);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/me/update/", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formPayload,
            });
            if (!response.ok) throw new Error("Ошибка при обновлении профиля");
            const data = await response.json();
            setUser(data);
            setEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-2xl font-serif text-gray-700 italic">Загрузка профиля...</p>;
    if (error) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-xl font-serif text-red-700 border-l-4 border-red-700 pl-4 italic">Ошибка: {error}</p>;
    if (!user) return <p className="min-h-screen bg-amber-50 p-8 flex items-center justify-center text-xl font-serif text-gray-700 italic">Пользователь не найден</p>;

    return (
        <div className="min-h-screen bg-amber-50 p-8 font-serif">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white border-2 border-gray-800 shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b-2 border-gray-800 pb-4 tracking-tight">Профиль</h1>
                    
                    {error && <p className="text-red-700 bg-red-50 border-l-4 border-red-700 p-4 mb-6 italic text-sm">{error}</p>}
                    
                    {editing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Имя пользователя"
                                required
                                className="w-full p-4 border-2 border-gray-800 bg-amber-50 text-gray-900 placeholder-gray-600 font-serif focus:outline-none focus:border-gray-900 transition-colors"
                            />
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="О себе"
                                rows={4}
                                className="w-full p-4 border-2 border-gray-800 bg-amber-50 text-gray-900 placeholder-gray-600 font-serif focus:outline-none focus:border-gray-900 transition-colors resize-none"
                            />
                            <div className="border-2 border-gray-800 bg-amber-50 p-4">
                                <label className="block text-gray-700 font-semibold mb-2">Аватар:</label>
                                <input 
                                    type="file" 
                                    name="avatar" 
                                    onChange={handleChange}
                                    className="w-full text-gray-700 font-serif"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-gray-900 text-white py-3 px-6 font-bold font-serif hover:bg-gray-800 transition-colors border-2 border-gray-900 shadow-md"
                                >
                                    Сохранить
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setEditing(false)}
                                    className="flex-1 bg-amber-50 text-gray-900 py-3 px-6 font-bold font-serif hover:bg-amber-100 transition-colors border-2 border-gray-800 shadow-md"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-start gap-6">
                                {user.avatar && (
                                    <img
                                        src={`http://127.0.0.1:8000${user.avatar}`}
                                        alt="Avatar"
                                        className="w-32 h-32 object-cover border-2 border-gray-800 shadow-md"
                                    />
                                )}
                                <div className="flex-1">
                                    <div className="border-b border-gray-300 pb-4 mb-4">
                                        <p className="text-lg text-gray-700">
                                            <span className="font-semibold">Email:</span> {user.email}
                                        </p>
                                        <p className="text-lg text-gray-700">
                                            <span className="font-semibold">Username:</span> {user.username}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 leading-relaxed">
                                            <span className="font-semibold">Bio:</span> {user.bio || "Нет информации о себе"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setEditing(true)}
                                className="w-full bg-gray-900 text-white py-3 px-6 font-bold font-serif hover:bg-gray-800 transition-colors border-2 border-gray-900 shadow-md"
                            >
                                Редактировать профиль
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}