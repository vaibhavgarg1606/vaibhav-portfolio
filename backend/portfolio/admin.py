from django.contrib import admin

from .models import (
    AssistantKnowledge,
    BlogPost,
    BuildQueueItem,
    Certification,
    Experience,
    ExplorationArea,
    Project,
    SiteMetric,
    Skill,
    SkillDomain,
    TimelineMilestone,
)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillDomain)
class SkillDomainAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    search_fields = ("name",)
    inlines = [SkillInline]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("year_label", "title", "organization", "order")
    list_filter = ("commit_type",)
    search_fields = ("title", "organization", "summary")


@admin.register(TimelineMilestone)
class TimelineMilestoneAdmin(admin.ModelAdmin):
    list_display = ("year", "title", "order")
    search_fields = ("year", "title")


@admin.register(ExplorationArea)
class ExplorationAreaAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    search_fields = ("name",)


@admin.register(BuildQueueItem)
class BuildQueueItemAdmin(admin.ModelAdmin):
    list_display = ("title", "done", "order")
    list_filter = ("done",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "featured", "order")
    list_filter = ("category", "featured")
    search_fields = ("title", "description", "tech_stack")


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "published_at", "is_published")
    list_filter = ("is_published",)
    search_fields = ("title", "excerpt", "tags")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "issue_date")
    search_fields = ("title", "issuer")


@admin.register(AssistantKnowledge)
class AssistantKnowledgeAdmin(admin.ModelAdmin):
    list_display = ("prompt", "updated_at")
    search_fields = ("prompt", "response", "tags")


@admin.register(SiteMetric)
class SiteMetricAdmin(admin.ModelAdmin):
    list_display = ("total_projects", "repositories", "technologies_used", "contributions")
