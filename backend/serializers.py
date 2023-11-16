from rest_framework import serializers
from django.contrib.auth.models import User
from . models import *


# user Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

# UserProfile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['id','user', 'role', 'bio']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'description']

# Article Serializer 

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title','content','status', 'category','writer', 'created_at', 'updated_at']

# ArticleAnalytics Serializer

class ArticleAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleAnalytics
        field = ['id','article', 'views', 'shares']

# SharedArticle Serializer

class SharedArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedArticle
        field = ['id','article', 'ip_address', 'shared_at']