from django.db import models


class Podcast(models.Model):
    link_to_api = models.URLField()
    title = models.CharField(max_length=256)
