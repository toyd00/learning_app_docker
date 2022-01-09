import datetime

from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.db.models.fields import DateField
from django.forms.fields import BooleanField


""" class SchoolYear(models.Model):
    school_year = models.IntegerField()

    def __str__(self):
        return str(self.school_year) """


class Subject(models.Model):
    name = models.CharField("分野", max_length=50)
    explain = models.TextField("分野に関する説明", max_length=400, blank=True)

    def __str__(self):
        return self.name

class Title(models.Model):
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)
    name = models.CharField("タイトル", max_length=50)
    explain = models.TextField("タイトルに関する説明", max_length=400, blank=True)

    def __str__(self):
        return self.name



class Type(models.Model):
    name = models.CharField("問題難易度", max_length=20, default="易しい")

    def __str__(self):
        return self.name



class Like(models.Model):
    user = models.ManyToManyField(verbose_name="いいねをしたユーザ", to='users.CustomUser')
    count = models.IntegerField("いいねの数", default=0)

class Problem(models.Model):
    #school_year = models.ForeignKey(to=SchoolYear, on_delete=PROTECT)
    type = models.ForeignKey(verbose_name="問題の難易度", to=Type, max_length=20, on_delete=PROTECT)
    user = models.ForeignKey(verbose_name="問題を作成したユーザ", to='users.CustomUser', on_delete=PROTECT, related_name='making_problem')
    solving_user = models.ManyToManyField(verbose_name="問題を解いたユーザ", to='users.CustomUser', related_name='solving_problem')
    subject = models.ForeignKey(verbose_name="科目", to=Subject, on_delete=models.PROTECT)
    title = models.ForeignKey(to=Title, on_delete=models.CASCADE)
    content = models.TextField("問題文", default="次のうちから正しいものを１つ選びなさい")
    made_date = DateField("問題作成日", default=datetime.date.today)
    correct_choice = models.IntegerField("正解の選択肢", default=1)
    like = models.OneToOneField(verbose_name="いいね", to=Like, on_delete=models.CASCADE)

    def __str__(self):
        return self.type.name + ' ' + self.subject.name

class Choice(models.Model):
    content = models.CharField("選択肢", max_length=200)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def __str__(self):
        return "Question:" + self.problem.content + "\nSelect" + self.content


class Calculation_Problem(models.Model):
    solving_user = models.ManyToManyField('users.CustomUser')
    correct_count = models.IntegerField()
    add = models.BooleanField(default=False)
    sub = models.BooleanField(default=False)
    mul = models.BooleanField(default=False)
    div = models.BooleanField(default=False)