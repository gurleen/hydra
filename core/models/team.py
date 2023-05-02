from django.db import models


class Team(models.Model):
    class Sports(models.TextChoices):
        WOMENS_BASKETBALL = "womens-basketball"
        WOMENS_FIELD_HOCKEY = "womens-field-hockey"
        WOMENS_LACROSSE = "womens-lacrosse"
        WOMENS_SOCCER = "womens-soccer"
        SOFTBALL = "softball"
        MENS_BASKETBALL = "mens-basketball"
        MENS_LACROSSE = "mens-lacrosse"
        MENS_SOCCER = "mens-soccer"
        WRESTLING = "wrestling"

    school = models.ForeignKey("School", on_delete=models.CASCADE)
    sport = models.CharField(max_length=32, choices=Sports.choices)

    @property
    def sport_name(self) -> str:
        return self.get_sport_display().replace("Womens", "Women's").replace("Mens", "Men's")

    def __str__(self) -> str:
        return self.school.full_name + " " + self.sport_name