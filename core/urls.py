from django.urls import path

from . import views

urlpatterns = [
    path("", views.HomePageView.as_view(), name="index"),
    path("graphics", views.GraphicsView.as_view(), name="graphics"),
    path("shows", views.ShowListView.as_view(), name="show-list")
]