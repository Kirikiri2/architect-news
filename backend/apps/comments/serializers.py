from rest_framework import serializers
from .models import Comment

class CommentListSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author_email', 'content', 'created_at', 'is_active']

class CommentDetailSerializer(serializers.ModelSerializer):
    author_email = serializers.ReadOnlyField(source='author.email')
    post_title = serializers.ReadOnlyField(source='post.title')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'post_title', 'author_email', 'content', 'created_at', 'updated_at', 'is_active']

class CommentCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['post', 'content', 'is_active']
