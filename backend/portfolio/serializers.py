from rest_framework import serializers

from .models import (
    AssistantKnowledge,
    BlogPost,
    BuildQueueItem,
    Certification,
    Experience,
    ExplorationArea,
    Project,
    SiteMetric,
    SkillDomain,
    TimelineMilestone,
)


class SkillDomainSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = SkillDomain
        fields = ["id", "name", "slug", "skills", "order"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "id",
            "year_label",
            "commit_type",
            "title",
            "organization",
            "summary",
            "details",
            "technologies",
            "order",
        ]


class TimelineMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineMilestone
        fields = ["id", "year", "title", "summary", "order"]


class ExplorationAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExplorationArea
        fields = ["id", "name", "connections", "order"]


class BuildQueueItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildQueueItem
        fields = ["id", "title", "done", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "slug",
            "title",
            "description",
            "category",
            "category_label",
            "tech_stack",
            "image_url",
            "github_url",
            "demo_url",
            "case_study_url",
            "featured",
            "order",
        ]


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "published_at",
            "is_published",
            "tags",
        ]


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["id", "title", "issuer", "issue_date", "credential_url"]


class AssistantKnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistantKnowledge
        fields = ["id", "prompt", "response", "tags"]


class SiteMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteMetric
        fields = ["id", "total_projects", "repositories", "technologies_used", "contributions"]
