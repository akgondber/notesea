from rest_framework import serializers
from notes.models import Note
from notesea.serializers import UserSerializer

class NoteSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True, required=False)
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = Note

        fields = ('id', 'owner', 'title', 'content',
                  'is_featured', 'created_at', 'category_display', 'updated_at',
                  'uuid', 'pub_token', 'category',)
        read_only_fields = ('id', 'created_at', 'updated_at', 'uuid', 'pub_token',)

    def get_category_display(self, obj):
        return obj.get_category_display()

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(NoteSerializer, self).get_validation_exclusions()

        return exclusions + ['owner']

