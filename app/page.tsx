import { Suspense } from "react"
import SpaceBackground from "@/components/space-background"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import EducationSection from "@/components/education-section"
import CertificationsSection from "@/components/certifications-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import LoadingScreen from "@/components/loading-screen"
import ScrollProgress from "@/components/scroll-progress"
import LaunchAnimation from "@/components/launch-animation"
import CometEffect from "@/components/comet-effect"
import AsteroidField from "@/components/asteroid-field"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Suspense fallback={<LoadingScreen />}>
        <SpaceBackground />
        <AsteroidField />
        <ScrollProgress />
        <LaunchAnimation />
        <CometEffect />
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <EducationSection />
          <CertificationsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </Suspense>
    </main>
  )
}
