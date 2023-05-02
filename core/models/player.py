from django.db import models


class Player(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    shirt_num = models.CharField(max_length=3, blank=True, default="")
    position = models.CharField(max_length=12)
    headshot = models.URLField(blank=True, default="")