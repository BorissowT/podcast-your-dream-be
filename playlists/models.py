from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
from django.db import models

from podcasts.models import Podcast


class Playlist(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    podcasts = models.ManyToManyField(Podcast)
