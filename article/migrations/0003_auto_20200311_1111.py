# Generated by Django 2.2.3 on 2020-03-11 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0002_auto_20200310_1001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
    ]
