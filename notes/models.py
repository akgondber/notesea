from django.db import models
from django.contrib.auth.models import User
from django.db.models import Max

class Note(models.Model):
    owner = models.ForeignKey(User, related_name='notes')
    title = models.CharField(max_length=140)
    content = models.TextField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    uuid = models.IntegerField()

    NOTICE = 'NO'
    REFERENCE = 'RE'
    PERSONAL_TODO = 'PT'
    JOTTING = 'JO'

    CATEGORY_CHOICES = (
        (NOTICE, 'Заметка'),
        (REFERENCE, 'Ссылка'),
        (PERSONAL_TODO, 'TODO'),
        (JOTTING, 'MEMO'),
    )

    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2, default=NOTICE)
    pub_token=models.CharField(max_length=40, null=True, blank=True)

    class Meta:
        ordering = ('-created_at',)

    def save(self, *args, **kwargs):
        if not self.pk:
            max_uuid_for_owner = self.owner.notes.aggregate(Max('uuid'))
            if max_uuid_for_owner['uuid__max']:
                self.uuid = max_uuid_for_owner['uuid__max'] + 1
            else:
                self.uuid = 1
        super(Note, self).save(*args, **kwargs)

