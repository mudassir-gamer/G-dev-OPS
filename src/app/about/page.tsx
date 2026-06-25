import { Users, Target, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

const values = [
  { icon: Users, title: "Community First", description: "A supportive community for students and instructors." },
  { icon: Target, title: "Practical Learning", description: "Hands-on projects that build real-world skills." },
  { icon: Heart, title: "Passion-Driven", description: "Instructors who love sharing their knowledge." },
  { icon: Award, title: "Excellence", description: "High standards in content quality and student success." },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Instructors" },
  { value: "95%", label: "Success Rate" },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Sarah Williams", role: "Head of Education", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Marcus Johnson", role: "Lead Unreal Developer", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Emily Rodriguez", role: "Community Manager", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About G Dev OPS</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We&apos;re on a mission to make game development education accessible to everyone.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Founded in 2020, G Dev OPS started as a small community of Roblox developers. Today, we&apos;re a comprehensive platform covering all major game engines.
          </p>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Decades of game development and education experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                  <p className="text-purple-600 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
