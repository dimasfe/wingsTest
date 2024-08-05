from django.urls import path
from .views import *

urlpatterns = [
    # Authentication 
    path('logout/', LogoutView.as_view(), name='logout'),

    # Users
    path('users/create/', CreateUserView.as_view(), name='create-user'),
    path('users/update/roles/<int:pk>/', UpdateUserRoleView.as_view(), name='update-user-role'),

    # Tasks
    path("tasks/", TaskListView.as_view(), name="tasks-list"),
    path("tasks/create/", TaskCreate.as_view(), name="tasks-create"),
    path("tasks/update/<int:pk>/", TaskUpdate.as_view(), name="tasks-update"),  # Handles updating a task
    path("tasks/delete/<int:pk>/", TaskDelete.as_view(), name="tasks-delete"),

    # Roles
    # Notes : Roles can only be created, updated and viewed
    path('roles/', RoleListView.as_view(), name='roles-list'), # List 
    path('roles/create/', CreateRoleView.as_view(), name='role-create'),  # Create 
    path('roles/update/<int:pk>/', UpdateRoleView.as_view(), name='role-update'),  # Update a role
]