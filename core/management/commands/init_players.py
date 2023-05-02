from django.core.management.base import BaseCommand
from core.models import School, Team, Player

import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'}


class Command(BaseCommand):
    help = "Imports players for teams"


    def handle(self, *args, **options):
        URL = "https://drexeldragons.com/sports/womens-basketball/roster"
        page = requests.get(URL, headers=HEADERS)
        soup = BeautifulSoup(page.text, features="lxml")
        players = soup.find_all("div", {"class": "sidearm-roster-player-container"})
        for player in players:
            num = player.find("span", {"class": "sidearm-roster-player-jersey-number"}).text.strip()
            raw_name = player.find("div", {"class": "sidearm-roster-player-name"}).find("a").text.strip()