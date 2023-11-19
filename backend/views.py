# For this Response import works also for the dashboard View unlike JSONResponse
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect

# User profile Section


@api_view(['POST'])
def create_user_profile(request):
    try:
        if request.method == 'POST':
            serializer = UserProfileSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save() # This triggers the create method in the serializer
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@login_required
def read_user_profile(request, format=None):
    if request.user.is_authenticated:
        authenticated_user = request.user   
        try:
           profile = authenticated_user.userprofile 
           print(profile)

        except Exception as e:
            return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    username = request.data.get('username')
    password = request.data.get('password')
    password_confirmation = request.data.get('confirm_password')
    print('Signup Request Data:', request.data) 

    # Check if passwords match
    if password != password_confirmation:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        print('Signup Request Data:', request.data) 
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({"message":"Signup successful"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Login implementation
@api_view(['GET','POST'])
def login_view(request):
    try:
        if request.method == 'POST':
            username = request.data.get('username')
            password = request.data.get('password')

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)

                user_obj = User.objects.get(username=username)
                userPoints = {
                    "username": user_obj.username,
                    "email": user_obj.email,
                }

                return Response({"message": "Login successful", "user": userPoints}, status=status.HTTP_200_OK)
            
            else:
                return Response("Invalid username or password", status=status.HTTP_401_UNAUTHORIZED)
        elif request.method == "GET":
            if request.accepted_renderer.format == 'js':
            # Return a rendered HTML page (modify as needed)
                return render(request, 'index.js')
            
            # This has refused to work i am comming back for you!!
            else:
            # Return JSON data
                return Response({"message": "This is the login page"}, status=status.HTTP_200_OK)

        else:
            return Response("Method Not Allowed", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    except User.DoesNotExist:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Log the error message for debugging purposes
        print(f"Error in login_view: {str(e)}")
        return Response("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Dashboard
@login_required
@api_view(['GET'])
def dashboard_data(request, username):
    # Fetch user data based on the username
    user = get_object_or_404(User, username=username)
    # print(user)
    # Prepare the user data to be sent as JSON response
    user_data = {
        'username': user.username,
        'email': user.email,
        # Include other user-specific data as needed
    }

    return Response(user_data)

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
        data = request.data
        title = data.get('title')
        content = data.get('content')
        category = data.get('category')
        category_instance = Category.objects.get(pk=category)  #here we are creating an instance of the category eg: 2
        writer = data.get('writer')
        writer_instance = UserProfile.objects.get(pk=writer)
        print(request.data.get('category'))
        if title and content and category and writer:
            article = Article.objects.create(
                title=title,
                content=content,
                category=category_instance,
                writer=writer_instance
            )
            return Response({'message': 'Article created successfully'})
        else:
            return Response({'error': 'Incomplete data provided'}, status=400)
    else:
        return Response({'error': 'Method not allowed'}, status=405)

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
    articles = Article.objects.filter(category=category , status='Published')

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
        Q(title__icontains= search_term) | Q(content__icontains=search_term),status='Published'
    )
    serializer = ArticleSerializer(articles, many=True)

    return Response({'articles': serializer.data})

# pubished Articles
@api_view(['GET'])
def published_articles(request, format=None):
    # Filter articles with a status of published 
    articles =Article.objects.filter(status='Published')

    serializer = ArticleSerializer(articles, many= True)

    return Response({'articles': serializer.data})


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
    # Admin will be doing this part
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

    # if user_profile.role == 'admin':
    # Will be done in admin panel
    if request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # else:
    #     return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

# writers section 

@api_view(['GET'])
def get_writers(request):
    writers = UserProfile.objects.filter(role='writer')
    serializer = UserProfileSerializer(writers, many=True)
    return Response(serializer.data)
