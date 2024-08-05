from django.http import Http404
from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Task, Profile, Role
from .serializers import UserSerializer, TaskSerializer, RoleSerializer, UpdateUserRoleSerializer

# Authentication
## Logout
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)

# Task
## View 
class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return tasks assigned to the current user
        return Task.objects.filter(author=user)

## Create
class TaskCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)

    def perform_create(self, serializer):
        user = self.request.user

        if user.is_authenticated:
            serializer.save(author=user)
        else:
            raise serializers.ValidationError("Authentication required to create a task.")

## Update
class TaskUpdate(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.all()

    def perform_update(self, serializer):
        serializer.save()  # No need to manually set the author field here

## Delete
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)

# User
## View
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get('pk')
        try:
            user = User.objects.get(pk=user_id)
            return user
        except User.DoesNotExist:
            raise Http404

## Create
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

## Update
class UpdateUserRoleView(generics.UpdateAPIView):
    serializer_class = UpdateUserRoleSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Get the profile associated with the current user
        return Profile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        # Save the profile with the new role
        serializer.save()

# Role
## View 
class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [AllowAny]

## Create
class CreateRoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer
    permission_classes = [AllowAny]
    
## Update
class UpdateRoleView(generics.UpdateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [AllowAny]