from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AssistantKnowledgeViewSet,
    BlogPostViewSet,
    BuildQueueViewSet,
    CertificationViewSet,
    ExperienceViewSet,
    ExplorationAreaViewSet,
    ProjectViewSet,
    SiteMetricViewSet,
    SkillDomainViewSet,
    TimelineMilestoneViewSet,
    assistant_answer,
    portfolio_snapshot,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillDomainViewSet, basename="skill-domain")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("timeline", TimelineMilestoneViewSet, basename="timeline")
router.register("exploration", ExplorationAreaViewSet, basename="exploration")
router.register("build-queue", BuildQueueViewSet, basename="build-queue")
router.register("blog-posts", BlogPostViewSet, basename="blog-post")
router.register("certifications", CertificationViewSet, basename="certification")
router.register("assistant-knowledge", AssistantKnowledgeViewSet, basename="assistant-knowledge")
router.register("metrics", SiteMetricViewSet, basename="metric")

urlpatterns = [
    path("", include(router.urls)),
    path("assistant/ask/", assistant_answer, name="assistant-answer"),
    path("snapshot/", portfolio_snapshot, name="portfolio-snapshot"),
]
