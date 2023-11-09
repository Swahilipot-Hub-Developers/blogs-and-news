# For this Response import works also for the dashboard View unlike JSONResponse
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect

# User profile Section


@api_view(['POST'])
def create_user_profile(request):
    try:
        if request.method == 'POST':
            serializer = UserProfileSerializer(data=request.data)

            if serializer.is_valid():
                username = serializer.validated_data['username']
                role = serializer.validated_data['role']
                bio = serializer.validated_data['bio']

                user, created = User.objects.get_or_create(username=username)
                if created:
                    user.set_password('default_password')
                    user.save()

                profile, created = UserProfile.objects.get_or_create(user=user)
                profile.role = role
                profile.bio = bio
                profile.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def read_user_profile(request, username, format=None):
    try:
        user = get_object_or_404(User, username=username)
        profile = user.userprofile
        serializer = UserProfileSerializer(profile)  # Serialize the UserProfile object
        return Response(serializer.data)  # Return the serialized data as a JSON response
    except User.DoesNotExist:
        return Response("User not found", status=404)
    except UserProfile.DoesNotExist:
        return Response("User profile not found", status=404)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['PUT'])
def update_user_profile(request, username):
    try:
        user = get_object_or_404(User, username=username)
        profile = user.userprofile

        if request.method == 'PUT':
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)@api_view(['PUT'])
    

api_view(['DELETE'])
def delete_user_profile(request, username):
    try:
        user = get_object_or_404(User, username=username)
        profile = user.userprofile

        if request.method == 'DELETE':
            profile.delete()
            return Response("User profile deleted successfully", status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def user_profile_list(request):
    try:
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)  # Serialize the list of profiles
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# signup implementation

@api_view(['POST'])
def signup(request):
    try:
        # Deserialize user and profile data from the request
        user_serializer = UserSerializer(data=request.data)
        profile_serializer = UserProfileSerializer(data=request.data)

        if user_serializer.is_valid() and profile_serializer.is_valid():
            # Create the user and profile
            user = user_serializer.save()
            profile = profile_serializer.save(user=user)

            return Response("User profile created successfully", status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Login implementation
@api_view(['POST'])
def login_view(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response("Login successful", status=status.HTTP_200_OK)
        else:
            return Response("Invalid username or password", status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Article Section

@api_view(['GET','POST'])
def article_list(request, format=True):
    if request.method == 'GET':        
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        # Return this as a dictionry or use safe = True
        return Response({"articles": serializer.data})
    # Implement validation where only the user/writer can post
    if request.method == 'POST':
        serializer =ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request,id, format=None ):
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    # user_profile = UserProfile.objects.get(user =request.user)
    # if user_profile.role == 'admin':
    if request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        Article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    #  else:
    #     return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
# Get Article based on filtering the category 
@api_view(['GET'])
def articles_by_category(request, category_id, format=None):
    try:
        category =Category.objects.get(pk=category_id)
    except Article.DoesNotExist:
        return Response(status= status.HTTP_404_NOT_FOUND)
    articles = Article.objects.filter(category=category)

    # serialize the articles 
    serializer = ArticleSerializer(articles, many=True)

    return Response({'articles':serializer.data})
# Implement search for articles
@api_view(['GET'])
def search_articles(request, format=None):
    # Get search term from the query parameter
    search_term = request.GET.get('q', '')
    
    # Perform case-insensitive search
    articles = Article.objects.filter(
        Q(title__icontains= search_term) | Q(content__icontains=search_term)
    )
    serializer = ArticleSerializer(articles, many=True)

    return Response({'articles': serializer.data})

# pubished Articles
@api_view(['GET'])
def published_articles(request, format=None):
    # Filter articles with a status of published 
    articles =Article.objects.filter(status='Published')

    serializer = ArticleSerializer(articles, many= True)

    return Response({'article': serializer.data})


# View to count article views
@api_view(['GET'])
def view_article(request, article_id, format=None):
    try:
        article = Article.objects.get(pk=article_id)
        analytics = ArticleAnalytics.objects.get(article=article)
        analytics.views += 1  # Increment the views count
        analytics.save()
        return Response({'message': 'Article viewed successfully.'})
    except Article.DoesNotExist:
        return Response({'message': 'Article not found.'}, status=status.HTTP_404_NOT_FOUND)
    except ArticleAnalytics.DoesNotExist:
        return Response({'message': 'Article not found.'}, status=status.HTTP_404_NOT_FOUND)


# View to count article shares
@api_view(['POST'])
def share_article(request, article_id, format=None):
    try:
        article = Article.objects.get(pk=article_id)
        analytics = ArticleAnalytics.objects.get(article=article)
        analytics.shares += 1  # Increment the shares count
         # Create a new SharedArticle instance to record the sharing
        shared_article = SharedArticle(article=article, ip_address=request.META['REMOTE_ADDR'])
        shared_article.save()
        analytics.save()
        return Response({'message': 'Article shared successfully.'})
    except Article.DoesNotExist:
        return Response({'message': 'Article not found.'}, status=status.HTTP_404_NOT_FOUND)
    




# Categories Section
@api_view(['GET','POST'])
def category_list(request, format=None):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories,many=True)
        return Response({"categories":serializer.data})
    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request,id, format=None):
    # Try using hte role from request.body to filter some operation
    try:
        category = Category.objects.get(pk=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
    user_profile = UserProfile.objects.get(user =request.user)

    if user_profile.role == 'admin':

        if request.method == 'PUT':
            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)


