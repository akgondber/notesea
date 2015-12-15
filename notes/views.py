import string
import random
from datetime import datetime
from django.utils import dateparse, timezone

from rest_framework import permissions, viewsets
from rest_framework import generics

from notes.models import Note
from notes.serializers import NoteSerializer
from notes.permissions import IsOwnerOfNote

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.order_by('created_at')
    serializer_class = NoteSerializer
    permission_classes = (IsOwnerOfNote,)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsOwnerOfNote(),)

    def get_queryset(self):
        queryset = Note.objects.filter(owner=self.request.user)
        return queryset

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)

        return super(NoteViewSet, self).perform_create(instance)

    def perform_update(self, serializer):
        if serializer.is_valid():
            toggle_publish = self.request.query_params.get('togglepublish', None)
            if toggle_publish:
                if toggle_publish == 't':
                    token = self._get_publish_token()
                    while Note.objects.filter(pub_token=token).exists():
                        token = self._get_publish_token()
                    serializer.save(pub_token=token)
                else:
                    serializer.save(pub_token=None)
            else:
                serializer.save()

    def _get_publish_token(self):
        return ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(40))

class NoteViewInUUIdScopeSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.select_related('owner')
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = Note.objects.filter(owner=self.request.user)
        return queryset

class FilteringNotesAPIView(generics.ListAPIView):
    serializer_class = NoteSerializer
    POSSIBLE_ORDERED_COLUMNS = ['title', 'created_at', 'is_featured', 'category']

    def get_queryset(self):
        queryset = Note.objects.filter(owner=self.request.user)
        sort_param = self.request.query_params.get('sort', None)

        # Hardcoded solution
        # Create multilist for holding at least two items,
        # where
        #   first value is query parameter string
        #   second value is inserted filter for queryset
        #   third (optional) append time for date
        #       amint - append min time
        #       amaxt - append max time

        #  marked as FIXME!

        multifilteredFieldsPairs = []
        multifilteredFieldsPairs.append(['title','title__icontains'])
        multifilteredFieldsPairs.append(['startDate', 'created_at__gte', 'amint'])
        multifilteredFieldsPairs.append(['endDate', 'created_at__lte', 'amaxt'])
        multifilteredFieldsPairs.append(['category', 'category'])
        filter_dict = self._filter_populate(self.request.query_params, multifilteredFieldsPairs)


        sort_fields = None
        if sort_param:
            sort_fields = self._sort_populate(sort_param)

        if filter_dict:
            queryset = queryset.filter(**filter_dict)

        if sort_fields:
            queryset = queryset.order_by(*sort_fields)

        return queryset

    def _filter_populate(self, q_params, neededValues):
        result = {}
        for param in neededValues:
            perhaps_value = q_params.get(param[0], None)
            if perhaps_value:
                if len(param) > 2 and param[2] == 'amint':
                    result[param[1]] = datetime.combine(dateparse.parse_date(perhaps_value),datetime.min.time())
                elif len(param) > 2 and param[2] == 'amaxt':
                    result[param[1]] = datetime.combine(dateparse.parse_date(perhaps_value),datetime.max.time())
                else:
                    result[param[1]] = perhaps_value
        return result

    def _sort_populate(self, str_with_sequence_values, group_delimeter=';', pair_delimeter=':'):
        result = []
        got_parameters = str_with_sequence_values.split(group_delimeter)
        for parameter in got_parameters:
            parameter_with_order = parameter.split(pair_delimeter)
            descendig_direction = True if len(parameter_with_order) > 1 and parameter_with_order[1] == 'desc' else False
            if parameter_with_order[0] in self.POSSIBLE_ORDERED_COLUMNS:
                inserted_value = ('-' + parameter_with_order[0]) if descendig_direction else parameter_with_order[0]
                result.append(inserted_value)
        return result

