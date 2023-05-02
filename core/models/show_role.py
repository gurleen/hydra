from django.db import models
from django.contrib.auth import get_user_model


class ShowRole(models.Model):
    class ShowRoleType(models.TextChoices):
        DIRECTOR = "director"
        PRODUCER = "producer"
        TECHNICAL_DIRECTOR = "technical-director"
        REPLAY = "replay"
        GRAPHICS = "graphics"
        CAMERA_OP = "camera-op"
        TALENT = "talent"
        B_ROLL = "b-roll"
        UTILITY = "utility"


    show = models.ForeignKey("Show", on_delete=models.CASCADE)
    role = models.CharField(choices=ShowRoleType.choices, max_length=32)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return ""