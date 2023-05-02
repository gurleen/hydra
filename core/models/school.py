from django.db import models
from colorfield.fields import ColorField

class School(models.Model):
    '''Model definition for School.'''

    school_name = models.CharField(max_length=32)
    team_name = models.CharField(max_length=32)
    tricode = models.CharField(max_length=5)
    athletics_url = models.URLField(default="")
    logo_url = models.URLField(default="")
    primary_color = ColorField()
    secondary_color = ColorField()

    @property
    def full_name(self) -> str:
        return f"{self.school_name} {self.team_name}"

    def __str__(self) -> str:
        return f"{self.school_name} {self.team_name}"