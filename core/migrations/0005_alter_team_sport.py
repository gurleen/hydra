# Generated by Django 4.1.8 on 2023-04-28 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_team"),
    ]

    operations = [
        migrations.AlterField(
            model_name="team",
            name="sport",
            field=models.CharField(
                choices=[
                    ("womens-basketball", "Womens Basketball"),
                    ("womens-field-hockey", "Womens Field Hockey"),
                    ("womens-lacrosse", "Womens Lacrosse"),
                    ("womens-soccer", "Womens Soccer"),
                    ("softball", "Softball"),
                    ("mens-basketball", "Mens Basketball"),
                    ("mens-lacrosse", "Mens Lacrosse"),
                    ("mens-soccer", "Mens Soccer"),
                    ("wrestling", "Wrestling"),
                ],
                max_length=32,
            ),
        ),
    ]
