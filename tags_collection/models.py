import json

from django.contrib.auth.models import User
from django.db import models


class TagsCollection(models.Model):
    title = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.JSONField()

    def set_tags(self, x):
        self.foo = json.dumps(x)

    def get_tags(self):
        return json.loads(self.foo)
