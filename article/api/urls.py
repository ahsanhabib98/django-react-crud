from django.urls import path
from .views import (
    ArticleListView,
    ArticleCreatView,
    ArticleUpdateView,
    ArticleDeleteView,
    ArticleDetailView
)

app_name = 'article'

urlpatterns = [
    path('', ArticleListView.as_view(), name='article-list'),
    path('<pk>/detail/', ArticleDetailView.as_view(), name='article-detail'),
    path('create/', ArticleCreatView.as_view(), name='article-create'),
    path('<pk>/update/', ArticleUpdateView.as_view(), name='article-update'),
    path('<pk>/delete/', ArticleDeleteView.as_view(), name='article-delete'),
]