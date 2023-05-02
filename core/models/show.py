from django.db import models
from .show_role import ShowRole


class Show(models.Model):
    name = models.CharField(max_length=128)
    start_dt = models.DateTimeField(verbose_name="show start time")
    call_dt = models.DateTimeField(verbose_name="call time")

    def __str__(self) -> str:
        return self.name + " - " + self.start_dt.astimezone().strftime("%m/%d/%Y, %H:%M:%S")
    
    @property
    def total_roles(self) -> int:
        return ShowRole.objects.filter(show=self).count()
    
    @property
    def filled_roles(self) -> int:
        return ShowRole.objects.filter(show=self).exclude(user__isnull=True).count()
    
    @property
    def crew(self) -> list[ShowRole]:
        return f"{self.filled_roles}/{self.total_roles}"
    
    @property
    def class_for_crew(self) -> str:
        filled = self.filled_roles
        total = self.total_roles
        if filled == 0:
            return "text-red-600"
        elif filled == total:
            return "text-green-600"
        return "text-yellow-600"