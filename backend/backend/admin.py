from django.contrib import admin
from .models import UserProfile, Category, Article, ArticleAnalytics, SharedArticle

admin.site.register(UserProfile)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(ArticleAnalytics)
admin.site.register(SharedArticle)