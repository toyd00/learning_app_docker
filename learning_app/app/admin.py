from django.contrib import admin
from .models import Subject, Title, Problem, Choice, Type, Like, Calculation_Problem #SchoolYear


class ChoiceInLine(admin.StackedInline):
    model = Choice
    extra = 0

class ProblemAdmin(admin.ModelAdmin):
    inlines = [ChoiceInLine]
    list_display = ['__str__', 'id']

class SubjectAdmin(admin.ModelAdmin):
    model = Subject
    list_display = ['name', 'id']


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Title)
admin.site.register(Problem, ProblemAdmin)
admin.site.register(Choice)
admin.site.register(Type)
admin.site.register(Like)
admin.site.register(Calculation_Problem)
#admin.site.register(SchoolYear)