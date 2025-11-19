from rest_framework import serializers
from .models import Post

class PostListSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Post
        fields = ['id', 'title', 'author_email', 'created_at', 'is_published', 'image']

class PostDetailSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author_email', 'created_at', 'updated_at', 'is_published', 'image']

class PostCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'is_published', 'image']
