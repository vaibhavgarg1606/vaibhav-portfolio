from rest_framework import filters, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
from .serializers import (
    AssistantKnowledgeSerializer,
    BlogPostSerializer,
    BuildQueueItemSerializer,
    CertificationSerializer,
    ExperienceSerializer,
    ExplorationAreaSerializer,
    ProjectSerializer,
    SiteMetricSerializer,
    SkillDomainSerializer,
    TimelineMilestoneSerializer,
)


class SkillDomainViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillDomain.objects.prefetch_related("skills")
    serializer_class = SkillDomainSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class TimelineMilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimelineMilestone.objects.all()
    serializer_class = TimelineMilestoneSerializer


class ExplorationAreaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ExplorationArea.objects.all()
    serializer_class = ExplorationAreaSerializer


class BuildQueueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BuildQueueItem.objects.all()
    serializer_class = BuildQueueItemSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "description", "tech_stack"]
    ordering_fields = ["order", "created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category and category != "all":
            queryset = queryset.filter(category=category)
        return queryset


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        if self.request.query_params.get("published_only", "true") == "true":
            queryset = queryset.filter(is_published=True)
        return queryset


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class AssistantKnowledgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AssistantKnowledge.objects.all()
    serializer_class = AssistantKnowledgeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["prompt", "response", "tags"]


class SiteMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteMetric.objects.all()
    serializer_class = SiteMetricSerializer


@api_view(["GET"])
def assistant_answer(request):
    question = request.query_params.get("q", "").strip()
    if not question:
        return Response(
            {"answer": "Ask about internships, projects, technologies, or learning journey."}
        )

    item = (
        AssistantKnowledge.objects.filter(prompt__icontains=question)
        .order_by("-updated_at")
        .first()
    )
    if item:
        return Response({"answer": item.response, "source": item.prompt})

    fallback = (
        AssistantKnowledge.objects.filter(response__icontains=question)
        .order_by("-updated_at")
        .first()
    )
    if fallback:
        return Response({"answer": fallback.response, "source": fallback.prompt})

    return Response(
        {
            "answer": (
                "I could not find a direct match yet. Ask about Tata Power, Newgen, "
                "AiVedam, AI projects, or technology stack."
            )
        }
    )


@api_view(["GET"])
def portfolio_snapshot(request):
    data = {
        "skills": SkillDomainSerializer(SkillDomain.objects.prefetch_related("skills"), many=True).data,
        "experiences": ExperienceSerializer(Experience.objects.all(), many=True).data,
        "timeline": TimelineMilestoneSerializer(TimelineMilestone.objects.all(), many=True).data,
        "projects": ProjectSerializer(Project.objects.all(), many=True).data,
        "exploration": ExplorationAreaSerializer(ExplorationArea.objects.all(), many=True).data,
        "build_queue": BuildQueueItemSerializer(BuildQueueItem.objects.all(), many=True).data,
        "certifications": CertificationSerializer(Certification.objects.all(), many=True).data,
        "metrics": SiteMetricSerializer(SiteMetric.objects.all(), many=True).data,
    }
    return Response(data)
