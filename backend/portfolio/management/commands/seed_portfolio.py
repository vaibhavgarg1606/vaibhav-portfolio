from django.core.management.base import BaseCommand

from portfolio.models import (
    AssistantKnowledge,
    BuildQueueItem,
    Experience,
    ExplorationArea,
    Project,
    SiteMetric,
    Skill,
    SkillDomain,
    TimelineMilestone,
)


class Command(BaseCommand):
    help = "Seed portfolio data"

    def handle(self, *args, **kwargs):
        domains = {
            "AI / ML": ["YOLO", "OpenCV", "TensorFlow", "PyTorch", "Scikit-Learn"],
            "Full Stack": ["React", "Next.js", "Django", "Node.js", "REST APIs"],
            "Data Analytics": ["Pandas", "NumPy", "Streamlit"],
            "Tools": ["Git", "Docker", "Firebase", "Postman"],
        }

        for index, (name, skills) in enumerate(domains.items()):
            domain, _ = SkillDomain.objects.get_or_create(name=name, defaults={"order": index})
            for skill_index, skill_name in enumerate(skills):
                Skill.objects.get_or_create(
                    domain=domain,
                    name=skill_name,
                    defaults={"order": skill_index},
                )

        experiences = [
            (
                "2024",
                "feat",
                "Joined AiVedam Technologies",
                "AiVedam Technologies",
                "Worked on Full Stack Development and Python applications.",
                "Shipped feature modules and improved API reliability across internal products.",
                ["Python", "Django", "React", "REST APIs"],
                1,
            ),
            (
                "2025",
                "feat",
                "Tata Power DDL Internship",
                "Tata Power DDL",
                "Focused on Computer Vision, AIML and Business Analytics.",
                "Built CV prototypes for infrastructure analysis and analytical reports for stakeholders.",
                ["OpenCV", "YOLO", "Pandas", "Power BI"],
                2,
            ),
            (
                "2026",
                "feat",
                "Newgen Software",
                "Newgen Software",
                "Enterprise Product Development and Workflow Solutions.",
                "Contributed to workflow-driven enterprise modules with scalable architecture patterns.",
                ["JavaScript", "Workflow", "APIs", "Enterprise Software"],
                3,
            ),
            (
                "2022-2026",
                "chore",
                "B.Tech Information Technology",
                "Guru Tegh Bahadur Institute of Technology",
                "Information Technology with AIML minor.",
                "Built foundation across software engineering, AI/ML, and product thinking.",
                ["DSA", "Python", "Machine Learning"],
                4,
            ),
        ]

        for exp in experiences:
            Experience.objects.get_or_create(
                year_label=exp[0],
                title=exp[2],
                defaults={
                    "commit_type": exp[1],
                    "organization": exp[3],
                    "summary": exp[4],
                    "details": exp[5],
                    "technologies": exp[6],
                    "order": exp[7],
                },
            )

        projects = [
            (
                "Sentimi AI Therapist",
                "Conversational support product focused on empathetic responses and guided journaling.",
                Project.Category.AI_ML,
                ["React", "Node.js", "GPT-2"],
                True,
                1,
                "/projects/sentimi-ai-therapist.svg",
                "https://github.com/vaibhavgarg1606/sentimi",
                "https://sentimi-demo.vercel.app",
                "https://sentimi-case-study.vercel.app",
            ),
            (
                "Broken Insulator Detection",
                "Computer vision model to detect faulty insulators from powerline imagery.",
                Project.Category.AI_ML,
                ["YOLO", "OpenCV", "PyTorch"],
                True,
                2,
                "/projects/broken-insulator-detection.svg",
                "",
                "",
                "",
            ),
            (
                "Mental Health Analytics Dashboard",
                "Analytics dashboard for trends, risk segmentation, and wellbeing insights.",
                Project.Category.DATA_ANALYTICS,
                ["Streamlit", "Pandas", "NumPy"],
                True,
                3,
                "/projects/mental-health-analytics-dashboard.svg",
                "https://github.com/vaibhavgarg1606/Data-analysis-on-mental-health",
                "https://mental-health-analytics.vercel.app",
                "https://mental-health-analytics-case-study.vercel.app",
            ),
            (
                "Blog Website",
                "Full-stack blog platform with auth, editorial workflow, and markdown support.",
                Project.Category.FULL_STACK,
                ["Next.js", "Django", "PostgreSQL"],
                False,
                4,
                "/projects/blog-website.svg",
                "https://github.com/vaibhavgarg1606/blog_website",
                "https://blog-website-demo.vercel.app",
                "https://blog-website-case-study.vercel.app",
            ),
            (
                "Netflix Clone",
                "Streaming-inspired frontend experience with modern UI and responsive layouts.",
                Project.Category.FULL_STACK,
                ["React", "Node.js", "Firebase"],
                False,
                5,
                "/projects/netflix-clone.svg",
                "https://github.com/vaibhavgarg1606/Netflix-Clone",
                "https://netflix-clone-demo.vercel.app",
                "https://netflix-clone-case-study.vercel.app",
            ),
            (
                "Neuron Vision",
                "TypeScript project focused on modern AI product exploration and experimentation.",
                Project.Category.AI_ML,
                ["TypeScript", "AI", "Web"],
                False,
                6,
                "/projects/broken-insulator-detection.svg",
                "https://github.com/vaibhavgarg1606/Neuron-Vision",
                "",
                "",
            ),
        ]

        for (
            title,
            description,
            category,
            tech_stack,
            featured,
            order,
            image_url,
            github_url,
            demo_url,
            case_study_url,
        ) in projects:
            Project.objects.update_or_create(
                title=title,
                defaults={
                    "description": description,
                    "category": category,
                    "tech_stack": tech_stack,
                    "featured": featured,
                    "order": order,
                    "image_url": image_url,
                    "github_url": github_url,
                    "demo_url": demo_url,
                    "case_study_url": case_study_url,
                },
            )

        milestones = [
            ("2022", "Learning Web Development", "Started understanding frontend and internet fundamentals.", 1),
            ("2023", "React and Full Stack", "Built full-stack projects and worked with APIs.", 2),
            ("2024", "Production Applications", "Moved from prototypes to production-ready engineering.", 3),
            ("2025", "AI/ML and Computer Vision", "Focused on practical AI use-cases and CV systems.", 4),
            ("2026", "Enterprise Software", "Building scalable enterprise product modules.", 5),
        ]
        for year, title, summary, order in milestones:
            TimelineMilestone.objects.get_or_create(
                year=year,
                title=title,
                defaults={"summary": summary, "order": order},
            )

        for index, (title, done) in enumerate(
            [
                ("AI Therapist", True),
                ("Computer Vision Projects", True),
                ("Enterprise Applications", True),
                ("Multi-Agent Systems", False),
                ("Cloud Projects", False),
                ("Game Development", False),
                ("System Design", False),
            ],
            start=1,
        ):
            BuildQueueItem.objects.get_or_create(title=title, defaults={"done": done, "order": index})

        exploration = {
            "Vaibhav": ["AI/ML", "Web", "Data", "Game Dev"],
            "AI/ML": ["Vaibhav", "Data"],
            "Web": ["Vaibhav"],
            "Data": ["Vaibhav", "AI/ML"],
            "Game Dev": ["Vaibhav"],
        }
        for order, (name, connections) in enumerate(exploration.items(), start=1):
            ExplorationArea.objects.get_or_create(
                name=name, defaults={"connections": connections, "order": order}
            )

        SiteMetric.objects.update_or_create(
            id=1,
            defaults={
                "total_projects": 20,
                "repositories": 20,
                "technologies_used": 18,
                "contributions": 820,
            },
        )

        knowledge = [
            (
                "Tell me about Tata Power internship",
                "At Tata Power DDL, Vaibhav worked on computer vision and AI/ML with business analytics, building practical models and stakeholder-facing analysis.",
                ["internship", "tata-power", "ai-ml"],
            ),
            (
                "What AI projects has Vaibhav built?",
                "Key AI work includes Sentimi AI Therapist, Broken Insulator Detection, and multiple computer vision experiments with YOLO and OpenCV.",
                ["projects", "ai", "computer-vision"],
            ),
            (
                "What technologies does he use?",
                "Vaibhav works across React, Next.js, Django, Node.js, YOLO, OpenCV, TensorFlow, PyTorch, Pandas, Docker, and Git.",
                ["stack", "technologies"],
            ),
            (
                "What experience does he have?",
                "Experience spans AiVedam Technologies, Tata Power DDL internship, Newgen Software, and B.Tech IT with AIML minor.",
                ["experience", "career"],
            ),
        ]
        for prompt, response, tags in knowledge:
            AssistantKnowledge.objects.get_or_create(
                prompt=prompt, defaults={"response": response, "tags": tags}
            )

        self.stdout.write(self.style.SUCCESS("Portfolio seed data loaded."))
