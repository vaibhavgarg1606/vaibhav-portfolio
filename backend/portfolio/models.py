from django.db import models
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SkillDomain(TimeStampedModel):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=80, unique=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Skill(TimeStampedModel):
    domain = models.ForeignKey(SkillDomain, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=80)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        unique_together = ("domain", "name")

    def __str__(self):
        return f"{self.domain.name} · {self.name}"


class Experience(TimeStampedModel):
    year_label = models.CharField(max_length=40)
    commit_type = models.CharField(max_length=20, default="feat")
    title = models.CharField(max_length=140)
    organization = models.CharField(max_length=140)
    summary = models.TextField()
    details = models.TextField(blank=True)
    technologies = models.JSONField(default=list, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return f"{self.year_label} · {self.title}"


class TimelineMilestone(TimeStampedModel):
    year = models.CharField(max_length=20)
    title = models.CharField(max_length=140)
    summary = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.year} · {self.title}"


class ExplorationArea(TimeStampedModel):
    name = models.CharField(max_length=80, unique=True)
    connections = models.JSONField(default=list, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class BuildQueueItem(TimeStampedModel):
    title = models.CharField(max_length=120)
    done = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class Project(TimeStampedModel):
    class Category(models.TextChoices):
        AI_ML = "ai-ml", "AI/ML"
        FULL_STACK = "full-stack", "Full Stack"
        DATA_ANALYTICS = "data-analytics", "Data Analytics"
        GAME_DEVELOPMENT = "game-development", "Game Development"

    slug = models.SlugField(max_length=80, unique=True, blank=True)
    title = models.CharField(max_length=140)
    description = models.TextField()
    category = models.CharField(max_length=30, choices=Category.choices)
    tech_stack = models.JSONField(default=list, blank=True)
    image_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    case_study_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BlogPost(TimeStampedModel):
    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    excerpt = models.TextField()
    content = models.TextField()
    published_at = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    tags = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Certification(TimeStampedModel):
    title = models.CharField(max_length=140)
    issuer = models.CharField(max_length=140)
    issue_date = models.DateField(null=True, blank=True)
    credential_url = models.URLField(blank=True)

    class Meta:
        ordering = ["-issue_date", "title"]

    def __str__(self):
        return self.title


class AssistantKnowledge(TimeStampedModel):
    prompt = models.CharField(max_length=220)
    response = models.TextField()
    tags = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.prompt


class SiteMetric(TimeStampedModel):
    total_projects = models.PositiveIntegerField(default=0)
    repositories = models.PositiveIntegerField(default=0)
    technologies_used = models.PositiveIntegerField(default=0)
    contributions = models.PositiveIntegerField(default=0)

    def __str__(self):
        return "Portfolio Metrics"
