"""notesea URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_nested import routers
from notes.views import NoteViewSet
from notes.views import FilteringNotesAPIView
from notesea.views import UserViewSet
from notesea.views import LoginView
from notesea.views import LogoutView
from notesea.views import IndexView

from notesea.views import published_note_detail
from notes.views import NoteViewInUUIdScopeSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'notes-in-uuid-scope', NoteViewInUUIdScopeSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^published_notes/(?P<note_token>[0-9A-Za-z]{40})$', published_note_detail),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/filterednotes/', FilteringNotesAPIView.as_view(), name='filtered_notes'),
    url(r'^.*$', IndexView.as_view(), name='index')
]
