from django.contrib import admin
from .models import *


admin.site.site_header = "Hydra Admin"
admin.site.site_title = "Hydra • Admin Panel"
admin.site.index_title = "Roll Dragons!"


class SchoolAdmin(admin.ModelAdmin):
    list_display = ("school_name", "team_name", "tricode")
    search_fields = ("school_name", "team_name", "tricode")


class TeamAdmin(admin.ModelAdmin):
    pass


class ShowRoleInline(admin.TabularInline):
    model = ShowRole
    extra = 1

class ShowAdmin(admin.ModelAdmin):
    inlines = [ShowRoleInline]
    list_display = ("name", "start_dt", "crew")


admin.site.register(School, SchoolAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Show, ShowAdmin)