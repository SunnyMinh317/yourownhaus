import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Quote from "@/components/Quote";
import Quote2 from "@/components/Quote2";
import MeetOurTeam from "@/components/MeetOurTeam";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <AboutUs />
      <Services />
      <Quote />
      <Quote2 />
      <MeetOurTeam />
      <ContactForm />
    </main>
  );
}
