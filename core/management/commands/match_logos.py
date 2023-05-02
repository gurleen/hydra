import os
from django.core.management.base import BaseCommand
from django.templatetags.static import static
from core.models import School
from thefuzz import process


LOGOS = "static/img/logos"


class Command(BaseCommand):
    help = "Matches logos"


    def handle(self, *args, **options):
        images = os.listdir(LOGOS)
        schools = School.objects.all()
        for school in schools:
            matched = process.extract(school.school_name, images, limit=1)[0][0]
            school.logo_url = static(f"img/logos/{matched}")
            school.save()