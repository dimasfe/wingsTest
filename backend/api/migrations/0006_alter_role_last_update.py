# Generated by Django 5.0.7 on 2024-08-05 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_role_last_update'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='last_update',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
