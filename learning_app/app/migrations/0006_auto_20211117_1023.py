# Generated by Django 2.2.24 on 2021-11-17 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20211116_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='name',
            field=models.CharField(default='易しい', max_length=20, verbose_name='問題難易度'),
        ),
    ]
