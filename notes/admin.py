from django.contrib import admin
from notes.models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'is_featured', 'owner', 'created_at',)
    list_filter = ['created_at']
    fields = ['owner', 'title', 'content', 'is_featured', 'category',]
    search_fields = ['title', 'category']

admin.site.register(Note, NoteAdmin)
