# Generated by Django 4.2.7 on 2023-11-10 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_rename_category_article_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='role',
            field=models.CharField(default='writer', max_length=50),
        ),
    ]
