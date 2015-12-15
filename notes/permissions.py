from rest_framework import permissions


class IsOwnerOfNote(permissions.BasePermission):
    def has_object_permission(self, request, view, note):
        if request.user:
            return note.owner == request.user
        return False