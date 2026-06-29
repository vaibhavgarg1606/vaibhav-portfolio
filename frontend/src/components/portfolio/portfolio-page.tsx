"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Code2,
  Compass,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react";

import { api } from "@/lib/api";
import { useUiStore } from "@/store/ui-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const rotatingLines = [
  "Building things. Breaking things. Learning why.",
  "Exploring AI × Software × Product Development",
  "Turning ideas into products and experiments into skills",
  "Currently turning coffee into software",
];

const filters = [
  { key: "all", label: "All" },
  { key: "ai-ml", label: "AI/ML" },
  { key: "full-stack", label: "Full Stack" },
  { key: "data-analytics", label: "Data Analytics" },
  { key: "game-development", label: "Game Development" },
];

const sectionItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github-feed", label: "Repo Feed" },
  { id: "exploration", label: "Exploration" },
  { id: "build-queue", label: "Queue" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function PortfolioPage() {
  const { activeCategory, assistantQuestion, setActiveCategory, setAssistantQuestion } = useUiStore();
  const [lineIndex, setLineIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllGithubProjects, setShowAllGithubProjects] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", organization: "", message: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-snapshot"],
    queryFn: api.getSnapshot,
  });
  const { data: githubRepos = [] } = useQuery({
    queryKey: ["github-repositories"],
    queryFn: api.getGithubRepos,
  });

  const assistantMutation = useMutation({
    mutationFn: api.askAssistant,
  });

  const contactMutation = useMutation({
    mutationFn: api.submitContact,
    onSuccess: () => {
      setContact({ name: "", email: "", organization: "", message: "" });
    },
  });

  const projects = useMemo(() => {
    const items = data?.projects ?? [];
    if (activeCategory === "all") {
      return items;
    }
    return items.filter((project) => project.category === activeCategory);
  }, [activeCategory, data?.projects]);

  const githubProjects = useMemo(() => {
    if (!data?.projects) {
      return [];
    }
    const cmsRepoNames = new Set(
      data.projects
        .map((project) => extractRepoName(project.github_url))
        .filter((name): name is string => Boolean(name)),
    );
    return githubRepos.filter((repo) => !cmsRepoNames.has(repo.name.toLowerCase()));
  }, [data, githubRepos]);

  const visibleProjects = useMemo(
    () => (showAllProjects ? projects : projects.slice(0, 4)),
    [projects, showAllProjects],
  );
  const visibleGithubProjects = useMemo(
    () => (showAllGithubProjects ? githubProjects : githubProjects.slice(0, 4)),
    [githubProjects, showAllGithubProjects],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((current) => (current + 1) % rotatingLines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.2, 0.5, 0.8] },
    );
    sectionItems.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading || !data) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl border border-white/10 bg-zinc-900/60" />
          ))}
        </div>
      </main>
    );
  }

  const metric = data.metrics[0];
  const activeSectionLabel =
    sectionItems.find((section) => section.id === activeSection)?.label ?? "Home";

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_45%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14">
        <section id="hero" className="relative rounded-2xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-sm md:p-12">
          <div className="mb-5 font-mono text-xs text-indigo-300">
            {"<vaibhav-garg>"} <span className="text-zinc-400">{"<full-stack-engineer /> <ai-ml-builder />"}</span>{" "}
            {"</vaibhav-garg>"}
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-100 md:text-7xl">Vaibhav Garg</h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              className="mt-4 max-w-2xl text-lg text-zinc-300"
            >
              {rotatingLines[lineIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://example.com/vaibhav-resume.pdf" target="_blank" rel="noreferrer">
                Resume <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/resume/vaibhav-garg-resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>
        </section>

        <Section id="about" title="About" icon={<Code2 className="h-4 w-4" />}>
          <p className="max-w-3xl text-zinc-300">
            B.Tech Information Technology student with an AIML minor. I am interested in AI/ML, Full Stack
            Development, Product Engineering, and Data Analytics. I care about curiosity-led building, writing
            maintainable code, and learning through real products and experiments.
          </p>
        </Section>

        <Section id="career" title="git log --career" icon={<Briefcase className="h-4 w-4" />}>
          <div className="space-y-4">
            {data.experiences.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <p className="font-mono text-sm text-zinc-400">{item.year_label}</p>
                  <p className="mt-2 text-zinc-200">
                    <span className="text-emerald-300">{item.commit_type}: </span>
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{item.organization}</p>
                  <p className="mt-3 text-sm text-zinc-300">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Engineering Domains" icon={<Sparkles className="h-4 w-4" />}>
          <div className="grid gap-4 md:grid-cols-2">
            {data.skills.map((domain) => (
              <Card key={domain.id} className="transition hover:-translate-y-1 hover:border-indigo-400/40">
                <CardContent>
                  <h3 className="text-lg font-medium text-zinc-100">{domain.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Projects" icon={<Code2 className="h-4 w-4" />} id="projects">
          <div className="mb-5 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  activeCategory === filter.key
                    ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
                )}
                onClick={() => {
                  setActiveCategory(filter.key);
                  setShowAllProjects(false);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="grid gap-4 md:grid-cols-2">
              {visibleProjects.map((project) => (
                <motion.div layout key={project.id}>
                  <Card className="h-full transition hover:-translate-y-1 hover:border-indigo-400/50">
                    <CardContent className="flex h-full flex-col">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={`${project.title} preview`}
                          width={640}
                          height={360}
                          className="mb-4 h-36 w-full rounded-lg border border-white/10 object-cover"
                        />
                      ) : (
                        <div className="mb-4 rounded-lg border border-white/10 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 p-4 text-sm text-zinc-200">
                          <p className="font-mono text-xs text-zinc-300">{project.category_label}</p>
                          <p className="mt-2">{project.title} preview</p>
                        </div>
                      )}
                      <p className="font-mono text-xs text-zinc-400">repo://{project.slug}/</p>
                      <h3 className="mt-2 text-xl text-zinc-100">{project.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-zinc-300">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                        {!project.github_url && (
                          <Badge className="border-amber-400/40 bg-amber-500/20 text-amber-200">Working</Badge>
                        )}
                      </div>
                      <div className="mt-4 flex gap-4 text-sm text-zinc-300">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                            GitHub <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                            Demo <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {project.case_study_url && (
                          <a href={project.case_study_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                            Case Study <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {!showAllProjects && projects.length > 4 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
            )}
          </div>
          {projects.length > 4 && (
            <div className="mt-5 flex justify-center">
              <Button variant="secondary" onClick={() => setShowAllProjects((prev) => !prev)}>
                {showAllProjects ? (
                  <>
                    View less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    View more <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Section>

        <Section id="github-feed" title="GitHub Repository Feed" icon={<ExternalLink className="h-4 w-4" />}>
          <div className="relative">
            <div className="grid gap-3 md:grid-cols-2">
              {visibleGithubProjects.map((repo) => (
                <Card key={repo.id} className="transition hover:border-indigo-400/40">
                  <CardContent>
                    <p className="font-mono text-xs text-zinc-400">github://{repo.name}</p>
                    <p className="mt-2 text-sm text-zinc-100">{repo.description || "Repository from GitHub profile."}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge>{repo.language || "Code"}</Badge>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
                      >
                        Open Repo <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {!showAllGithubProjects && githubProjects.length > 4 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
            )}
          </div>
          {githubProjects.length > 4 && (
            <div className="mt-5 flex justify-center">
              <Button variant="secondary" onClick={() => setShowAllGithubProjects((prev) => !prev)}>
                {showAllGithubProjects ? (
                  <>
                    View less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    View more <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Section>

        <Section id="exploration" title="Exploration Map" icon={<Brain className="h-4 w-4" />}>
          <Card>
            <CardContent className="overflow-x-auto">
              <div className="min-w-[520px] font-mono text-zinc-300">
                <p className="text-center text-indigo-300">AI/ML</p>
                <p className="text-center text-zinc-500">|</p>
                <p className="text-center text-zinc-500">|</p>
                <p className="text-center">Web ───── Vaibhav ───── Data</p>
                <p className="text-center text-zinc-500">|</p>
                <p className="text-center text-zinc-500">|</p>
                <p className="text-center text-fuchsia-300">Game Dev</p>
              </div>
            </CardContent>
          </Card>
        </Section>

        <section className="grid gap-6 md:grid-cols-2">
          <Section id="build-queue" title="Current Build Queue" icon={<Code2 className="h-4 w-4" />}>
            <Card>
              <CardContent className="space-y-2 font-mono text-sm">
                {data.build_queue.map((item) => (
                  <p key={item.id} className={item.done ? "text-emerald-300" : "text-zinc-300"}>
                    [{item.done ? "x" : " "}] {item.title}
                  </p>
                ))}
              </CardContent>
            </Card>
          </Section>
          <Section id="journey" title="Learning Journey" icon={<Sparkles className="h-4 w-4" />}>
            <Card>
              <CardContent className="space-y-3">
                {data.timeline.map((item) => (
                  <div key={item.id}>
                    <p className="font-mono text-sm text-indigo-300">{item.year}</p>
                    <p className="text-sm text-zinc-200">{item.title}</p>
                    <p className="text-xs text-zinc-400">{item.summary}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Section>
        </section>

        <Section title="GitHub Dashboard" icon={<ExternalLink className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Total Projects" value={metric?.total_projects ?? 0} />
            <MetricCard label="GitHub Repositories" value={metric?.repositories ?? 0} />
            <MetricCard label="Technologies Used" value={metric?.technologies_used ?? 0} />
            <MetricCard label="Contributions" value={metric?.contributions ?? 0} />
          </div>
        </Section>

        <Section title="AI Portfolio Assistant" icon={<Brain className="h-4 w-4" />}>
          <Card>
            <CardContent className="space-y-4">
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <Input
                  value={assistantQuestion}
                  onChange={(event) => setAssistantQuestion(event.target.value)}
                  placeholder="Tell me about Tata Power internship"
                />
                <Button
                  onClick={() => assistantMutation.mutate(assistantQuestion)}
                  disabled={assistantMutation.isPending}
                >
                  Ask
                </Button>
              </div>
              <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-4 text-sm text-zinc-200">
                {assistantMutation.data?.answer ??
                  "Ask about internships, AI projects, technologies, or experience details."}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="contact" title="Contact" icon={<Mail className="h-4 w-4" />}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Name"
                  value={contact.name}
                  onChange={(event) => setContact((prev) => ({ ...prev, name: event.target.value }))}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
                />
                <Input
                  placeholder="Organization"
                  value={contact.organization}
                  onChange={(event) =>
                    setContact((prev) => ({ ...prev, organization: event.target.value }))
                  }
                />
                <Textarea
                  placeholder="Message"
                  value={contact.message}
                  onChange={(event) => setContact((prev) => ({ ...prev, message: event.target.value }))}
                />
                <Button
                  className="w-full"
                  onClick={() => contactMutation.mutate(contact)}
                  disabled={contactMutation.isPending}
                >
                  Send Message
                </Button>
                {contactMutation.isSuccess && (
                  <p className="text-xs text-emerald-300">Message saved. I will reply on email soon.</p>
                )}
                {contactMutation.isError && (
                  <p className="text-xs text-rose-300">Message could not be sent right now. Please email directly.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4">
                <a
                  className="flex items-center justify-between text-zinc-300 hover:text-white"
                  href="https://github.com/vaibhavgarg1606"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between text-zinc-300 hover:text-white"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between text-zinc-300 hover:text-white"
                  href="mailto:vaibhavgarg162004@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email <Mail className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between text-zinc-300 hover:text-white"
                  href="https://example.com/vaibhav-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between text-zinc-300 hover:text-white"
                  href="/resume/vaibhav-garg-resume.pdf"
                  download
                >
                  Download Resume <ArrowUpRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </Section>

        <footer className="pb-8 font-mono text-center text-sm text-zinc-400">
          while(alive){"{"}
          <span className="text-zinc-200"> learn(); build(); improve(); </span>
          {"}"}
        </footer>
      </div>
      <div className="fixed bottom-4 right-4 z-20 hidden md:block">
        <div className="group relative">
          <button
            type="button"
            className="rounded-full border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-300 backdrop-blur-sm transition hover:border-indigo-400/40 hover:text-zinc-100"
          >
            <span className="inline-flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" />
              TOC · {activeSectionLabel}
            </span>
          </button>
          <div className="pointer-events-none absolute bottom-12 right-0 w-44 translate-y-2 rounded-xl border border-white/10 bg-zinc-900/85 p-2 opacity-0 shadow-xl backdrop-blur-sm transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            {sectionItems.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "block rounded-md px-2.5 py-1.5 text-xs transition",
                  activeSection === section.id
                    ? "bg-indigo-500/25 text-indigo-200"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
                )}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function extractRepoName(url: string) {
  if (!url) {
    return null;
  }
  const match = /github\.com\/[^/]+\/([^/?#]+)/i.exec(url);
  return match ? match[1].toLowerCase() : null;
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:border-indigo-400/40">
      <CardContent>
        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-zinc-100">{value}</p>
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  icon,
  children,
  id,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className="space-y-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
    >
      <h2 className="flex items-center gap-2 text-lg font-medium text-zinc-100">
        {icon}
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
