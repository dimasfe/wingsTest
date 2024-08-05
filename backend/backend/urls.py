from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Access Django Admin Dashboard
    path("admin/", admin.site.urls),

    # Authentication
    path("api/user/<int:pk>/", UserDetailView.as_view(), name="user_list"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    # Include Apps API
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]