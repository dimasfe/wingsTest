from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Task Table
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateTimeField()

    # Assign to users
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_tasks', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(blank=True, null=True)

    # Mark As Complete
    is_completed = models.BooleanField(default=False)
    completed_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="completed_tasks", null=True, blank=True)
    completed_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.pk:  # Check if the object already exists
            self.last_update = timezone.now()
        super().save(*args, **kwargs)
    
# Role Table
class Role(models.Model):
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk:  # Check if the object already exists
            self.last_update = timezone.now()
        super().save(*args, **kwargs)

# Profile Table    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"