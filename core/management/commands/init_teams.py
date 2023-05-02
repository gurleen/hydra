import os

from django.core.management.base import BaseCommand
from core.models import School, Team

import requests


HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'}


class Command(BaseCommand):
    help = "Imports all teams for schools that have URLs populated"


    def get_sports(self, school: School) -> list[str]:
        sports = []
        path = f"{school.athletics_url}/services/sportnames.ashx"
        data = requests.get(path, headers=HEADERS).json()
        for sport in data["sports"]:
            if sport["sportInfo"]["is_not_sport"] == "True":
                continue
            title = sport["sportInfo"]["sport_title"].replace("'", "").replace("&", "and").lower()
            title = title.replace("rowing", "crew")
            title = title.replace(" ", "-")
            sports.append(title)
        return sports


    def handle(self, *args, **options):
        schools = School.objects.exclude(athletics_url="")
        for school in schools:
            sports = self.get_sports(school)
            available_sports = [x[0] for x in Team.Sports.choices]
            for sport in sports:
                if sport in available_sports:
                    team = Team(school=school, sport=sport)
                    team.save()