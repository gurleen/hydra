import os
import csv

from django.core.management.base import BaseCommand, CommandError
from core.models import School


FILENAME = "static/ncaa.csv"


class Command(BaseCommand):
    help = "Imports all NCAA Divison I schools"


    def handle(self, *args, **options):
        with open(FILENAME, "r") as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                school = School(
                    school_name=row[6],
                    team_name=row[4],
                    tricode=row[1],
                    primary_color=row[7],
                    secondary_color=row[8]
                )
                school.save()