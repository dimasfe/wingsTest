from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import serializers
from .models import Task, Role, Profile

# User
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # Create the user
        Profile.objects.create(user=user) # Create the associated profile
        return user

# User Profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user", "role"]
    
# Update Profile (Role)
class UpdateUserRoleSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

    class Meta:
        model = Profile
        fields = ['role']

# Task
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "description", "due_date", "assigned_to", "author", "created_at", "last_update", "is_completed", "completed_by", "completed_time"]
        extra_kwargs = {
            "author": {"read_only": True},
        }

# Roles
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name', "created_at", "last_update",]
        
    def update(self, instance, validated_data):
        # Update only the fields present in validated_data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.last_update = timezone.now()  # Always update the last_update field
        instance.save()
        return instance