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

    if (loading) return <p>Загрузка профиля...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
    if (!user) return <p>Пользователь не найден</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1>Профиль</h1>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Имя пользователя"
                        required
                    />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="О себе"
                    />
                    <input type="file" name="avatar" onChange={handleChange} />
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setEditing(false)}>Отмена</button>
                </form>
            ) : (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Bio: {user.bio}</p>
                    {user.avatar && (
                        <img
                            src={`http://127.0.0.1:8000${user.avatar}`}
                            alt="Avatar"
                            style={{ maxWidth: "200px" }}
                        />
                    )}
                    <button onClick={() => setEditing(true)}>Редактировать профиль</button>
                </div>
            )}
        </div>
    );
}
